import useMapsDetailData from '@/Hooks/MapsBackpage/useMapsDetailData';
import useMapsDetailDataSpatial from '@/Hooks/MapsBackpage/useMapsDetailDataSpatial';
import useMapsDetailRegion from '@/Hooks/MapsBackpage/useMapsDetailRegion';
import React from 'react';

export default function MapsDetailData({ data, isSpatial = false, isRegion = false }) {
    if (isSpatial) {
        useMapsDetailDataSpatial(data); // untuk detail maps data spasial
    } if (isRegion) {
        useMapsDetailRegion(data); // untuk detail maps data kewilayahan
    } if (!isRegion && !isSpatial) {
        // console.log('call maps region');
        useMapsDetailData(data); // untuk detail maps data pertanian (etc: gapoktan, poktan, subak, bpp, lahan pertanian, kegiatan penyuluhan, dll)
    }

    return (
        <div className="flex flex-col gap-9 lg:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6">
                    <h3 className="font-medium text-black">
                        Maps
                    </h3>
                </div>
                <div className="w-full h-96 lg:h-[400px]">
                    <div id='maps' className="h-full z-30"></div>
                </div>
            </div>
        </div>
    );
}