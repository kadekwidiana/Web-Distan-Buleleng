import CardBasemap from "@/Components/Card/Basemap"
import { DATA_BASEMAPS } from "@/Constant/Index"

export const SidebarBasemap = () => {
    return (
        <div className="max-h-[90dvh] sidebar-basemap bg-gray-50 mt-0 px-2" id="sidebar-basemap">
            <h5 className="text-center font-semibold text-gray-700 text-lg my-1">Basemap</h5>
            <div className="border mb-2"></div>
            <div className="grid grid-cols-2 gap-2">
                {DATA_BASEMAPS.map((basemap, i) => (
                    <CardBasemap key={i} value={basemap.value} basemapName={basemap.name} img={basemap.image} />
                ))}
            </div>
        </div>
    )
}