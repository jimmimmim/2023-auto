import React from 'react';
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
    return (
    <>
    <nav id="navbar" className='py-3 font-semibold border border-indigo-500'>
        <div className='gnb-box'>
            <ul id="links" className="flex">
                <li className='mx-8 text-gray-800 hover:text-indigo-500'>
                    <Link to="/">Map</Link>
                </li>
                <li className='mr-8 text-gray-800 hover:text-indigo-500'>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>
        </div>
    </nav>
    <Outlet/>
    </>
    )
};

export default NavBar;