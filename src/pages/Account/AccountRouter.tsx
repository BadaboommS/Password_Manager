import React from 'react'
import { Route, Routes } from 'react-router';

import ALayout from './ALayout';
import Dashboard from './Dashboard';
import Error from '../../utils/Error';
import PasswordContextProvider from '../../context/PasswordContextProvider';

const AccountRouter = () => {
  return (
    <PasswordContextProvider>
      <Routes>
        <Route element={<ALayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path='/*' element={<Error />} />
        </Route>
      </Routes>
    </PasswordContextProvider>
  )
}

export default AccountRouter