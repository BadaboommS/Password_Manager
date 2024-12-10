import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Error from '../../utils/Error'
import Login from './Login'

const PublicRouter = () => {

  useEffect(() => {
    console.log("Render Public");
  }, []);

  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/*' element={<Error />} />
    </Routes>
  )
}

export default PublicRouter