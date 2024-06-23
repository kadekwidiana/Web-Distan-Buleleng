import useScriptMapsInputPPL from '@/Hooks/MapsBackpage/useMapsInputPPL';
import React from 'react'

export default function MapsPPL() {
    useScriptMapsInputPPL();
    return (
        <div className="flex flex-col gap-9 lg:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6">
                    <h3 className="font-medium text-black">
                        Maps
                    </h3>
                </div>
                <div className="w-full h-96 lg:h-[600px]">
                    <div id='pplMaps' className="h-full z-30"></div>
                </div>
            </div>
        </div>
    )
}