import React, { useState } from 'react'
import logo from '../asset/logo.jpeg'
import '../App.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logout from './Logout'

export default function Navbar() {
    const [state, setState] = useState(false)

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";



   

    const USER_TYPE = {
        PUBLIC: 'Public User',
        USER: 'User',
        ADMIN: 'Admin',
        SUPER_ADMIN: 'Super Admin',
    }

    // const CURRENT_USER_TYPE = USER_TYPE.USER
    const CURRENT_USER_TYPE = JSON.parse(localStorage.getItem("role"));

    return (
        <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
            <div className="items-center px-4 max-w-screen-2xl mx-auto md:flex">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href="https://aeroqube.com/" target='_blank'>
                        <img
                            src={logo}
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                    </a>
                    <div className="md:hidden">
                        <button className="text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        <div>

                        <Link className='text-gray-700 hover:text-indigo-600' to={'/'}>Home</Link>
                        </div>

                        {
                            (CURRENT_USER_TYPE === USER_TYPE.USER) ?
                                <>
                                    <div>
                                    <Link className='text-gray-700 hover:text-indigo-600' to={'/UserProfile'}>Profile</Link>

                                    </div>
                                    <div>

                                    <Link className='text-gray-700 hover:text-indigo-600' to={'/monitor'}>Monitor</Link>
                                    </div>

                                    <div className='relative'>
                                        <button className="peer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Form</button>

                                        <div className="z-50 hidden gap-y-4 absolute peer-hover:flex hover:flex md:w-[200px] sm:w-[130px] flex-col bg-white drop-shadow-lg">
                                            <div>
                                            <Link to={'/formI'} className="px-2 py-3 text-gray-700 hover:text-indigo-600">India</Link>

                                            </div>
                                            <div>
                                            <Link to={'/formUS'} className="px-2 py-3 text-gray-700 hover:text-indigo-600">US</Link>

                                            </div>
                                            <div>
                                            <Link to={'/formC'} className="px-2 py-3 text-gray-700 hover:text-indigo-600">Canda</Link>

                                            </div>
                                        </div>
                                    </div>
                                </> : null
                        }
                        {
                            (CURRENT_USER_TYPE === USER_TYPE.ADMIN) ?
                            <>
                            <div>

                                <Link className='text-gray-700 hover:text-indigo-600' to={'/UserProfile'}>Profile</Link>
                            </div>
                            <div>

                                <Link className='text-gray-700 hover:text-indigo-600' to={'/adminmonitor'}>User List</Link>
                            </div>

                            </> : null
                        }
                        {
                            (CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN) ?
                            <>
                            <div>
                                <Link className='text-gray-700 hover:text-indigo-600' to={'/UserProfile'}>Profile</Link>

                            </div>
                            <div>

                                <Link className='text-gray-700 hover:text-indigo-600' to={'/adminmonitor'}>User List</Link>
                            </div>
                            </> : null
                        }
                       
                        {isLoggedIn ?
                            <div className='space-x-4'>
                                <Link to={'/Logout'} className='block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline'>Logout</Link>
                            </div>
                            :
                            <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                                <li>
                                    <NavLink to="/signin" className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none">
                                        Log in
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signup" className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
                                        Sign Up
                                    </NavLink>
                                </li>
                            </div>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
