import { Link } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
import HeaderSidebarBackpage from '../Header/SidebarBackpage';
import SidebarMenu from '../Menu/SidebarMenu';
import DropdownMenu from '../Menu/DropdownMenu';

const SidebarMenus = () => {
    return (
        <ul className="space-y-2 font-medium">
            <SidebarMenu
                href={'/dashboard'}
                icon={<i className="fa-solid fa-gauge"></i>}
                label={'Dashboard'}
            />
            <DropdownMenu
                icon={<i className="fa-solid fa-person-chalkboard"></i>}
                label={'PPL'}
                url={'/ppl'}
                subMenus={
                    <SidebarMenu
                        href={'/ppl'}
                        // icon={<i className="fa-solid fa-gauge"></i>}
                        label={'Index'}
                    />
                }
            />
            <DropdownMenu
                icon={<i className="fa-solid fa-building-columns"></i>}
                label={'Kelembagaan Pertanian'}
                url={'/kelembagaan-pertanian'}
                subMenus={
                    <>
                        <SidebarMenu
                            href={'/kelembagaan-pertanian/gapoktan'}
                            icon={<i className="fa-solid fa-users"></i>}
                            label={'Gabungan Kelompok Tani'}
                        />
                        <SidebarMenu
                            href={'#'}
                            icon={<i className="fa-solid fa-users"></i>}
                            label={'Kelompok Tani'}
                        />
                        <SidebarMenu
                            href={'#'}
                            icon={<i className="fa-solid fa-users"></i>}
                            label={'Subak'}
                        />
                    </>
                }
            />
        </ul>
    )
}

export default function SidebarBackpage({ showSidebar, showSidebarMobile, handleShowSidebar, handleShowSidebarMobile }) {
    const sidebarRef = useRef(null);

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            handleShowSidebarMobile(false);
        }
    }

    useEffect(() => {
        if (showSidebarMobile) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showSidebarMobile]);

    return (
        <>
            <aside className={`hidden sm:block fixed top-0 left-0 z-50 w-64 h-screen transition-transform ${showSidebar ? 'sm:translate-x-0' : '-translate-x-full'} `} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
                    <HeaderSidebarBackpage handleShowSidebarMobile={handleShowSidebarMobile} />
                    <SidebarMenus />
                </div>
            </aside>
            {/* sidebar mobile */}
            <aside className={`block sm:hidden fixed top-0 left-0 z-50 h-screen w-screen bg-black/30  transition-transform ${showSidebarMobile ? 'sm:translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
                <div ref={sidebarRef} className={`h-full w-64  px-3 pb-4 overflow-y-auto bg-gray-800`}>
                    <HeaderSidebarBackpage handleShowSidebarMobile={handleShowSidebarMobile} />

                    <SidebarMenus />
                </div>
            </aside>
        </>
    );
}
