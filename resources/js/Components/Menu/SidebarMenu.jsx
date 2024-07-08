import { Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function SidebarMenu({ href, icon, label, routeName }) {
    const pathname = usePage().url
    return (
        <li>
            <Link href={href} className={`flex items-center p-2 text-gray-50 rounded-sm hover:bg-gray-700 group ${pathname.startsWith(href) && 'bg-gray-700'}`}>
                {icon}
                <span className="ms-2 text-gray-50">{label}</span>
            </Link>
        </li>
    )
}
