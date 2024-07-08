import { Link } from '@inertiajs/react'
import React from 'react'

export default function ButtonBack({ url = '', className, label }) {
    return (
        url !== '' ?
            <Link href={url} className={'inline-flex justify-center gap-1 w-auto items-center mb-2 text-gray-800 ' + className}>
                <i className="fa-solid fa-arrow-left"></i>
                <span>{label ?? 'Kembali'}</span>
            </Link>
            :
            <button onClick={() => window.history.back()} className={'flex justify-center gap-1 w-auto items-center mb-2 text-gray-800 ' + className}>
                <i className="fa-solid fa-arrow-left"></i>
                <span>{label ?? 'Kembali'}</span>
            </button>
    )
}
