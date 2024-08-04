import { Link, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import SidebarMenu from './SidebarMenu';

export default function DropdownMenu({ url, icon, label, subMenus }) {
    const pathname = usePage().url;
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    useEffect(() => {
        pathname.startsWith(url) && setShowDropdown(true)
    }, [pathname])

    return (
        <li>
            <button onClick={toggleDropdown} type="button" className={`flex items-center w-full p-2 text-base text-gray-50 transition duration-75 rounded-sm hover:bg-gray-700 group ${showDropdown ? 'bg-gray-700' : ''}`} aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                <div className="w-4 flex justify-start">
                    {icon}
                </div>
                <span className="flex-1 ms-2 text-gray-50 text-left rtl:text-right whitespace-nowrap">{label}</span>
                <i className={`fa-solid ${showDropdown ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            <ul id="dropdown-example" className={`${showDropdown ? '' : 'hidden'} py-2 space-y-2`}>
                {subMenus}
            </ul>
        </li>
    )
}
