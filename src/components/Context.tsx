import { data, filterFields, IData, IFilter, getFilteredData } from '../utils';
import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

export const RootContext = createContext<{
  data: IData[];
  setData: React.Dispatch<React.SetStateAction<IData[]>>;
  filter: IFilter[];
  setFilter: React.Dispatch<React.SetStateAction<IFilter[]>>;
}>({
  data: data,
  setData: () => [],
  filter: [],
  setFilter: () => [],
});

interface IContext {
  children: ReactNode;
}

const Context: FC<IContext> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tableData, setTableData] = useState(data);
  const [filter, setFilter] = useState<IFilter[]>(() => {
    return filterFields
      .map((el) => ({
        type: el.value,
        values: searchParams.getAll(el.value),
      }))
      .filter((el) => el.values.length);
  });

  useEffect(() => {
    if (!filter.length) {
      setTableData(data);
      setSearchParams('');
    } else {
      let updatedP = data.map((el) => ({
        ...el,
        tags: [...el.tags],
        regions: [...el.regions],
      }));

      filter.forEach((val) => {
        val.values.forEach((v) => {
          updatedP = getFilteredData(
            updatedP,
            val.type,
            v === 'true' ? true : v === 'false' ? false : v
          );
        });
      });

      setSearchParams(
        filter.reduce((acc, val) => {
          return (
            acc +
            `${acc.length ? '&' : ''}${val.values
              .map((el) => val.type + '=' + el)
              .join('&')}`
          );
        }, '')
      );

      setTableData(updatedP);
    }
  }, [filter, setSearchParams]);

  return (
    <RootContext.Provider
      value={{ data: tableData, setData: setTableData, filter, setFilter }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default Context;
