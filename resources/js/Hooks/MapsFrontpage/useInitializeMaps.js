import { useEffect } from "react";
import useScriptSidebarMaps from "./useSidebars";
import useDataMaps from "./useDataMaps";
import { useBasemapLayers } from "./useBasemapLayers";
import { useDrawTools } from "./useDrawTools";
import useLayerAnalisis from "./useLayerAnalisis";
import { ATRIBUTE_NAME } from "@/Constant/Basemap";
import { usePage } from "@inertiajs/react";
// leaflet
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// leaflet draw
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/leaflet.draw';
// leaflet hash
import '/public/assets/js-leaflet/leaflet-hash';
// leaflet navbar
import '/public/assets/css-leaflet/Leaflet.NavBar.css';
import '/public/assets/js-leaflet/Leaflet.NavBar';
import { useMapsControls } from "./useMapsControls";

//  LOGIC ANTI MAINSTREAM wkwk
const useInitializeMaps = () => {
    const {
        layerGroups,
        typeAgricultures,
        commodities,
        typeLandAgricultures,
        dataSpatials,
        gapoktans,
        poktans,
        subaks,
        bpps,
        landAgricultures,
        districts,
        villages,
    } = usePage().props;

    useEffect(() => {
        const GOOGLE_HYBRID_MAP = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
            attribution: ATRIBUTE_NAME,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        });

        let map = L.map('maps-frontpage', {
            layers: [GOOGLE_HYBRID_MAP],
            center: [-8.198517680287658, 115.10051848149178],
            zoom: 10,
            minZoom: 5,
            zoomControl: false
        });

        useBasemapLayers(map);

        useDataMaps(
            map,
            {
                layerGroups,
                typeAgricultures,
                commodities,
                typeLandAgricultures,
                dataSpatials,
                gapoktans,
                poktans,
                subaks,
                bpps,
                landAgricultures,
                districts,
                villages
            }
        );

        useScriptSidebarMaps(map);

        useDrawTools(map);

        useMapsControls(map);

        useLayerAnalisis(map);

    }, []);
};

export default useInitializeMaps;