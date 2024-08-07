import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { RootContext } from './Context';
import CheckIcon from '@mui/icons-material/Check';
import { tagsColor } from '../utils';

const CustomTable = () => {
  const { data } = useContext(RootContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper} className='mt-4'>
        <Table sx={{ minWidth: 300 }} aria-label='simple table'>
          <TableHead className='bg-gray-200'>
            <TableRow>
              <TableCell className='font-semibold'>Name</TableCell>
              <TableCell className='font-semibold'>Regions</TableCell>
              <TableCell className='font-semibold'>Tags</TableCell>
              <TableCell className='font-semibold'>Active</TableCell>
              <TableCell className='font-semibold'>Public</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell>{row.regions.join(', ')}</TableCell>
                  <TableCell>
                    {row.tags.map((el: string) => {
                      const color = tagsColor[el].badge.split(' ').join(' !');
                      return (
                        <Chip
                          key={el}
                          className={`!border !border-solid mr-1 ${color}`}
                          label={el}
                        />
                      );
                    })}
                  </TableCell>
                  <TableCell>{row.active ? <CheckIcon /> : ''}</TableCell>
                  <TableCell>{row.public ? <CheckIcon /> : ''}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomTable;
