import React from 'react'

export default function CheckboxLayer({ id, label, icon, className = '' }) {
    return (
        <div className="form-check flex justify-start items-center gap-1">
            <input id={id} name={id} data-layer={id}
                className={"w-4.5 h-4.5 text-blue-600 bg-gray-50 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-0 " + className}
                type="checkbox" value="" />
            {icon &&
                <img src={icon} alt={label} className="max-w-8" />
            }
            <label className="form-check-label" htmlFor={id}>
                {label}
            </label>
        </div>
    )
}
