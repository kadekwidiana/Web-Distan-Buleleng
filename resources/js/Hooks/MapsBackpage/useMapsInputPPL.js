import { useEffect } from "react"
import Swal from 'sweetalert2'

const useScriptMapsInputPPL = () => {
    useEffect(() => {
        // Maps Leaflet
        // List Basemap
        const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '©OpenStreetMap Contributors',
        });

        const googleStreetMap = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
            attribution: '©Google Street',
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        });

        const satelliteMap = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            attribution: '©Google Satellite Map',
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        });

        const googleHibridMap = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
            attribution: '©Google Hybrid Map',
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        });

        const googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '©Google Terrain'
        });

        const googleTraffic = L.tileLayer('http://{s}.google.com/vt/lyrs=m,traffic&hl=en&x={x}&y={y}&z={z}&s=Ga', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '©Google Traffic'
        });


        // INIT MAP
        // Initialize the map with the default basemap
        const coorBali = [-8.198517680287658, 115.10051848149178];

        const map = L.map('pplMaps', {
            layers: [googleStreetMap],
            center: coorBali,
            zoom: 10,
            // minZoom: ,
            zoomControl: false
        });

        // custom marker Baresoil
        let locationIcon = L.icon({
            iconUrl: '/assets/icons/icon-marker/location-pin.png',
            iconSize: [40, 47], // ukuran ikon
            iconAnchor: [16, 32], // anchor point pada ikon
            popupAnchor: [3, -20]
        });

        // Fungsi untuk menambahkan marker ke peta
        function addMarkerToMap(lat, lng) {
            // Membuat marker dengan koordinat yang diberikan
            const marker = L.marker([lat, lng], { icon: locationIcon }).addTo(map)
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
                        document.getElementById('latitude').value = userLat;
                        document.getElementById('longitude').value = userLng;

                        // Menambahkan marker ke peta
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

        // Panggil fungsi setMapToUserLocation untuk mendapatkan lokasi pengguna dan mengatur pusat peta
        setMapToUserLocation();

        const baseMaps = {
            "OpenStreetMap": openStreetMap,
            "Google Street": googleStreetMap,
            "Google Satelite": satelliteMap,
            "Google Hibrid": googleHibridMap,
            "Google Terrain": googleTerrain,
            "Google Traffic": googleTraffic,
        };

        const layerControl = L.control.layers(baseMaps).addTo(map);

        // Custom zoom control
        const customZoomControl = L.control.zoom({
            position: 'bottomright'
        });
        // Add the custom zoom control to the map
        map.addControl(customZoomControl);

        // get altitude
        function getAltitude(lat, lng) {
            fetch(`https://api.opentopodata.org/v1/srtm90m?locations=${lat},${lng}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const altitude = data.display_name;
                    document.getElementById('altitude').value = altitude;
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });

            // $.ajax({
            //     url: '/get-altitude',
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'X-CSRF-TOKEN': '{{ csrf_token() }}',
            //     },
            //     data: JSON.stringify({
            //         latitude: lat,
            //         longitude: lng,
            //     }),
            //     dataType: 'json',
            //     success: function(data) {
            //         $('#altitude').val(data.altitude)
            //         // console.log('Altitude:', data.altitude);
            //     },
            //     error: function(error) {
            //         console.error('Error:', error);
            //     }
            // });
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
                    document.getElementById('address').value = address;
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                });

            // USE THIS IF PROBLEM CROSS ORIGIN
            // $.ajax({
            //     url: '/get-address',
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'X-CSRF-TOKEN': '{{ csrf_token() }}',
            //     },
            //     data: JSON.stringify({
            //         latitude: lat,
            //         longitude: lng,
            //     }),
            //     dataType: 'json',
            //     success: function(data) {
            //         $('#address').val(data.address);
            //         console.log(data);
            //         // console.log('Altitude:', data.altitude);
            //     },
            //     error: function(error) {
            //         console.error('Error:', error);
            //     }
            // });
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

        // Create data geojson when draw element
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
            // Add new elements draw
            drawnItems.addLayer(layer);

            // Condition type marker
            if (type === 'marker') {
                // Take coordinate from draw element
                const coordinates = layer.getLatLng();
                const lat = coordinates.lat;
                const lng = coordinates.lng;

                // call the func getAltitude & getAddress
                // getAltitude(lat, lng);
                getAddress(lat, lng);

                document.getElementById('latitude').value = lat;
                document.getElementById('longitude').value = lng;
            }
            // Condition type polygon
            if (type == 'polygon') {
                // Mengambil koordinat dari elemen gambar dalam format JSON
                const aoi = layer.toGeoJSON().geometry;

                // Menetapkan nilai JSON string ke elemen input dengan id="aoi"
                document.getElementById('aoi').value = JSON.stringify(aoi);

                // Menghitung dan menampilkan luas area
                const area = turf.area(layer.toGeoJSON());

                // Menetapkan nilai luas area yang dibulatkan ke 2 desimal ke elemen input dengan id="wide"
                document.getElementById('wide').value = area.toFixed(2);
            }
        });

        // Edit data geojson
        map.on('draw:edited', function (e) {
            const editedLayers = e.layers;
            editedLayers.eachLayer(function (layer) {
                const type = layer instanceof L.Marker ? 'marker' :
                    'polygon'; // Determine the edited shape type

                if (type === 'marker') {
                    // Extract coordinates from the layer options
                    const coordinates = layer.getLatLng();
                    const lat = coordinates.lat;
                    const lng = coordinates.lng;

                    // call the func getAltitude & getAddress
                    // getAltitude(lat, lng);
                    getAddress(lat, lng);

                    document.getElementById('latitude').value = lat;
                    document.getElementById('longitude').value = lng;
                }

                // Condition type polygon
                if (type == 'polygon') {
                    // Mengambil koordinat dari elemen draw dalam format JSON
                    const aoi = layer.toGeoJSON().geometry;

                    // Menetapkan nilai JSON string ke elemen input dengan id="aoi"
                    document.getElementById('aoi').value = JSON.stringify(aoi);

                    // Menghitung dan menampilkan luas area
                    const area = turf.area(layer.toGeoJSON());

                    // Menetapkan nilai luas area yang dibulatkan ke 2 desimal ke elemen input dengan id="wide"
                    document.getElementById('wide').value = area.toFixed(2);
                }
            });
        });

        // Delete data geojson
        map.on('draw:deleted', function (e) {
            const deletedLayers = e.layers;
            deletedLayers.eachLayer(function (layer) {
                document.getElementById('latitude').value = '';
                document.getElementById('longitude').value = '';
                document.getElementById('address').value = '';
                document.getElementById('aoi').value = '';
                document.getElementById('wide').value = '';
            });
        });
    }, [])
}

export default useScriptMapsInputPPL;