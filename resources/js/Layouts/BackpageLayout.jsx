import NavbarBackpage from '@/Components/Navbar/NavbarBackpage'
import SidebarBackpage from '@/Components/Sidebar/SidebarBackpage'
import React, { PropsWithChildren, ReactNode, useState } from 'react'

export default function BackpageLayout({ children }) {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSidebarMobile, setShowSidebarMobile] = useState(false);
    // console.log('click', showSidebar);

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
            <div className={`py-6 px-3 transition-transform ${showSidebar && 'sm:ml-64'}`}>
                <div className="mt-14">
                    {children}
                </div>
            </div>
        </>
    )
}
