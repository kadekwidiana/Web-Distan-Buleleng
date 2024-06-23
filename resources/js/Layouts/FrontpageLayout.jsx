import NavbarFrontpage from '@/Components/Navbar/NavbarFrontpage'
import React, { PropsWithChildren } from 'react'

export default function FrontpageLayout({ children }) {
    return (
        <>
            <NavbarFrontpage></NavbarFrontpage>
            <div className="mt-[10dvh] w-screen">
                {children}
            </div>
        </>
    )
}