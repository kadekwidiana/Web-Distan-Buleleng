import { DropdownLayer } from "@/Components/Dropdown/Layers";
import CheckboxLayer from "@/Components/Input/CheckboxLayer";
import { useState } from "react";

export const DropdownSubLayers = ({ subLayerName, children, showingSubLayer = false, dataRegion }) => {
    const [showSubLayer, setShowSubLayer] = useState(showingSubLayer);

    return (
        <>
            <div className="form-check flex justify-start items-center gap-1">
                <i onClick={() => setShowSubLayer(!showSubLayer)} className={`fa-solid ${showSubLayer ? 'fa-minus' : 'fa-plus'} text-gray-500 border border-gray-400 px-[2px] py-[1px] rounded-sm cursor-pointer`}></i>
                {dataRegion &&
                    <input id={`layer_region_district_${dataRegion.NAMOBJ}`} name={dataRegion.NAMOBJ} data-layer={dataRegion.NAMOBJ}
                        className={"w-4.5 h-4.5 text-blue-600 bg-gray-50 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-0 "}
                        type="checkbox" value="" />
                }
                <label className="form-check-label" htmlFor="batas-kabupaten">
                    {subLayerName}
                </label>
            </div>
            <div className={`ml-2 flex flex-col justify-start gap-1 ${showSubLayer ? '' : 'hidden'}`}>
                {children}
            </div>
        </>
    )
}