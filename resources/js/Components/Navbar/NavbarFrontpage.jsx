// import { a } from '@inertiajs/react'
import { Link, usePage } from '@inertiajs/react';
import { Dropdown, DropdownItem } from 'flowbite-react';
import React, { useState } from 'react';

export default function NavbarFrontpage() {
    const { auth } = usePage().props;
    const [showNavbar, setShowNavbar] = useState(false);

    return (
        <nav className="navbar-top text-white h-[10dvh] fixed top-0 w-full z-20 border-gray-200 sm:px-6 lg:px-2">
            <div className={`${showNavbar && 'navbar-top'} max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2`}>
                <a href="/" className="flex items-center space-x-1 sm:space-x-3 rtl:space-x-reverse">
                    <img src="./assets/images/logo-distan-buleleng-1.png" className="h-14"
                        alt="Logo" />
                    <div className="flex flex-col gap-0">
                        <span className="self-start text-xs sm:text-lg sm:font-medium">Sipetani</span>
                        <span className="self-start sm:text-2xl font-semibold">Dinas Pertanian Kab. Buleleng</span>
                    </div>
                </a>
                <button onClick={() => setShowNavbar(!showNavbar)} data-collapse-toggle="navbar-default" type="button"
                    className="inline-flex items-center p-1 w-8 h-8 justify-center rounded-lg lg:hidden"
                    aria-controls="navbar-default" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                </button>

                <div className={`${showNavbar ? '' : 'hidden'} transition-shadow w-full lg:block lg:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col lg:p-0 mt-4 mb-1 border shadow-2xl text-white rounded-lg lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 ">
                        <li>
                            <a href="/" className={`block py-2 px-3 text-white rounded lg:bg-transparent lg:p-0 ${route().current('landing-page') && 'underline underline-offset-4 font-bold'}`}
                                aria-current="page">Beranda</a>
                        </li>
                        <li>
                            <a href="/maps" className={`block py-2 px-3 text-white rounded lg:bg-transparent lg:p-0 ${route().current('maps-frontpage') && 'underline underline-offset-4 font-bold'}`}
                                aria-current="page">Peta Geografis</a>
                        </li>
                        <li>
                            <a href="/information" className={`block py-2 px-3 text-white rounded lg:bg-transparent lg:p-0 ${route().current('information-frontpage') && 'underline underline-offset-4 font-bold'}`}
                                aria-current="page">Informasi Pertanian</a>
                        </li>
                        <li>

                            <Dropdown placement='bottom-end' dismissOnClick={false} renderTrigger={() =>
                                <div className={`w-fit block py-2 px-3 text-white rounded lg:bg-transparent lg:p-0 cursor-pointer`}
                                    aria-current="page">
                                    <i className="fa-solid fa-user mr-1"></i>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            }>
                                <DropdownItem>
                                    <a href={'/assets/panduan/Buku Panduan SIG Distan Buleleng.pdf'}>
                                        <i className="fa-solid fa-book mr-2"></i>
                                        Panduan
                                    </a>
                                </DropdownItem>
                                {auth?.user ?
                                    <>
                                        <DropdownItem>
                                            <a href={'/profile'}>
                                                <i className="fa-solid fa-user mr-2"></i>
                                                {auth?.user?.name}
                                            </a>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <a href={'/dashboard'}>
                                                <i className="fa-solid fa-gauge mr-2"></i>
                                                Dashboard
                                            </a>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link href={route('logout')} method="post" as="button">
                                                <i className="fa-solid fa-arrow-left mr-2"></i>
                                                Log Out
                                            </Link>
                                        </DropdownItem>
                                    </>
                                    :
                                    <>
                                        <DropdownItem>
                                            <a href={'/login'}>
                                                <i className="fa-solid fa-arrow-right mr-2"></i>
                                                Login
                                            </a>
                                        </DropdownItem>
                                    </>
                                }
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
