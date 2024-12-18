import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { SidebarAnalisis, SidebarBasemap, SidebarLayer, SidebarLegend } from '@/Components/Sidebar/SidebarMap/Index';
import FrontpageLayout from '@/Layouts/FrontpageLayout';
import useInitializeMaps from '@/Hooks/MapsFrontpage/useInitializeMaps';

export default function MapsPage() {
    useInitializeMaps();

    return (
        <>
            <Head>
                <title>Peta Geografis</title>
                <meta
                    name="description"
                    content="Peta Geografis Dinas Pertanian Kabupaten Buleleng menampilkan peta interaktif yang memberikan informasi geografis terkait pertanian di Kabupaten Buleleng, termasuk data lahan, batas wilayah, dan informasi lainnya."
                />
                <meta
                    name="keywords"
                    content="Peta Pertanian, Peta Geografis, Pertanian Buleleng, Data Lahan, Batas Wilayah, Informasi Pertanian, Peta Interaktif"
                />
                <meta name="author" content="Dinas Pertanian Kabupaten Buleleng" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Sipetani - Peta Geografis" />
                <meta
                    property="og:description"
                    content="Menampilkan peta interaktif dengan informasi geografis tentang pertanian di Kabupaten Buleleng."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sipetani.bulelengkab.go.id/maps" />
                <meta property="og:image" content="https://sipetani.bulelengkab.go.id/assets/images/logo-buleleng.png" />
                <meta property="og:locale" content="id_ID" />
                <link rel="canonical" href="https://sipetani.bulelengkab.go.id/maps" />
            </Head>

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
    );
}
