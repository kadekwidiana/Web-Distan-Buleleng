import { useEffect } from "react"
import useScriptSidebarMaps from "./useSidebars";
import useDataMaps from "./useDataMaps";
import { useMapControls } from "./useMapControls";
import { useBasemapLayers } from "./useBasemapLayers";
import { useDrawTools } from "./useDrawTools";
import useLayerAnalisis from "./useLayerAnalisis";
import { ATRIBUTE_NAME } from "@/Utils/Constan/Basemap";

//  LOGIC ANTI MAINSTREAM wkwk
const useInitializeMap = () => {
    useEffect(() => {
        const GOOGLE_STREET_MAP = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
            attribution: ATRIBUTE_NAME,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        });

        let map = L.map('maps-frontpage', {
            layers: [GOOGLE_STREET_MAP],
            center: [-8.198517680287658, 115.10051848149178],
            zoom: 10,
            minZoom: 5,
            zoomControl: false
        });

        useBasemapLayers(map)

        useDataMaps(map);

        useScriptSidebarMaps(map);

        useDrawTools(map);

        useMapControls(map);

        useLayerAnalisis(map);

    }, [])
}

export default useInitializeMap;