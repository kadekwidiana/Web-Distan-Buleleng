import { useStore } from "@/Store/Index.store";
import { useEffect } from "react";
import Swal from 'sweetalert2';
import { useShallow } from "zustand/react/shallow";
// leaflet
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// leaflet draw
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/leaflet.draw';
import { ATRIBUTE_NAME, GOOGLE_HYBRID_MAP, GOOGLE_STREET_MAP, OPEN_STREET_MAP, SATELLITE_MAP } from "@/Constant/Basemap";
import { defaultIcon, locationIcon } from "@/Constant/CustomMarker";
import * as turf from '@turf/turf';
import { usePage } from "@inertiajs/react";
import shp from 'shpjs';

const useMapsInputData = (isEdit, data) => {
    const {
        dataSpatials,
    } = usePage().props;

    const { localSetting, setLocationInput, setAreaJsonInput, setWideLandInput, setAddressInput } = useStore(
        useShallow((state) => (
            {
                localSetting: state.localSetting,
                setLocationInput: state.setLocationInput,
                setAreaJsonInput: state.setAreaJsonInput,
                setWideLandInput: state.setWideLandInput,
                setAddressInput: state.setAddressInput
            }
        )),
    );
    useEffect(() => {
        const GOOGLE_HYBRID_MAP = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
            attribution: ATRIBUTE_NAME,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        });

        // INIT MAP
        // Initialize the map with the default basemap
        const coorBali = [-8.198517680287658, 115.10051848149178];

        const map = L.map('maps-input', {
            layers: [GOOGLE_HYBRID_MAP],
            center: data?.location ?? coorBali,
            zoom: 10,
            // minZoom: ,
            zoomControl: false
        });

        // Fungsi untuk menambahkan marker ke peta
        function addMarkerToMap(lat, lng) {
            // Membuat marker dengan koordinat yang diberikan
            L.marker([lat, lng], { icon: locationIcon }).addTo(map)
                .bindPopup('Lokasi anda saat ini.')
                .openPopup();
        }

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            showCloseButton: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        function setMapToUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        Toast.fire({
                            icon: "info",
                            title: "Geolokasi telah diaktifkan! 🌍",
                        });

                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;
                        map.setView([userLat, userLng], 13);
                        getAddress(userLat, userLng);
                        console.log('CALLLLLS');
                        setLocationInput(`[${userLat}, ${userLng}]`);

                        addMarkerToMap(userLat, userLng);
                    }, function (error) {
                        console.error("Error getting user location:", error);
                        Toast.fire({
                            icon: "error",
                            title: "Permintaan geolokasi ditolak pengguna!"
                        });
                    },
                    {
                        timeout: 10000, // timeout set to 10 seconds
                        enableHighAccuracy: true, // requesting high accuracy location
                        maximumAge: 0 // request permission every time
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        }

        if (isEdit) {
            L.marker(data?.location ?? coorBali, { icon: defaultIcon }).addTo(map)
                .bindPopup(`
                <div class='flex flex-col justify-center items-center gap-1'>
                <span>Lokasi ${data?.name ?? ''}</span>
                </div>
                `)
                .openPopup();
            setLocationInput(`[${data?.location[0]}, ${data?.location[1]}]`);
            let polygon = L.geoJSON(data.area_json ?? []).addTo(map);
        } else {
            // Panggil fungsi setMapToUserLocation untuk mendapatkan lokasi pengguna dan mengatur pusat peta
            if (localSetting.isGeolocation) {
                setMapToUserLocation();
            }
        }

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

        // func fetch geojson
        const fetchDataGeoJson = async (data) => {
            try {
                const response = await axios.get(`/storage/${data.file}`);

                const layerData = L.geoJSON(response.data, {
                    style: (feature) => {
                        // Mengatur warna berdasarkan properti `color` pada dataSpatial atau fitur GeoJSON
                        // const color = feature.properties?.color || '#000000'; // Default ke hitam jika tidak ada
                        return {
                            color: data.color,
                            weight: 2,
                            opacity: 1
                        };
                    },
                });

                layerControl.addOverlay(layerData, data.name);

            } catch (error) {
                console.error(`Error fetching GeoJSON: ${error.message}`);
            }
        };

        // func fetch shp
        const fetchShapefileFromZip = async (data) => {
            try {
                const response = await axios({
                    method: "GET",
                    url: `/storage/${data.file}`,
                    responseType: 'arraybuffer'
                });

                const geojsonConvert = await shp(response.data);

                const layerData = L.geoJSON(geojsonConvert, {
                    style: (feature) => {
                        // Ambil warna dari properti atau tetapkan warna default
                        // const color = feature.properties?.color || '#000000'; // Default ke hitam jika tidak ada
                        return {
                            color: data.color,
                            weight: 2,
                            opacity: 1
                        };
                    },
                });

                layerControl.addOverlay(layerData, data.name);
            } catch (error) {
                console.error(`Error fetching Shapefile: ${error.message}`);
            }
        };

        // call the function for display data spatial
        if (localSetting.isDisplayDataSpatials && dataSpatials) {
            dataSpatials.forEach(dataSpatial => {
                if (dataSpatial.file.endsWith('.geojson')) {
                    fetchDataGeoJson(dataSpatial);
                } else if (dataSpatial.file.endsWith('.zip')) {
                    fetchShapefileFromZip(dataSpatial);
                }
            });
        }

        // get address
        function getAddress(lat, lng) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const address = data.display_name;

                    setAddressInput(address);
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                });
        }

        // Layer draw
        const drawnItems = new L.FeatureGroup(); //For save the elemen in draw
        map.addLayer(drawnItems); //Added fitur grup to maps
        const drawControl = new L.Control.Draw({
            position: 'topleft',
            draw: {
                polygon: {
                    shapeOptions: {
                        color: 'green', // Color border polygon
                        fillColor: 'rgba(0, 0, 0, 0.5)' // Fill color blue tranparant
                    },
                    allowIntersection: false,
                    drawError: {
                        color: 'orange',
                        timeout: 1000 //= 1 second
                    },
                    showArea: true, //Show polygon area when draw
                    metric: false,
                    repeatMode: true
                },
                marker: {
                    icon: defaultIcon // Menggunakan defaultIcon yang telah Anda definisikan
                },
                // Fitur non aktif
                polyline: false,
                circlemarker: false, //circlemarker type has been disabled.
                rect: false,
                circle: false,
                rectangle: false
            },
            edit: {
                featureGroup: drawnItems
            }
        });
        map.addControl(drawControl); //Add to map

        map.on('draw:created', function (e) {
            const type = e.layerType,
                layer = e.layer;
            // Remove only elements of the appropriate type
            if (type === 'marker') {
                drawnItems.eachLayer(function (existingLayer) {
                    if (existingLayer instanceof L.Marker) {
                        drawnItems.removeLayer(existingLayer);
                    }
                });
            } else if (type === 'polygon') {
                drawnItems.eachLayer(function (existingLayer) {
                    if (existingLayer instanceof L.Polygon) {
                        drawnItems.removeLayer(existingLayer);
                    }
                });
            }

            drawnItems.addLayer(layer);

            if (type === 'marker') {
                const coordinates = layer.getLatLng();
                const lat = coordinates.lat;
                const lng = coordinates.lng;

                getAddress(lat, lng);

                setLocationInput(`[${lat}, ${lng}]`);
            }
            if (type === 'polygon') {
                const aoi = layer.toGeoJSON().geometry;
                setAreaJsonInput(JSON.stringify(aoi));

                // Menghitung luas menggunakan Turf.js
                const areaInSquareMeters = turf.area(aoi);
                const areaInAre = areaInSquareMeters / 100; // Konversi ke are
                setWideLandInput(areaInAre.toFixed(2));
            }
        });

        map.on('draw:edited', function (e) {
            const editedLayers = e.layers;
            editedLayers.eachLayer(function (layer) {
                const type = layer instanceof L.Marker ? 'marker' :
                    'polygon'; // Determine the edited shape type

                if (type === 'marker') {
                    const coordinates = layer.getLatLng();
                    const lat = coordinates.lat;
                    const lng = coordinates.lng;

                    getAddress(lat, lng);

                    setLocationInput(`[${lat}, ${lng}]`);
                }
                if (type === 'polygon') {
                    const aoi = layer.toGeoJSON().geometry;
                    setAreaJsonInput(JSON.stringify(aoi));

                    const areaInSquareMeters = turf.area(aoi);
                    const areaInAre = areaInSquareMeters / 100; // Konversi ke are
                    setWideLandInput(areaInAre.toFixed(2));
                }
            });
        });

        map.on('draw:deleted', function (e) {
            const deletedLayers = e.layers;
            deletedLayers.eachLayer(function (layer) {
                setLocationInput('');
                setAddressInput('');
                setAreaJsonInput('');
                setWideLandInput('');
            });
        });
    }, []);
};

export default useMapsInputData;