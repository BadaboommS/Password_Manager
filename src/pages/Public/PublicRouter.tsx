import React from 'react'
import { Routes, Route } from 'react-router'
import Error from '../../utils/Error'
import Login from './Login'

const PublicRouter = () => {

  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/*' element={<Error />} />
    </Routes>
  )
}

export default PublicRouter