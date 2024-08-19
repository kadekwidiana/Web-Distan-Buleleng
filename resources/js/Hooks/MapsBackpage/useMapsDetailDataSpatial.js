import { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/leaflet.draw';
import axios from 'axios';
import { ATRIBUTE_NAME, GOOGLE_HYBRID_MAP, GOOGLE_STREET_MAP, OPEN_STREET_MAP, SATELLITE_MAP } from "@/Constant/Basemap";
import shp from 'shpjs';

const useMapsDetailDataSpatial = (data) => {
    useEffect(() => {
        const GOOGLE_HYBRID_MAP = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
            attribution: ATRIBUTE_NAME,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        });

        const coorBali = [-8.198517680287658, 115.10051848149178];

        const map = L.map('maps', {
            layers: [GOOGLE_HYBRID_MAP],
            center: data.location ?? coorBali,
            zoom: 10,
            zoomControl: false
        });

        const baseMaps = {
            "OpenStreetMap": OPEN_STREET_MAP,
            "Google Street": GOOGLE_STREET_MAP,
            "Google Satellite": SATELLITE_MAP,
            "Google Hybrid": GOOGLE_HYBRID_MAP
        };

        const layerControl = L.control.layers(baseMaps).addTo(map);

        const customZoomControl = L.control.zoom({
            position: 'bottomright'
        });
        map.addControl(customZoomControl);

        const layerGroup = L.layerGroup();

        const createPopupContent = (properties) => {
            let popupContent = "<div><h4>Feature Information</h4><ul>";
            for (const key in properties) {
                if (properties.hasOwnProperty(key)) {
                    popupContent += `<li><strong>${key}:</strong> ${properties[key]}</li>`;
                }
            }
            popupContent += "</ul></div>";
            return popupContent;
        };

        const onEachFeature = (feature, layer) => {
            if (feature.properties) {
                const popupContent = createPopupContent(feature.properties);
                layer.bindPopup(popupContent);
            }
        };

        const fetchDataGeoJson = async (dataGeoJson, color) => {
            try {
                const response = await axios.get(dataGeoJson);

                L.geoJSON(response.data, {
                    style: (feature) => {
                        // Mengatur warna berdasarkan properti `color` pada dataSpatial atau fitur GeoJSON
                        // const color = feature.properties?.color || '#000000'; // Default ke hitam jika tidak ada
                        return {
                            color: color,
                            weight: 2,
                            opacity: 1
                        };
                    },
                    onEachFeature: onEachFeature
                }).addTo(layerGroup);

                layerControl.addOverlay(layerGroup, 'GeoJSON Layer');

                layerGroup.addTo(map);
            } catch (error) {
                console.error(`Error fetching GeoJSON: ${error.message}`);
            }
        };

        const fetchShapefileFromZip = async (url, color) => {
            try {
                const response = await axios({
                    method: "GET",
                    url,
                    responseType: 'arraybuffer'
                });

                const geojsonConvert = await shp(response.data);

                L.geoJSON(geojsonConvert, {
                    style: (feature) => {
                        // Ambil warna dari properti atau tetapkan warna default
                        // const color = feature.properties?.color || '#000000'; // Default ke hitam jika tidak ada
                        return {
                            color: color,
                            weight: 2,
                            opacity: 1
                        };
                    },
                    onEachFeature: onEachFeature
                }).addTo(layerGroup);

                layerControl.addOverlay(layerGroup, 'Shapefile Layer');
                layerGroup.addTo(map);

            } catch (error) {
                console.error(`Error fetching Shapefile: ${error.message}`);
            }
        };

        if (data.file) {
            if (data.file.endsWith('.geojson')) {
                fetchDataGeoJson(`/storage/${data.file}`, data.color);
            } else if (data.file.endsWith('.zip')) {
                fetchShapefileFromZip(`/storage/${data.file}`, data.color);
            }
        }

    }, [data]);
}

export default useMapsDetailDataSpatial;
