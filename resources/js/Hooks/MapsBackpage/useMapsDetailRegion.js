import { useEffect } from "react";
// leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// leaflet draw
import { ATRIBUTE_NAME, GOOGLE_STREET_MAP, OPEN_STREET_MAP, SATELLITE_MAP } from "@/Constant/Basemap";
import 'leaflet-draw/dist/leaflet.draw';
import 'leaflet-draw/dist/leaflet.draw.css';

const useMapsDetailRegion = (data) => {
    useEffect(() => {
        const GOOGLE_HYBRID_MAP = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
            attribution: ATRIBUTE_NAME,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        });

        const coorBali = [-8.198517680287658, 115.10051848149178];
        // console.log(data.center_coordinate);O
        const map = L.map('maps', {
            layers: [GOOGLE_HYBRID_MAP],
            center: data.center_coordinate ?? coorBali,
            zoom: 11,
            // minZoom: ,
            zoomControl: false
        });

        let polygon = L.geoJSON(data.area_json ?? []).addTo(map);

        const baseMaps = {
            "OpenStreetMap": OPEN_STREET_MAP,
            "Google Street": GOOGLE_STREET_MAP,
            "Google Satelite": SATELLITE_MAP,
            "Google Hibrid": GOOGLE_HYBRID_MAP
        };

        const layerControl = L.control.layers(baseMaps).addTo(map);

        // Custom zoom control
        const customZoomControl = L.control.zoom({
            position: 'bottomright'
        });
        // Add the custom zoom control to the map
        map.addControl(customZoomControl);

    }, []);
};

export default useMapsDetailRegion;