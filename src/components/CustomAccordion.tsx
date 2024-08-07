import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Checkbox,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useContext } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { RootContext } from './Context';
import { FilterKeys } from '../utils';

interface ICustomAccordion {
  label: string;
  options: { label: string; count: number; color?: string }[];
  value: FilterKeys;
}

const CustomAccordion: FC<ICustomAccordion> = ({ label, options, value }) => {
  const { filter, setFilter } = useContext(RootContext);

  const onChange = (option: (typeof options)[number]) => {
    setFilter((p) => {
      const updatedP = p.map((e) => ({
        ...e,
        values: [...e.values],
      }));

      const valIdx = updatedP.findIndex((el) => el.type === value);
      if (valIdx < 0) {
        updatedP.push({
          type: value,
          values: [option.label],
        });
      } else {
        const optionIdx = updatedP[valIdx].values.findIndex(
          (e: string) => e === option.label
        );

        if (optionIdx < 0) {
          updatedP[valIdx].values.push(option.label);
        } else {
          updatedP[valIdx].values.splice(optionIdx, 1);
        }

        if (updatedP[valIdx].values.length === 0) {
          updatedP.splice(valIdx, 1);
        }
      }
      return updatedP;
    });
  };

  const checkedCount = filter.find((el) => el.type === value)?.values.length;

  return (
    <Accordion
      defaultExpanded
      className='!bg-transparent !border-0 !shadow-none !h-auto'
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1-content'
        id='panel1-header'
        className='!pl-2 !pr-1 !py-2 !min-h-fit'
        classes={{ content: '!my-0', expandIconWrapper: '!my-0' }}
      >
        <Typography className='font-semibold'>{label}</Typography>
        {checkedCount && (
          <Chip
            label={checkedCount}
            size='small'
            className='!ml-2'
            variant='outlined'
            deleteIcon={<CloseIcon />}
            onDelete={() => {
              setFilter((p) => {
                const updatedP = p.map((e) => ({
                  ...e,
                  values: [...e.values],
                }));

                const idx = updatedP.findIndex((el) => el.type === value);

                updatedP.splice(idx, 1);

                return updatedP;
              });
            }}
          />
        )}
      </AccordionSummary>
      <AccordionDetails className='!border !px-0 !pb-0 !border-gray-300 !rounded-md'>
        {options.map((option, idx) => {
          const color = option.color;
          return (
            <Stack
              key={option.label}
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              className={`${
                idx === options.length - 1 ? '' : 'border-b'
              } border-gray-300 pr-2`}
            >
              <Stack direction='row' alignItems='center'>
                <Checkbox
                  value={option.label}
                  checked={
                    filter
                      .find((el) => el.type === value)
                      ?.values.includes(option.label) ?? false
                  }
                  onChange={() => onChange(option)}
                />
                <Typography>{option.label}</Typography>
              </Stack>
              <Stack direction='row' alignItems='center'>
                {color && (
                  <Badge
                    color='default'
                    className='mr-2'
                    classes={{ dot: `${color}` }}
                    badgeContent=' '
                    variant='dot'
                  />
                )}
                <Typography>{option.count}</Typography>
              </Stack>
            </Stack>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
