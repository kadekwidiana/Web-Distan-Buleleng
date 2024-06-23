import { DropdownLayer } from "@/Components/Dropdown/Layers";
import { DropdownSubLayers } from "@/Components/Dropdown/SubLayers";
import CheckboxLayer from "@/Components/Input/CheckboxLayer";
import { usePage } from "@inertiajs/react";

export const SidebarLayer = () => {
    const { dataLayers } = usePage().props;
    console.log(dataLayers);
    console.log(usePage().props);

    return (
        <div className="max-h-[90dvh] sidebar-layer bg-white mt-0 pb-5 px-2" id="sidebar-layer">
            <h1 className="text-center font-semibold text-gray-700 text-lg my-1">Layers</h1>
            <div className="border"></div>
            <div className="mt-2 flex flex-col gap-2">
                {dataLayers && dataLayers.map((dataLayer) => (
                    <DropdownLayer key={dataLayer.typeLayerName} layerName={dataLayer.typeLayerName} showLayers={true}>
                        {dataLayer.layers.map((layer) => (
                            <div key={layer.id}>
                                {layer.subLayers ?
                                    <DropdownSubLayers key={layer.name} subLayerName={layer.name}>
                                        {layer.subLayers.map((subLayer) => (
                                            <CheckboxLayer key={subLayer.name} id={subLayer.name} icon={subLayer.icon} label={subLayer.name} />
                                        ))}
                                    </DropdownSubLayers>
                                    :
                                    <CheckboxLayer key={layer.name} id={layer.name} icon={layer.icon} label={layer.name} />
                                }
                            </div>
                        ))}
                    </DropdownLayer>
                ))}

                <DropdownLayer layerName={'Layers 1'} showLayers={false}>
                    <CheckboxLayer id={'layer-1'} icon={"/assets/icons/icon-marker/corn.png"} label={"Layer 1"} />
                    <CheckboxLayer id={'layer-1'} icon={"/assets/icons/icon-marker/corn.png"} label={"Layer 1"} />
                    <DropdownSubLayers subLayerName={'Sub Layers 1'}>
                        <CheckboxLayer id={'layer-1'} icon={"/assets/icons/icon-marker/corn.png"} label={"Layer 1"} />
                    </DropdownSubLayers>
                </DropdownLayer>

                <DropdownLayer layerName={'Administrasi'} showLayers={false}>
                    <CheckboxLayer id='batas-kabupaten' icon="/assets/icons/icon-marker/corn.png" label="Batas Kabupaten" />
                    <CheckboxLayer id='batas-kecamatan' icon="/assets/icons/icon-marker/corn.png" label="Batas Kecamatan" />
                    <CheckboxLayer id='batas-desa' icon="/assets/icons/icon-marker/corn.png" label="Batas Desa" />
                </DropdownLayer>

                <DropdownLayer layerName='Pertanian' showLayers={false}>
                    <CheckboxLayer id='kelompok-tani' icon="/assets/icons/icon-marker/corn.png" label="Kelompok Tani" />
                </DropdownLayer>
            </div>
        </div >
    )
}