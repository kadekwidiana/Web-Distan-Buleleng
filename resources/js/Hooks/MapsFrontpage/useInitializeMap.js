import { useEffect } from "react"
import useScriptSidebarMaps from "./useSidebars";
import useDataMaps from "./useDataMaps";
import { GOOGLE_STREET_MAP } from "@/Utils/Constan/Basemap";
import { useMapControls } from "./useMapControls";
import { useBasemapLayers } from "./useBasemapLayers";
import { useDrawTools } from "./useDrawTools";
import useLayerAnalisis from "./useLayerAnalisis";

//  LOGIC ANTI MAINSTREAM wkwk
const useInitializeMap = () => {
    useEffect(() => {
        let map = L.map('maps-frontpage', {
            layers: [GOOGLE_STREET_MAP],
            center: [-8.198517680287658, 115.10051848149178],
            zoom: 10,
            minZoom: 5,
            zoomControl: false
        });

        useBasemapLayers(map);

        useDataMaps(map);

        useScriptSidebarMaps(map);

        useDrawTools(map);

        useMapControls(map);

        useLayerAnalisis(map);

    }, [])
}

export default useInitializeMap;