import {
  Autocomplete,
  ListItem,
  ListItemText,
  Paper,
  PaperProps,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { RootContext } from './Context';
import { filterFields, FilterKeys } from '../utils';

const CustomAutoComplete = () => {
  const { filter, setFilter } = useContext(RootContext);
  const [lastSelectedValue, setlastSelectedValue] = useState<string>('');
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    const newValue = filter.reduce((acc, curr) => {
      acc.push(curr.type, ...curr.values);
      return acc;
    }, [] as string[]);
    setValue(newValue);
  }, [filter]);

  const onChange = (e: React.SyntheticEvent) => {
    const val = (e.target as any).textContent;

    if (
      lastSelectedValue &&
      filterFields
        .find((el) => el.value === lastSelectedValue)
        ?.options.map((el) => el.value.toString())
        .includes(val)
    ) {
      if (!value.includes(val)) {
        setValue((p) => p.concat([val]));
      }
      setFilter((p) => {
        const updatedP = p.map((el) => ({
          ...el,
          values: el.values.map((e: string) => e),
        }));
        const idx = updatedP.findIndex((el) => el.type === lastSelectedValue);

        if (idx >= 0) {
          const jdx = updatedP[idx].values.findIndex(
            (el: string) => el === val
          );
          if (jdx < 0) {
            updatedP[idx].values.push(val);
          }
        }
        return updatedP;
      });

      setlastSelectedValue('');
    } else if (filterFields.map((el) => el.value.toString()).includes(val)) {
      if (!value.includes(val)) {
        setValue((p) => p.concat([val]));
      }
      setlastSelectedValue(val);
      setFilter((p) => {
        const updatedP = p.map((el) => ({
          ...el,
          values: el.values.map((e: string) => e),
        }));
        const idx = updatedP.findIndex((el) => el.type === val);

        if (idx < 0) {
          updatedP.push({
            type: val as FilterKeys,
            values: [],
          });
        }

        return updatedP;
      });
    }
  };

  return (
    <Autocomplete
      multiple
      id='tags-filled'
      className='w-full'
      disableClearable
      options={
        lastSelectedValue
          ? filterFields
              .find((el) => el.value === lastSelectedValue)
              ?.options.map((el) => el.value.toString()) ?? []
          : filterFields.map((option) => option.value.toString())
      }
      freeSolo
      renderTags={() =>
        filter.map((el) => (
          <p key={el.type} className='mr-1'>
            {`${el.type}:${el.values.join(',')}`}
          </p>
        ))
      }
      renderOption={(props, option) => {
        return (
          <ListItem {...props} key={option}>
            <ListItemText primary={option} />
          </ListItem>
        );
      }}
      onKeyDown={(e) => {
        if (e.key === 'Backspace') {
          setlastSelectedValue('');
          setFilter([]);
          setValue([]);
        }
      }}
      value={value}
      disableCloseOnSelect
      onChange={onChange}
      PaperComponent={CustomPaper}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          placeholder='Search data table...'
          className='bg-white'
        />
      )}
    />
  );
};

export default CustomAutoComplete;

const CustomPaper = (props: PaperProps) => {
  return (
    <Paper {...props}>
      {props.children}
      <div className='p-2 border-t border-gray-300'>
        <Typography variant='caption' color='textSecondary'>
          Use arrow keys to navigate, press ESC to close
        </Typography>
      </div>
    </Paper>
  );
};
