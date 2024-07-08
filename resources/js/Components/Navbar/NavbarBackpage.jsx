import React, { useState } from 'react'
// import DropdownLaravel from '../Dropdown';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { Link, usePage } from '@inertiajs/react';

export default function NavbarBackpage({ showSidebar, showSidebarMobile, handleShowSidebar, handleShowSidebarMobile }) {
    const { navName } = usePage().props;
    // console.log(usePage().props);
    return (
        <nav className="fixed top-0 z-40 w-full bg-white border-b shadow-sm border-gray-200">
            <div className="px-3 py-4 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="block">
                        <div className={`flex items-center justify-start sm:justify-center rtl:justify-end text-gray-800 transition-transform ${showSidebar && 'sm:ml-64'} `}>
                            <button className='hidden sm:block' onClick={handleShowSidebar}>
                                <i className="fa-solid fa-bars fa-xl"></i>
                            </button>
                            <button className='block sm:hidden' onClick={handleShowSidebarMobile}>
                                <i className="fa-solid fa-bars fa-xl"></i>
                            </button>
                            <a href="/" className="flex ms-2 md:me-24">
                                <span className="self-center text-base sm:text-lg font-semibold  whitespace-nowrap">
                                    <div className="flex items-center">
                                        {navName}
                                    </div>
                                    {route().current('index.dashboard') ?
                                        'Dashboard' :
                                        route().current('index.ppl') ?
                                            'PPL'
                                            : route().current('input.ppl')
                                            && <div className="flex items-center">
                                                PPL
                                                <svg className="w-3 mx-1.5 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                                                </svg>
                                                Input Data
                                            </div>
                                    }
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <span className='px-2 text-gray-800 text-sm'>Kadek</span>
                            <Dropdown label="" dismissOnClick={false} renderTrigger={() =>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-300 :focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                </button>
                            }>
                                <DropdownItem>Kadek</DropdownItem>
                                <DropdownItem>user@gmail.com</DropdownItem>
                                <DropdownItem>
                                    <Link href={route('logout')} method="post" as="button">
                                        <i className="fa-solid fa-arrow-left mr-2"></i>
                                        Log Out
                                    </Link>
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
