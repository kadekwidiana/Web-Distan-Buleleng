import NavbarBackpage from '@/Components/Navbar/NavbarBackpage'
import SidebarBackpage from '@/Components/Sidebar/SidebarBackpage'
import { useStore } from '@/Store/Index.store';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow';

const includesUrl = [
    '/maps',
    '/create-step-one',
    '/create-step-two',
    '/edit-step-one',
    '/edit-step-two',
];

export default function BackpageLayout({ children }) {
    const pathname = usePage().url;
    const { clearStore } = useStore(
        useShallow((state) => (
            {
                clearStore: state.clearStore
            }
        )),
    );

    const [showSidebar, setShowSidebar] = useState(true);
    const [showSidebarMobile, setShowSidebarMobile] = useState(false);

    // hapus store jika tidak di halaman includesUrl
    useEffect(() => {
        const pathsToCheck = includesUrl;
        if (!pathsToCheck.some(path => pathname.includes(path))) {
            clearStore();
        }
    }, [pathname]);

    const handleShowSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const handleShowSidebarMobile = () => {
        setShowSidebarMobile(!showSidebarMobile);
    }

    return (
        <>
            <NavbarBackpage showSidebar={showSidebar} handleShowSidebar={handleShowSidebar} showSidebarMobile={showSidebarMobile} handleShowSidebarMobile={handleShowSidebarMobile}></NavbarBackpage>
            <SidebarBackpage showSidebar={showSidebar} handleShowSidebar={handleShowSidebar} showSidebarMobile={showSidebarMobile} handleShowSidebarMobile={handleShowSidebarMobile}></SidebarBackpage>
            <div className={`py-3 px-1.5 md:py-6 md:px-3 transition-transform ${showSidebar && 'sm:ml-64'}`}>
                <div className="mt-14">
                    {children}
                </div>
            </div>
        </>
    )
}
