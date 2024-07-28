import { useEffect } from "react"
// leaflet
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// leaflet draw
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw/dist/leaflet.draw'
import { ATRIBUTE_NAME, GOOGLE_HYBRID_MAP, OPEN_STREET_MAP, SATELLITE_MAP } from "@/Utils/Constan/Basemap";

const useMapsDetailData = (data) => {
    useEffect(() => {
        const GOOGLE_STREET_MAP = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
            attribution: ATRIBUTE_NAME,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        });

        const coorBali = [-8.198517680287658, 115.10051848149178];

        const map = L.map('maps', {
            layers: [GOOGLE_STREET_MAP],
            center: data.location ?? coorBali,
            zoom: 18,
            // minZoom: ,
            zoomControl: false
        });

        // custom marker Baresoil
        let locationIcon = L.icon({
            iconUrl: data.icon ?? '/assets/icons/icon-marker/location-pin.png',
            iconSize: [40, 40], // Ukuran ikon (lebar, tinggi)
            iconAnchor: [20, 40], // Titik penambatan ikon (lebar / 2, tinggi)
            popupAnchor: [0, -40] // Titik penambatan popup (lebar / 2, tinggi)
        });

        const marker = L.marker(data.location ?? coorBali, { icon: locationIcon }).addTo(map)
            .bindPopup(`
                <div class='flex flex-col justify-center items-center gap-1'>
                <span>Lokasi ${data.name ?? ''}</span>
                <a href='http://maps.google.com/maps?q=&layer=c&cbll=${data.location}&cbp=11,0,0,0' target='_blank' class='text-blue-500 font-semibold underline'>Street view</a>
                </div>
                `)
            .openPopup();

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

    }, [])
}

export default useMapsDetailData;