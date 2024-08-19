import React from 'react'

export default function CardBasemap({ value, img, basemapName }) {
    return (
        <label htmlFor=''>
            <div className="">
                <img src={img} alt={basemapName} className="w-32 h-28 object-cover border rounded-md border-gray-400" />
                <div className="flex justify-start items-center gap-1">
                    <input className="form-check-input" type="radio" name="basemap" id={value} value={value} defaultChecked={basemapName === 'Hybrid'} />
                    <span>
                        {basemapName}
                    </span>
                </div>
            </div>
        </label>
    )
}
