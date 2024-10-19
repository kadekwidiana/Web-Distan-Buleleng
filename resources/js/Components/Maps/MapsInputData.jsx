import useMapsInputData from '@/Hooks/MapsBackpage/useMapsInputData';
import React from 'react';

export default function MapsInputData({ isEdit = false, data = null, mapsHeight = 'h-96' }) {
    useMapsInputData(isEdit, data);
    return (
        <div className="flex flex-col gap-9 lg:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6">
                    <h3 className="font-medium text-black">
                        Maps
                    </h3>
                </div>
                <div className={`w-full ${mapsHeight}`}>
                    <div id='maps-input' className="h-full z-30"></div>
                </div>
            </div>
        </div>
    );
}