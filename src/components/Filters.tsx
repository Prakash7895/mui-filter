import React, { useContext } from 'react';
import CustomAccordion from './CustomAccordion';
import { RootContext } from './Context';
import { filterFields, getFilteredData, tagsColor } from '../utils';

const Filters = () => {
  const { data } = useContext(RootContext);

  return (
    <div>
      <p>Filters</p>
      {filterFields.map((e) => (
        <CustomAccordion
          key={e.value}
          value={e.value}
          label={e.label}
          options={e.options.map((el) => ({
            count: getFilteredData(data, e.value, el.value).length,
            label: el.value.toString(),
            color:
              (el.value as string) in tagsColor
                ? tagsColor[el.value as string].dot
                : '',
          }))}
        />
      ))}
    </div>
  );
};

export default Filters;
