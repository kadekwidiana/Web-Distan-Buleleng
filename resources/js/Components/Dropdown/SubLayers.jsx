import { DropdownLayer } from "@/Components/Dropdown/Layers";
import CheckboxLayer from "@/Components/Input/CheckboxLayer";
import { useState } from "react";

export const DropdownSubLayers = ({ subLayerName, children, showingSubLayer = false }) => {
    const [showSubLayer, setShowSubLayer] = useState(showingSubLayer);

    return (
        <>
            <div className="form-check flex justify-start items-center gap-1">
                <i onClick={() => setShowSubLayer(!showSubLayer)} className={`fa-solid ${showSubLayer ? 'fa-minus' : 'fa-plus'} text-gray-500 border border-gray-400 px-[2px] py-[1px] rounded-sm cursor-pointer`}></i>
                <label className="form-check-label" htmlFor="batas-kabupaten">
                    {subLayerName}
                </label>
            </div>
            <div className={`ml-4 flex flex-col justify-start gap-1 ${showSubLayer ? '' : 'hidden'}`}>
                {children}
            </div>
        </>
    )
}