import { useState } from "react";
import CheckboxLayer from "../Input/CheckboxLayer";

export const DropdownLayer = ({ layerName, children, showLayers = false }) => {
    const [showLayer, setShowLayer] = useState(showLayers);

    return (
        <div>
            <div onClick={() => setShowLayer(!showLayer)} className={`w-full cursor-pointer bg-gray-400 px-2 py-1 rounded-sm ${showLayer && 'rounded-b-none'} flex justify-between items-center gap-2`}>
                <span>{layerName}</span>
                <i className={`fa-solid cursor-pointer ${showLayer ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </div>
            <div className={`p-2 border rounded rounded-t-none flex flex-col justify-start gap-1 ${showLayer ? 'block' : 'hidden'}`}>
                {/* CHECKBOX LAYERS */}
                {children}
            </div>
        </div>
    )
}