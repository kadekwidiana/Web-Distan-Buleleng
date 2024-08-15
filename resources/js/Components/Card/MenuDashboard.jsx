import { Link } from '@inertiajs/react'
import React from 'react'

export default function CardMenuDashboard({ icon, bgIcon, label, count, url }) {
    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-${bgIcon}-600 to-${bgIcon}-400 text-white shadow-${bgIcon}-500/40 shadow-lg absolute -mt-4 grid h-14 w-14 place-items-center`}>
                {icon}
            </div>
            <div className="px-4 py-2 text-right">
                <p className="ml-16 block antialiased font-sans text-base leading-normal font-normal text-gray-600">{label}</p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-gray-800">{count}</h4>
            </div>
            <div className="border-t border-blue-gray-50 px-4 py-2">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <Link href={url}>
                        <p className="text-blue-500 font-semibold">Lihat Detail</p>
                    </Link>
                </p>
            </div>
        </div>
    )
}
