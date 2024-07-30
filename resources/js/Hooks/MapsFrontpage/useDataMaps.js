import { AxiosInstance } from "@/Services/AxiosConfig";
import L from 'leaflet';

const useDataMaps = (map, dataLayers) => {
    const {
        // layerGroups,
        typeAgricultures,
        commodities,
        typeLandAgricultures,
        dataSpatials,
        gapoktans,
        poktans,
        subaks,
        landAgricultures,
    } = dataLayers;

    // console.log(commodities);

    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
        }
    }

    // Object to hold the dynamic layer groups
    const layerGroups = {};

    // Event for checkbox layer
    const checkboxEventListenerLayer = (checkboxId, layer) => {
        document.getElementById(checkboxId).addEventListener("change", function () {
            if (this.checked) {
                layer.addTo(map); // Dislay layer to map
            } else {
                layer.removeFrom(map); // Remove layer
            }
        });
    }

    // fetch data geojson
    const fetchDataGeoJson = async (dataGeoJson, layer) => {
        try {
            const response = await AxiosInstance({
                method: "GET",
                url: dataGeoJson,
            });

            L.geoJSON(response.data.features, {
                style: function (feature) {
                    return {
                        color: 'black',
                        weight: 2,
                        opacity: 1
                    };
                },
                onEachFeature: function (feature, layer) {
                    // if (feature.properties) {
                    //     layer.bindTooltip(feature.properties.NAMOBJ, {
                    //         permanent: true, // Make the label always visible
                    //         direction: 'center', // Center the label over the feature
                    //         className: 'my-label' // Add a custom class to style the label
                    //     });
                    // }

                    // Other feature-specific interactions can go here, such as popups or event handlers
                    // Bind a popup to the feature
                    if (feature.properties) {
                        layer.bindPopup(`
                            <div>
                                <span>${response.data.name === 'batas-kabupaten-buleleng' ? `Kabupaten ${feature.properties.NAMOBJ}` : response.data.name === 'batas-kecamatan-buleleng' ? `Kecamatan ${feature.properties.NAMOBJ}` : response.data.name === 'batas-desa-buleleng' ? `Desa ${feature.properties.NAMOBJ}` : ''}</span > <br>
                                ${feature.properties.LUASWH !== 0.0 ? `<span>Luas: ${feature.properties.LUASWH} m2</span>` : ''}
                            </div>
                    `);
                    }

                    const originalStyle = {
                        color: 'black',
                        weight: 2,
                        opacity: 1
                    };

                    const eventStyle = {
                        color: 'blue', // Highlight color on hover
                        weight: 3,
                        opacity: 0.8
                    }

                    // Change style on click and open popup
                    layer.on('click', function (e) {
                        // Reset style for all layers
                        geojsonLayer.eachLayer(function (l) {
                            geojsonLayer.resetStyle(l);
                        });

                        // Change style of the clicked feature
                        layer.setStyle(eventStyle);

                        // Open the popup
                        layer.openPopup();
                    });

                    // Change back style on popup close
                    layer.on('popupclose', function (e) {
                        layer.setStyle(originalStyle);
                    });

                    // Change style on hover
                    layer.on('mouseover', function (e) {
                        layer.setStyle(eventStyle);
                    });

                    // Revert style on hover out
                    layer.on('mouseout', function (e) {
                        layer.setStyle(originalStyle);
                    });
                }

            }).addTo(layer);

            const geojsonLayer = L.geoJSON(response.data.features);


        } catch (error) {
            throw new Error(`Error: ${error.message} `);
        }
    }

    const customIcon = (iconUrl) => {
        return L.icon({
            iconUrl: iconUrl,
            iconSize: [40, 40], // Ukuran ikon (lebar, tinggi)
            iconAnchor: [20, 40], // Titik penambatan ikon (lebar / 2, tinggi)
            popupAnchor: [0, -40] // Titik penambatan popup (lebar / 2, tinggi)
        });
    };

    const setDataGapoktans = (dataGapoktan, layer) => {
        const iconUrl = dataGapoktan.icon; // URL ikon diambil dari dataGapoktan.icon
        const marker = L.marker(dataGapoktan.location, { icon: customIcon(iconUrl) });

        const swiperId = `swiper-${Math.random().toString(36).substring(7)}`;

        let photos = [];
        try {
            photos = JSON.parse(dataGapoktan.photo);
        } catch (e) {
            console.error("Invalid JSON string for photos", e);
        }

        const popupContent = `
                        <div>
                            <strong>${dataGapoktan.name}</strong>
                            <div class="swiper-container overflow-auto" id="${swiperId}" style="width: 300px; height: 200px; position: relative; margin-top: 5px;">
                                <div class="swiper-wrapper">
                                    ${photos.map(photo => `
                                        <div class="swiper-slide" style="display: flex; justify-content: center; align-items: center;">
                                            <img src="${photo}" style="max-width: 100%; max-height: 100%;" class="swiper-lazy">
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="swiper-pagination" style="position: absolute; bottom: 5px; width: 100%; text-align: center;"></div>
                                <div class="swiper-button-next" style="position: absolute; top: 50%;"></div>
                                <div class="swiper-button-prev" style="position: absolute; top: 50%;"></div>
                            </div>
                            <strong>Ketua:</strong> ${dataGapoktan.leader}</br >
                            <strong>Jumlah anggota:</strong> ${dataGapoktan.number_of_members}</br >
                            <strong>Tahun berdiri:</strong> ${dataGapoktan.since}</br >
                            <strong>Alamat:</strong> ${dataGapoktan.address}</br >
                            <strong>Usaha pertanian:</strong> ${dataGapoktan.farming_business}</br >
                            <strong>Proses bisnis:</strong> ${dataGapoktan.business_process}</br >
                            <strong>Deskripsi:</strong> ${dataGapoktan.description}</br >
                        </div >
                    `;

        marker.bindPopup(popupContent);
        marker.addTo(layer);

        // Initialize Swiper after the popup opens
        marker.on('popupopen', () => {
            new Swiper(`#${swiperId}`, {
                slidesPerView: 1, // Display one slide at a time
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoHeight: true, // Ensure Swiper adjusts height based on the content
            });
        });
    };

    const setDataPoktans = (dataPoktan, layer) => {
        const iconUrl = dataPoktan.icon; // URL ikon diambil dari dataPoktan.icon
        const marker = L.marker(dataPoktan.location, { icon: customIcon(iconUrl) });

        const swiperId = `swiper-${Math.random().toString(36).substring(7)}`;

        let photos = [];
        try {
            photos = JSON.parse(dataPoktan.photo);
        } catch (e) {
            console.error("Invalid JSON string for photos", e);
        }

        const popupContent = `
                            <div>
                                <strong>${dataPoktan.name}</strong>
                                <div class="swiper-container overflow-auto" id="${swiperId}" style="width: 300px; height: 200px; position: relative; margin-top: 5px;">
                                    <div class="swiper-wrapper">
                                        ${photos.map(photo => `
                                            <div class="swiper-slide" style="display: flex; justify-content: center; align-items: center;">
                                                <img src="${photo}" style="max-width: 100%; max-height: 100%;" class="swiper-lazy">
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="swiper-pagination" style="position: absolute; bottom: 5px; width: 100%; text-align: center;"></div>
                                    <div class="swiper-button-next" style="position: absolute; top: 50%;"></div>
                                    <div class="swiper-button-prev" style="position: absolute; top: 50%;"></div>
                                </div>
                                <strong>Ketua:</strong> ${dataPoktan.leader}</br >
                                <strong>Jumlah anggota:</strong> ${dataPoktan.number_of_members}</br >
                                <strong>Tahun berdiri:</strong> ${dataPoktan.since}</br >
                                <strong>Alamat:</strong> ${dataPoktan.address}</br >
                                <strong>Deskripsi:</strong> ${dataPoktan.description}</br >
                            </div>
                        `;

        marker.bindPopup(popupContent);
        marker.addTo(layer);

        // Initialize Swiper after the popup opens
        marker.on('popupopen', () => {
            new Swiper(`#${swiperId}`, {
                slidesPerView: 1, // Display one slide at a time
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoHeight: true, // Ensure Swiper adjusts height based on the content
            });
        });
    };

    const setDataSubaks = (dataSubak, layer) => {
        const iconUrl = dataSubak.icon; // URL ikon diambil dari dataSubak.icon
        const marker = L.marker(dataSubak.location, { icon: customIcon(iconUrl) });

        const swiperId = `swiper-${Math.random().toString(36).substring(7)}`;

        let photos = [];
        try {
            photos = JSON.parse(dataSubak.photo);
        } catch (e) {
            console.error("Invalid JSON string for photos", e);
        }

        const popupContent = `
                            <div>
                                <strong>${dataSubak.name}</strong>
                                <div class="swiper-container overflow-auto" id="${swiperId}" style="width: 300px; height: 200px; position: relative; margin-top: 5px;">
                                    <div class="swiper-wrapper">
                                        ${photos.map(photo => `
                                            <div class="swiper-slide" style="display: flex; justify-content: center; align-items: center;">
                                                <img src="${photo}" style="max-width: 100%; max-height: 100%;" class="swiper-lazy">
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="swiper-pagination" style="position: absolute; bottom: 5px; width: 100%; text-align: center;"></div>
                                    <div class="swiper-button-next" style="position: absolute; top: 50%;"></div>
                                    <div class="swiper-button-prev" style="position: absolute; top: 50%;"></div>
                                </div>
                                <strong>Ketua:</strong> ${dataSubak.leader}</br >
                                <strong>Jumlah anggota:</strong> ${dataSubak.number_of_members}</br >
                                <strong>Tahun berdiri:</strong> ${dataSubak.since}</br >
                                <strong>Alamat:</strong> ${dataSubak.address}</br >
                                <strong>Deskripsi:</strong> ${dataSubak.description}</br >
                            </div >
                        `;

        marker.bindPopup(popupContent);
        marker.addTo(layer);

        // Initialize Swiper after the popup opens
        marker.on('popupopen', () => {
            new Swiper(`#${swiperId}`, {
                slidesPerView: 1, // Display one slide at a time
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoHeight: true, // Ensure Swiper adjusts height based on the content
            });
        });
    };

    const setDataLandAgricultures = (dataLahan, layer) => {
        const iconUrl = dataLahan.icon; // URL ikon diambil dari dataLahan.icon
        const marker = L.marker(dataLahan.location, { icon: customIcon(iconUrl) });
        let polygon = L.geoJSON(dataLahan.area_json).addTo(layer);

        const swiperId = `swiper-${Math.random().toString(36).substring(7)}`;

        let photos = [];
        try {
            photos = JSON.parse(dataLahan.photo);
        } catch (e) {
            console.error("Invalid JSON string for photos", e);
        }

        const popupContent = `
                            <div>
                                <strong>Lahan Pertanian</strong>
                                <div class="swiper-container overflow-auto" id="${swiperId}" style="width: 300px; height: 200px; position: relative; margin-top: 5px;">
                                    <div class="swiper-wrapper">
                                        ${photos.map(photo => `
                                            <div class="swiper-slide" style="display: flex; justify-content: center; align-items: center;">
                                                <img src="${photo}" style="max-width: 100%; max-height: 100%;" class="swiper-lazy">
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="swiper-pagination" style="position: absolute; bottom: 5px; width: 100%; text-align: center;"></div>
                                    <div class="swiper-button-next" style="position: absolute; top: 50%;"></div>
                                    <div class="swiper-button-prev" style="position: absolute; top: 50%;"></div>
                                </div>
                                <strong>Pemilik:</strong> ${dataLahan?.owner?.name}</br >
                                <strong>Alamat:</strong> ${dataLahan.address}</br >
                                <strong>Luas lahan:</strong> ${dataLahan.land_area} m2</br >
                                <strong>Jenis lahan:</strong> ${dataLahan.type_land_agriculture.name}</br >
                                <strong>Komoditas lahan:</strong> ${dataLahan.commodities.map((commodity => commodity.name + ', '))}</br >
                                <strong>Poktan:</strong> ${dataLahan?.poktan?.name ?? '-'}</br >
                                <strong>Subak:</strong> ${dataLahan?.subak?.name ?? '-'}</br >
                                <strong>Deskripsi:</strong> ${dataLahan.description}</br >
                            </div>
                        `;

        marker.bindPopup(popupContent);
        marker.addTo(layer);

        // Initialize Swiper after the popup opens
        marker.on('popupopen', () => {
            new Swiper(`#${swiperId}`, {
                slidesPerView: 1, // Display one slide at a time
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoHeight: true, // Ensure Swiper adjusts height based on the content
            });
        });
    };

    const setDataCommodities = (dataCommodity, layer) => {
        const iconUrl = dataCommodity.icon; // URL ikon diambil dari dataCommodity.icon
        dataCommodity.land_agricultures.forEach(landAgriculture => {
            const marker = L.marker(landAgriculture.location, { icon: customIcon(iconUrl) });

            // console.log(landAgriculture.area_json);  
            // Generate unique ID for the swiper container
            const swiperId = `swiper-${Math.random().toString(36).substring(7)}`;

            let photos = [];
            try {
                photos = JSON.parse(landAgriculture.photo);
            } catch (e) {
                console.error("Invalid JSON string for photos", e);
            }

            const popupContent = `
                                <div>
                                    <strong>Komoditas ${dataCommodity.name}</strong>
                                    <div class="swiper-container overflow-auto" id="${swiperId}" style="width: 300px; height: 200px; position: relative; margin-top: 5px;">
                                        <div class="swiper-wrapper">
                                            ${photos.map(photo => `
                                                <div class="swiper-slide" style="display: flex; justify-content: center; align-items: center;">
                                                    <img src="${photo}" style="max-width: 100%; max-height: 100%;" class="swiper-lazy">
                                                </div>
                                            `).join('')}
                                        </div>
                                        <div class="swiper-pagination" style="position: absolute; bottom: 5px; width: 100%; text-align: center;"></div>
                                        <div class="swiper-button-next" style="position: absolute; top: 50%;"></div>
                                        <div class="swiper-button-prev" style="position: absolute; top: 50%;"></div>
                                    </div>
                                    <strong>Luas lahan:</strong> ${landAgriculture.land_area} m2</br>
                                    <strong>Alamat:</strong> ${landAgriculture.address} </br>
                                </div>
                            `;

            marker.bindPopup(popupContent);
            marker.addTo(layer);

            // Initialize Swiper after the popup opens
            marker.on('popupopen', () => {
                new Swiper(`#${swiperId}`, {
                    slidesPerView: 1, // Display one slide at a time
                    spaceBetween: 10,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    autoHeight: true, // Ensure Swiper adjusts height based on the content
                });
            });
        });
    };

    const layerDataAgricultureMappings = [
        { key: 'layer_gapoktan', data: gapoktans },
        { key: 'layer_poktan', data: poktans },
        { key: 'layer_subak', data: subaks },
        { key: 'layer_lahan_pertanian', data: landAgricultures }
    ];

    layerDataAgricultureMappings.forEach(mapping => {
        const { key, data } = mapping;
        layerGroups[key] = L.layerGroup();
        checkboxEventListenerLayer(key, layerGroups[key]);
        data.forEach(item => {
            switch (data) {
                case gapoktans:
                    setDataGapoktans(item, layerGroups[key]);
                    break;
                case poktans:
                    setDataPoktans(item, layerGroups[key]);
                    break;
                case subaks:
                    setDataSubaks(item, layerGroups[key]);
                    break;
                case landAgricultures:
                    setDataLandAgricultures(item, layerGroups[key]);
                    break;
                default:
                    break;
            }
        });
    });

    commodities.forEach(commodity => {
        layerGroups[commodity.name] = L.layerGroup();
        checkboxEventListenerLayer(commodity.name, layerGroups[commodity.name]);
        // data.forEach(item => {
        setDataCommodities(commodity, layerGroups[commodity.name]);
        // });
    })


    // Loop data lalu buat layerGroup, checkboxEventListenerLayer, dan fetchDataGeoJson
    dataSpatials.forEach(dataSpatial => {
        // Create a new layer group
        layerGroups[dataSpatial.name] = L.layerGroup();
        checkboxEventListenerLayer(dataSpatial.name, layerGroups[dataSpatial.name]);
        fetchDataGeoJson(dataSpatial.file_spatial, layerGroups[dataSpatial.name]);
    });
}

export default useDataMaps;