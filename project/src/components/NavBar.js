import React from 'react';
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
    return (
    <>
    <nav id="navbar" className='border-indigo-500 border py-3'>
        <div className='gnb-box'>
            <ul id="links" className="flex">
                <li className='mx-8'>
                    <Link to="/">Map</Link>
                </li>
                <li>
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