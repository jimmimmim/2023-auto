import React from 'react';
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
    return (
    <>
    <nav id="navbar" className='py-3 font-semibold' style={{backgroundColor: '#07111E'}}>
        <div className='gnb-box'>
            <ul id="links" className="flex">
                <li className='mx-8 text-white uppercase'>
                    <Link to="/">Autonomous Robot Data Dashboard</Link>
                </li>
                <li className='mr-8 text-gray-800 hover:text-indigo-500'>
                    <Link to="/dashboard"> </Link>
                </li>
            </ul>
        </div>
    </nav>
    <Outlet/>
    </>
    )
};

export default NavBar;