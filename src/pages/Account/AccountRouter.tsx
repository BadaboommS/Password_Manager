import React from 'react'
import { Route, Routes } from 'react-router-dom';

import ALayout from './ALayout';
import Dashboard from './Dashboard';
import Error from '../../utils/Error';
import ReservationContextProvider from '../../context/ContextProvider';

const AccountRouter = () => {
  return (
    <ReservationContextProvider>
      <Routes>
        <Route element={<ALayout />}>
          <Route index element={<Dashboard />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </ReservationContextProvider>
  )
}

export default AccountRouter