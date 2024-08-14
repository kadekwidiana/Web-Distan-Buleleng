import { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/leaflet.draw';
import axios from 'axios';
import { ATRIBUTE_NAME, GOOGLE_HYBRID_MAP, OPEN_STREET_MAP, SATELLITE_MAP } from "@/Utils/Constan/Basemap";
import shp from 'shpjs';

const useMapsDetailDataSpatial = (data) => {
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

        const fetchDataGeoJson = async (dataGeoJson) => {
            try {
                const response = await axios.get(dataGeoJson);

                L.geoJSON(response.data, {
                    onEachFeature: onEachFeature
                }).addTo(layerGroup);

                layerControl.addOverlay(layerGroup, 'GeoJSON Layer');

                layerGroup.addTo(map);
            } catch (error) {
                console.error(`Error fetching GeoJSON: ${error.message}`);
            }
        };

        const fetchShapefileFromZip = async (url) => {
            try {
                const response = await axios({
                    method: "GET",
                    url,
                    responseType: 'arraybuffer'
                });

                const geojsonConvert = await shp(response.data);

                L.geoJSON(geojsonConvert, {
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
                fetchDataGeoJson(`/storage/${data.file}`);
            } else if (data.file.endsWith('.zip')) {
                fetchShapefileFromZip(`/storage/${data.file}`);
            }
        }

    }, [data]);
}

export default useMapsDetailDataSpatial;
