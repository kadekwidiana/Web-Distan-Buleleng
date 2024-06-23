import React, { useEffect } from 'react'
import { Head } from '@inertiajs/react';
import { SidebarAnalisis, SidebarBasemap, SidebarLayer, SidebarLegend } from '@/Components/Sidebar/SidebarMap/Index';
import FrontpageLayout from '@/Layouts/FrontpageLayout';
import useInitializeMap from '@/Hooks/MapsFrontpage/useInitializeMap';

export default function MapsPage() {
    useInitializeMap();

    return (
        <>
            <Head title="Peta Geografis" />
            {/* Navbar component */}
            <FrontpageLayout>
                {/* <!-- Sidebar basemap --> */}
                <SidebarBasemap></SidebarBasemap>

                {/* <!-- Sidebar layer --> */}
                <SidebarLayer></SidebarLayer>

                {/* <!-- Sidebar legend --> */}
                <SidebarLegend></SidebarLegend>

                {/* <!-- Sidebar analisis --> */}
                <SidebarAnalisis></SidebarAnalisis>

                {/* // <div className=""></div> */}
                <div id="maps-frontpage" className='grid w-full h-[90dvh] z-0'>
                    {/* Maps */}
                </div>
            </FrontpageLayout>
        </>
    )
}
