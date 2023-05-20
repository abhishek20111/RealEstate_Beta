import { useState } from 'react'
import './App.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar';
import Signup from './component/Signup';
import Signin from './component/Signin';
import FormC from './component/form/FormC.jsx';
import FormI from './component/form/FormI.jsx';
import Home from './component/Home';
import Contact from './component/Contact';
import ErrorPage from './component/ErrorPage';
import Logout from './component/Logout';
import Monitor from './component/Monitor';
import AdminMontior from './component/AdminMontior';
import FormUS from './component/form/FormUS';
import Profile from './component/Profile';


const USER_TYPE = {
  PUBLIC: 'Public User',
  USER: 'User',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super Admin',
}

// const CURRENT_USER_TYPE = USER_TYPE.USER
const CURRENT_USER_TYPE = JSON.parse(localStorage.getItem("role"));

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  )
}

function AppRoutes() {
  return (<>
    <Routes>
      <Route path="/signup" element={<PublicElement><Signup /></PublicElement>} />
      <Route path="/signin" element={<PublicElement><Signin /></PublicElement>} />
      <Route path="/formUS" element={<OnlyUserElement><FormUS /></OnlyUserElement>} /> //change the only to UserElement
      <Route path="/formC" element={<OnlyUserElement><FormC /></OnlyUserElement>} /> //change the only to UserElement
      <Route path="/formI" element={<OnlyUserElement><FormI /></OnlyUserElement>} /> //change the only to UserElement
      <Route path="/" element={<PublicElement><Home /></PublicElement>} />
      <Route path="/contact" element={<PublicElement><Contact /></PublicElement>} />
      <Route path="/Logout" element={<UserElement><Logout /></UserElement>} />
      <Route path="/monitor" element={<UserElement><Monitor /></UserElement>} />
      <Route path="/adminmonitor" element={<AdminElement><AdminMontior /></AdminElement>} />
      <Route path="*" element={<PublicElement><ErrorPage /></PublicElement>} />
      <Route path="/UserProfile" element={<UserElement><Profile /></UserElement>} />


      <Route path="/user" element={<UserElement><User /></UserElement>} />
      <Route path="/admin" element={<AdminElement><Admin /></AdminElement>} />
    </Routes>


  </>
  )
}


function User() {
  return <div> User </div>
}

function Admin() {
  return <div> Admin </div>
}


function PublicElement({ children }) {
  return <>{children}</>
}

function UserElement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPE.USER || CURRENT_USER_TYPE === USER_TYPE.ADMIN || CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN)
    return <>{children}</>
  else
    // return <Navigate to={'/pagenotfound'}/>
    return <>do not access to this domain</>
}

function OnlyUserElement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPE.USER)
    return <>{children}</>
  else
    // return <Navigate to={'/pagenotfound'}/>
    return <>You do not need to access this site</>
}

function AdminElement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPE.ADMIN || CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN)
    return <>{children}</>
  else
    // return <Navigate to={'/pagenotfound'}/>
    return <>do not access to Admin domain</>
}

function OnlySuperAdminElement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN)
    return <>{children}</>
  else
    // return <Navigate to={'/pagenotfound'}/>
    return <>do not access to Admin domain</>
}

export default App
