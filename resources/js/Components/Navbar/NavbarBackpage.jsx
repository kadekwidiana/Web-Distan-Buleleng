import React, { useState } from 'react'
// import DropdownLaravel from '../Dropdown';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { Link, usePage } from '@inertiajs/react';

export default function NavbarBackpage({ showSidebar, showSidebarMobile, handleShowSidebar, handleShowSidebarMobile }) {
    const { auth, navName } = usePage().props;

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
                            <a href="#" className="flex ms-2 md:me-24">
                                <span className="self-center text-base sm:text-lg font-semibold  whitespace-nowrap">
                                    <div className="flex items-center">
                                        {navName}
                                    </div>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <span className='px-2 text-gray-800 text-sm font-medium'>{auth.user.name}</span>
                            <Dropdown label="" dismissOnClick={false} renderTrigger={() =>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-300 :focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg" alt="user photo" />
                                </button>
                            }>
                                <DropdownItem>
                                    <Link href={'/profile'}>
                                        <i className="fa-solid fa-user mr-2"></i>
                                        Profile
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <a href={
                                        auth.user.role === 'ADMIN' ?
                                            '/assets/panduan/m5n7o3p1q2r8s9t4u6v0w3x7y8z1a2b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t.pdf'
                                            :
                                            '/assets/panduan/a4b8c1d7e2f6g9h3i0j5k4l8m2n7o1p6q9r0s3t4u5v8w1x2y7z6a0b9c1d4e3f5g7h.pdf'
                                    }>
                                        <i className="fa-solid fa-book mr-2"></i>
                                        Panduan
                                    </a>
                                </DropdownItem>
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
