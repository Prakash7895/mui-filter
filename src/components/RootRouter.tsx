import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Context from './Context';
import Filters from './Filters';
import CustomAutoComplete from './CustomAutoComplete';
import CustomTable from './Table';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Context>
        <main className='flex py-5 pr-5 m-10 rounded-md bg-gray-100'>
          <div className='min-w-60 p-5'>
            <Filters />
          </div>
          <div className='flex-1 flex flex-col'>
            <div>
              <CustomAutoComplete />
            </div>
            <div className='flex-1'>
              <CustomTable />
            </div>
          </div>
        </main>
      </Context>
    ),
  },
]);

const RootRouter = () => {
  return <RouterProvider router={router} />;
};

export default RootRouter;
