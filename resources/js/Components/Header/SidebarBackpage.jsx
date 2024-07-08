import { Link } from '@inertiajs/react'
import React from 'react'

export default function HeaderSidebarBackpage({ handleShowSidebarMobile }) {
    return (
        <div className="sm:block flex justify-between items-start">
            <div className="my-6 mx-2">
                <Link href="/" className="text-gray-50 text-3xl font-semibold uppercase flex justify-start items-center">
                    <img src="/assets/images/logo-buleleng.png" width={100} height={100} alt="Picture of the author" className='w-24' />
                </Link>
                <p className="mt-2 text-gray-50 font-semibold text-xl">Dashboard,</p>
                <p className="text-gray-50 font-semibold text-xl">SIG Dinas Pertanian</p>
            </div>
            <button onClick={handleShowSidebarMobile} className='block sm:hidden pt-3 pr-1 text-gray-100'>
                <i className="fa-solid fa-arrow-left fa-lg"></i>
            </button>
        </div>
    )
}
