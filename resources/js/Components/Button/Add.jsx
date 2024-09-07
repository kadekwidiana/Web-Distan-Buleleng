import { Link } from '@inertiajs/react'
import React from 'react'

export default function ButtonAdd({ href }) {
    return (
        <Link href={href} className='px-3 w-auto flex justify-center items-center gap-2 border-2 text-blue-500 border-blue-500 rounded-lg text-blueborder-blue-500'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.1665V15.8332" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.16675 10H15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className='whitespace-nowrap font-medium hidden lg:block'>Tambah data</span>
        </Link>
    )
}
