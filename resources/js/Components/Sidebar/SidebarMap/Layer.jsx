import { DropdownLayer } from "@/Components/Dropdown/Layers";
import { DropdownSubLayers } from "@/Components/Dropdown/SubLayers";
import CheckboxLayer from "@/Components/Input/CheckboxLayer";
import { usePage } from "@inertiajs/react";

export const SidebarLayer = () => {
    const {
        layerGroups,
        typeAgricultures,
        commodities,
        typeLandAgricultures,
        dataSpatials,
        gapoktans,
        poktans,
        subaks,
        landAgricultures,
    } = usePage().props;

    return (
        <div className="max-h-[90dvh] sidebar-layer bg-white mt-0 pb-5 px-2" id="sidebar-layer">
            <h1 className="text-center font-semibold text-gray-700 text-lg my-1">Layers</h1>
            <div className="border"></div>
            <div className="mt-2 flex flex-col gap-2">
                {/* LAYER GROUP */}
                {layerGroups && layerGroups.map((layerGroup) => (
                    <DropdownLayer key={layerGroup.name} layerName={layerGroup.name} showLayers={true}>
                        {/* DATA SPATIAL */}
                        {dataSpatials.map((dataSpatial) => (
                            dataSpatial.layer_group_id === layerGroup.id ?
                                <CheckboxLayer key={dataSpatial.id} id={dataSpatial.name} icon={dataSpatial.icon} label={dataSpatial.name} />
                                :
                                null
                        ))}
                        {/* TYPE AGRICULTURE */}
                        {layerGroup.name === 'Komoditas' ?
                            typeAgricultures.map((typeAgriculture) => (
                                <DropdownSubLayers key={typeAgriculture.id} subLayerName={typeAgriculture.name} showingSubLayer={true}>
                                    {commodities.map((commodity) => (
                                        commodity.type_agriculture_id === typeAgriculture.id ?
                                            <CheckboxLayer key={commodity.name} id={commodity.name} icon={`/storage/${commodity.icon}`} label={commodity.name} />
                                            :
                                            null
                                    ))}
                                </DropdownSubLayers>
                            ))
                            :
                            null
                        }

                        {/* ORGANISASI PERTANIAN */}
                        {layerGroup.name === 'Pertanian' ?
                            <div>
                                <CheckboxLayer id={'layer_gapoktan'} icon={gapoktans[0].icon} label={'Gabungan Kelompok Tani'} />
                                <CheckboxLayer id={'layer_poktan'} icon={poktans[0].icon} label={'Kelompok Tani'} />
                                <CheckboxLayer id={'layer_subak'} icon={subaks[0].icon} label={'Subak'} />
                                <CheckboxLayer id={'layer_lahan_pertanian'} icon={landAgricultures[0].icon} label={'Lahan Pertanian'} />
                            </div>
                            :
                            null
                        }
                    </DropdownLayer>
                ))}
            </div>
        </div >
    )
}