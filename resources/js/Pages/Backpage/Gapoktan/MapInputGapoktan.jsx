import React from 'react'
import useMapInputGapoktan from './useMapInputGapoktan'

export default function MapsInputGapoktan() {
    useMapInputGapoktan();
    return (
        <div className="flex flex-col gap-9 lg:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6">
                    <h3 className="font-medium text-black">
                        Maps
                    </h3>
                </div>
                <div className="w-full h-96">
                    <div id='maps' className="h-full z-30"></div>
                </div>
            </div>
        </div>
    )
}