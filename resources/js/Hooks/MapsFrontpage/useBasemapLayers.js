import { ESRI_SATELLITE, ESRI_WORLD_STREET_MAP, GOOGLE_EARTH, GOOGLE_HYBRID_MAP, GOOGLE_STREET_MAP, OPEN_STREET_MAP, OPEN_TOPO_MAP, SATELLITE_MAP } from "@/Utils/Constan/Basemap";
import L from 'leaflet';

export const useBasemapLayers = (map) => {
    function changeBasemap(newBasemap) {
        map.eachLayer(function (layer) {
            if (layer !== newBasemap) {
                map.removeLayer(layer);
            }
        });
        newBasemap.addTo(map);
    }

    // List option basemap and id element input related in HTML
    const basemapOptions = [
        { name: "openStreetMap", layer: OPEN_STREET_MAP },
        { name: "googleStreetMap", layer: GOOGLE_STREET_MAP },
        { name: "satelliteMap", layer: SATELLITE_MAP },
        { name: "googleHibridMap", layer: GOOGLE_HYBRID_MAP },
        { name: "openTopoMap", layer: OPEN_TOPO_MAP },
        { name: "esriWorldStreetMap", layer: ESRI_WORLD_STREET_MAP },
        { name: "esriSatelite", layer: ESRI_SATELLITE },
        { name: "googleEarth", layer: GOOGLE_EARTH },
    ];

    // Loop for added eventlistener to every input in HTML
    basemapOptions.forEach(function (option) {
        document
            .querySelector('input[value="' + option.name + '"]')
            .addEventListener("change", function () {
                changeBasemap(option.layer);
            });
    });

    // Selected all image basemap in HTML
    const basemapImages = document.querySelectorAll(".sidebar-basemap img");

    // Menambahkan event listener pada setiap gambar basemap
    basemapImages.forEach(function (image) {
        image.addEventListener('click', function () {
            const radio = this.closest("label").querySelector(
                'input[type="radio"]'
            );
            radio.checked = true;

            const selectedBasemap = radio.value;

            // Remove basemap was not selected
            basemapOptions.forEach(function (option) {
                if (option.name !== selectedBasemap) {
                    map.removeLayer(option.layer);
                }
            });

            switch (selectedBasemap) {
                case 'openStreetMap':
                    OPEN_STREET_MAP.addTo(map);
                    break;
                case 'googleStreetMap':
                    GOOGLE_STREET_MAP.addTo(map);
                    break;
                case 'satelliteMap':
                    SATELLITE_MAP.addTo(map);
                    break;
                case 'googleHibridMap':
                    GOOGLE_HYBRID_MAP.addTo(map);
                    break;
                case 'openTopoMap':
                    OPEN_TOPO_MAP.addTo(map);
                    break;
                case 'esriWorldStreetMap':
                    ESRI_WORLD_STREET_MAP.addTo(map);
                    break;
                case 'esriSatelite':
                    ESRI_SATELLITE.addTo(map);
                    break;
                case 'googleEarth':
                    GOOGLE_EARTH.addTo(map);
                    break;
                default:
                    break;
            }

        });
    });
}