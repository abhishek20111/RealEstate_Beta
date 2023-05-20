import React from 'react'
import profileImg from '../asset/UserLogo.png'
import jwt_decode from 'jwt-decode';

export default function Profile() {
    const token = localStorage.getItem('token');
    const { email, role , name} = token ? jwt_decode(token) : {};

    return (
        <div>
            <section style={{fontFamily: 'Montserrat'}} className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">

                <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">2d ago</span>
                        <span className="text-emerald-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </span>
                    </div>
                    <div className="mt-6 w-fit mx-auto">
                        <img src={profileImg} className="rounded-full w-28 " alt="profile picture" srcSet=""/>
                    </div>

                    <div className="mt-8 ">
                        <h2 className="text-white font-bold text-2xl tracking-wide">Name<br /> {name}</h2>
                    </div>
                    <p className="text-emerald-400 font-semibold mt-2.5" >
                        {email}
                    </p>

                    <div className="h-1 w-full bg-black mt-8 rounded-full">
                    {(role === "Super Admin") ?<div className="h-1 rounded-full  bg-green-500 "></div>:null}
                    {(role === "Admin") ?<div className="h-1 w-4/5 rounded-full  bg-green-500 "></div>:null}
                    {(role === "User") ?<div className="h-1 w-3/5 rounded-full  bg-green-500 "></div>:null}
                    </div>
                    <div className="mt-3 text-white text-sm">
                        <span className="text-gray-400 font-semibold">Role:  </span>
                        <span> {role} </span>
                    </div>

                </section>


            </section>
        </div>
    )
}
