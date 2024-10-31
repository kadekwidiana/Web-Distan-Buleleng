import { Link, usePage } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
import HeaderSidebarBackpage from '../Header/SidebarBackpage';
import SidebarMenu from '../Menu/SidebarMenu';
import DropdownMenu from '../Menu/DropdownMenu';

const SidebarMenus = () => {
    const { auth } = usePage().props;
    return (
        <ul className="space-y-2 font-medium">
            <SidebarMenu
                href={'/dashboard'}
                icon={<i className="fa-solid fa-gauge"></i>}
                label={'Dashboard'}
            />
            {auth.user.role === 'ADMIN' &&
                <DropdownMenu
                    icon={<i className="fa-solid fa-database"></i>}
                    label={'Master Data'}
                    url={'/master-data'}
                    subMenus={
                        <>
                            <SidebarMenu
                                href={'/master-data/kecamatan'}
                                icon={<i className="fa-solid fa-database"></i>}
                                label={'Kecamatan'}
                            />
                            <SidebarMenu
                                href={'/master-data/desa'}
                                icon={<i className="fa-solid fa-database"></i>}
                                label={'Desa'}
                            />
                            <SidebarMenu
                                href={'/master-data/jenis-pertanian'}
                                icon={<i className="fa-solid fa-database"></i>}
                                label={'Jenis Pertanian'}
                            />
                            <SidebarMenu
                                href={'/master-data/jenis-lahan-pertanian'}
                                icon={<i className="fa-solid fa-database"></i>}
                                label={'Jenis Lahan Pertanian'}
                            />
                            <SidebarMenu
                                href={'/master-data/komoditas'}
                                icon={<i className="fa-solid fa-database"></i>}
                                label={'Komoditas'}
                            />
                            {/* <SidebarMenu
                            href={'/master-data/layer-grup'}
                            icon={<i className="fa-solid fa-database"></i>}
                            label={'Layer Grup'}
                        /> */}
                        </>
                    }
                />
            }
            <DropdownMenu
                icon={<i className="fa-solid fa-building-columns"></i>}
                label={'Kelembagaan Pertanian'}
                url={'/kelembagaan-pertanian'}
                subMenus={
                    <>
                        <SidebarMenu
                            href={'/kelembagaan-pertanian/gapoktan'}
                            icon={<i className="fa-solid fa-building-columns"></i>}
                            label={'Gabungan Kelompok Tani'}
                        />
                        <SidebarMenu
                            href={'/kelembagaan-pertanian/poktan'}
                            icon={<i className="fa-solid fa-building-columns"></i>}
                            label={'Kelompok Tani'}
                        />
                        <SidebarMenu
                            href={'/kelembagaan-pertanian/subak'}
                            icon={<i className="fa-solid fa-building-columns"></i>}
                            label={'Subak'}
                        />
                    </>
                }
            />
            {auth.user.role === 'ADMIN' &&
                <>
                    <SidebarMenu
                        href={'/bpp'}
                        icon={<i className="fa-solid fa-building-columns"></i>}
                        label={'Balai Penyuluh Pertanian'}
                    />
                    <SidebarMenu
                        href={'/pemilik-penggarap'}
                        icon={<i className="fa-solid fa-user"></i>}
                        label={'Pemilik/Penggarap Lahan'}
                    />
                </>
            }
            <SidebarMenu
                href={'/lahan_pertanian'}
                icon={<i className="fa-solid fa-chart-area"></i>}
                label={'Lahan Pertanian'}
            />
            {auth.user.role === 'ADMIN' &&
                <SidebarMenu
                    href={'/ppl'}
                    icon={<i className="fa-solid fa-users"></i>}
                    label={'Data Penyuluh'}
                />
            }
            <SidebarMenu
                href={'/penyuluhan'}
                icon={<i className="fa-solid fa-clipboard"></i>}
                label={'Kegiatan Penyuluhan'}
            />
            {auth.user.role === 'ADMIN' &&
                <>
                    <SidebarMenu
                        href={'/data-spasial'}
                        icon={<i className="fa-solid fa-map"></i>}
                        label={'Data Spasial'}
                    />
                    <DropdownMenu
                        icon={<i className="fa-solid fa-file"></i>}
                        label={'Management Laporan'}
                        url={'/management-report'}
                        subMenus={
                            <>
                                <SidebarMenu
                                    href={'/management-report/penyuluhan'}
                                    icon={<i className="fa-solid fa-file"></i>}
                                    label={'Penyuluhan'}
                                />
                                <SidebarMenu
                                    href={'/management-report/lahan-pertanian'}
                                    icon={<i className="fa-solid fa-file"></i>}
                                    label={'Lahan Pertanian'}
                                />
                            </>
                        }
                    />
                </>
            }
        </ul>
    );
};

export default function SidebarBackpage({ showSidebar, showSidebarMobile, handleShowSidebar, handleShowSidebarMobile }) {
    const sidebarRef = useRef(null);

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            handleShowSidebarMobile(false);
        }
    };

    useEffect(() => {
        if (showSidebarMobile) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
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
