import React from 'react';
import { Outlet, Link } from "react-router-dom";
import logos from '../assets/images/logos.png';

const NavBar = () => {
    return (
    <>
    <nav id="navbar" className='flex items-center justify-between tracking-wide bg-[#07111E]'>
        <div className='gnb-box'>
            <ul id="links" className="flex">
                <li className='mx-8 text-white uppercase'>
                    <Link to="/">Autonomous Robot Data Dashboard</Link>
                </li>
                {/* <li className='mx-8 uppercase hover:text-white'>
                    <Link to="/temp">...temp</Link>
                </li> */}
            </ul>
        </div>
        <div className='py-1 mr-2 cursor-pointer '>
            <img src={logos} height="auto" width="320" alt="logos-svg" />
        </div>
    </nav>
    <Outlet/>
    </>
    )
};

export default NavBar;