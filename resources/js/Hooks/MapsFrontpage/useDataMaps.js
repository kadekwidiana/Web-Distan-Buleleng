import { Toast } from "@/Components/Alert/Toast";
import { AxiosInstance } from "@/Services/AxiosConfig";
import { adjustPositionControlSidebarLeft } from "@/Utils/adjustPositionControlSidebarMaps";
import { closeBasemapSidebar, closeLayerSidebar, closeLegendSidebar } from "@/Utils/closeSidebarMaps";
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import { generateCommoditiesCycleHtml } from "@/Utils/generateCommoditiesCycleHtml";
import L from 'leaflet';
import shp from 'shpjs';
import Swal from "sweetalert2";

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
        bpps,
        landAgricultures,
        districts,
        villages
    } = dataLayers;

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
    };

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
        // console.log(dataGapoktan.created_at);

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
                                    ${photos.length > 0 ? `
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
                                    ` : `
                                       <p style="margin-top: 5px; color: gray; text-align: center;">Gambar tidak tersedia</p>
                                    `}
                                    <strong>Ketua:</strong> ${dataGapoktan.leader}</br>
                                    <strong>Sekretaris:</strong> ${dataGapoktan.secretary}</br>
                                    <strong>Bendahara:</strong> ${dataGapoktan.treasurer}</br>
                                    <strong>Jumlah anggota:</strong> ${dataGapoktan.number_of_members}</br>
                                    <strong>Tahun berdiri:</strong> ${dataGapoktan.since}</br>
                                    <strong>Alamat:</strong> ${dataGapoktan.address}</br>
                                    <strong>Usaha pertanian:</strong> ${dataGapoktan.farming_business}</br>
                                    <strong>Proses bisnis:</strong> ${dataGapoktan.business_process}</br>
                                    <strong>Deskripsi:</strong> ${dataGapoktan.description}</br>
                                    <strong>Lihat lokasi:</strong><a href='http://maps.google.com/maps?q=&layer=c&cbll=${dataGapoktan.location}&cbp=11,0,0,0' target='_blank' class='text-blue-500 font-semibold underline'>Street view</a></br>
                                    <strong>Data dibuat:</strong> ${formatDateToIndonesian(dataGapoktan.created_at)}</br>
                                    <strong>Data diupdate:</strong> ${formatDateToIndonesian(dataGapoktan.updated_at)}</br>
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
                                ${photos.length > 0 ? `
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
                                ` : `
                                    <p style="margin-top: 5px; color: gray; text-align: center;">Gambar tidak tersedia</p>
                                `}
                                <strong>Ketua:</strong> ${dataPoktan.leader}</br>
                                <strong>Sekretaris:</strong> ${dataPoktan.secretary}</br>
                                <strong>Bendahara:</strong> ${dataPoktan.treasurer}</br>
                                <strong>Jumlah anggota:</strong> ${dataPoktan.number_of_members}</br>
                                <strong>Tahun berdiri:</strong> ${dataPoktan.since}</br>
                                <strong>Alamat:</strong> ${dataPoktan.address}</br>
                                <strong>Deskripsi:</strong> ${dataPoktan.description}</br>
                                <strong>Lihat lokasi:</strong> <a href='http://maps.google.com/maps?q=&layer=c&cbll=${dataPoktan.location}&cbp=11,0,0,0' target='_blank' class='text-blue-500 font-semibold underline'>Street view</a></br>
                                <strong>Data dibuat:</strong> ${formatDateToIndonesian(dataPoktan.created_at)}</br>
                                <strong>Data diupdate:</strong> ${formatDateToIndonesian(dataPoktan.updated_at)}</br>
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
                                ${photos.length > 0 ? `
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
                                ` : `
                                    <p style="margin-top: 5px; color: gray; text-align: center;">Gambar tidak tersedia</p>
                                `}
                                <strong>Ketua:</strong> ${dataSubak.leader}</br>
                                <strong>Sekretaris:</strong> ${dataSubak.secretary}</br>
                                <strong>Bendahara:</strong> ${dataSubak.treasurer}</br>
                                <strong>Jumlah anggota:</strong> ${dataSubak.number_of_members}</br>
                                <strong>Tahun berdiri:</strong> ${dataSubak.since}</br>
                                <strong>Alamat:</strong> ${dataSubak.address}</br>
                                <strong>Deskripsi:</strong> ${dataSubak.description}</br>
                                <strong>Lihat lokasi:</strong> <a href='http://maps.google.com/maps?q=&layer=c&cbll=${dataSubak.location}&cbp=11,0,0,0' target='_blank' class='text-blue-500 font-semibold underline'>Street view</a></br>
                                <strong>Data dibuat:</strong> ${formatDateToIndonesian(dataSubak.created_at)}</br>
                                <strong>Data diupdate:</strong> ${formatDateToIndonesian(dataSubak.updated_at)}</br>
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

    const setDataBpps = (dataBpp, layer) => {
        const iconUrl = dataBpp.icon; // URL ikon diambil dari dataBpp.icon
        const marker = L.marker(dataBpp.location, { icon: customIcon(iconUrl) });

        const swiperId = `swiper-${Math.random().toString(36).substring(7)}`;

        let photos = [];
        try {
            photos = JSON.parse(dataBpp.photo);
        } catch (e) {
            console.error("Invalid JSON string for photos", e);
        }

        const popupContent = `
                            <div>
                                <strong>${dataBpp.name}</strong>
                                ${photos.length > 0 ? `
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
                                ` : `
                                    <p style="margin-top: 5px; color: gray; text-align: center;">Gambar tidak tersedia</p>
                                `}
                                <strong>Ketua:</strong> ${dataBpp.leader}</br>
                                <strong>Sekretaris:</strong> ${dataBpp.secretary}</br>
                                <strong>Bendahara:</strong> ${dataBpp.treasurer}</br>
                                <strong>Jumlah anggota:</strong> ${dataBpp.number_of_members}</br>
                                <strong>Telepon:</strong> ${dataBpp.phone_number}</br>
                                <strong>Email:</strong> ${dataBpp.email}</br>
                                <strong>Tahun berdiri:</strong> ${dataBpp.since}</br>
                                <strong>Alamat:</strong> ${dataBpp.address}</br>
                                <strong>Deskripsi:</strong> ${dataBpp.description ?? '-'}</br>
                                <strong>Lihat lokasi:</strong> <a href='http://maps.google.com/maps?q=&layer=c&cbll=${dataBpp.location}&cbp=11,0,0,0' target='_blank' class='text-blue-500 font-semibold underline'>Street view</a></br>
                                <strong>Data dibuat:</strong> ${formatDateToIndonesian(dataBpp.created_at)}</br>
                                <strong>Data diupdate:</strong> ${formatDateToIndonesian(dataBpp.updated_at)}</br>
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

    const setDataLandAgricultures = (dataLahan, layer) => {
        const iconUrl = dataLahan.icon; // URL ikon diambil dari dataLahan.icon
        const marker = L.marker(dataLahan.location, { icon: customIcon(iconUrl) });
        let polygon = L.geoJSON(dataLahan.area_json).addTo(layer);
        // console.log(dataLahan.commodities_cycle);

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
                                ${photos.length > 0 ? `
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
                                ` : `
                                    <p style="margin-top: 5px; color: gray; text-align: center;">Gambar tidak tersedia</p>
                                `}
                                <strong>Pemilik:</strong> ${dataLahan?.owner?.name}</br >
                                <strong>Penggarap:</strong> ${dataLahan?.cultivator?.name}</br >
                                <strong>Alamat:</strong> ${dataLahan.address}</br >
                                <strong>Luas lahan:</strong> ${dataLahan.land_area} are (m²)</br >
                                <strong>Jenis lahan:</strong> ${dataLahan.type_land_agriculture.name}</br >
                                <strong>Komoditas lahan:</strong> ${dataLahan.commodities.map(commodity => commodity.name).join(', ')}<br />
                                <strong>Perkiraan Panen:</strong> ${generateCommoditiesCycleHtml(JSON.parse(dataLahan.commodities_cycle))}<br />
                                <strong>Tergabung di Poktan:</strong> ${dataLahan?.poktan?.name ?? '-'}</br >
                                <strong>Tergabung di Subak:</strong> ${dataLahan?.subak?.name ?? '-'}</br >
                                <strong>Deskripsi:</strong> ${dataLahan.description}</br >
                                <strong>Lihat lokasi:</strong> <a href='http://maps.google.com/maps?q=&layer=c&cbll=${dataLahan.location}&cbp=11,0,0,0' target='_blank' class='text-blue-500 font-semibold underline'>Street view</a></br >
                                <strong>Data dibuat:</strong> ${formatDateToIndonesian(dataLahan.created_at)}</br >
                                <strong>Data diupdate:</strong> ${formatDateToIndonesian(dataLahan.updated_at)}</br >
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
        const iconUrl = `/storage/${dataCommodity.icon}`; // URL ikon diambil dari dataCommodity.icon
        dataCommodity.land_agricultures.forEach(landAgriculture => {
            const marker = L.marker(landAgriculture.location, { icon: customIcon(iconUrl) });

            // Generate unique ID for the swiper container
            const swiperId = `swiper-${Math.random().toString(36).substring(7)}`;

            let photos = [];
            try {
                photos = JSON.parse(landAgriculture.photo);
            } catch (e) {
                console.error("Invalid JSON string for photos", e);
            }

            let commoditiesCycle = [];
            try {
                // Parse and filter the commodities_cycle for the current commodity
                commoditiesCycle = JSON.parse(landAgriculture.commodities_cycle).filter(cycle => cycle.name === dataCommodity.name);
            } catch (e) {
                console.error("Invalid JSON string for commodities_cycle", e);
            }

            const popupContent = `
                <div>
                    <strong>Komoditas ${dataCommodity.name}</strong>
                    ${photos.length > 0 ? `
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
                    ` : `
                        <p style="margin-top: 5px; color: gray; text-align: center;">Gambar tidak tersedia</p>
                    `}
                    <strong>Luas lahan:</strong> ${landAgriculture.land_area} are (m2)</br>
                    <strong>Perkiraan Panen:</strong> ${generateCommoditiesCycleHtml(commoditiesCycle)}<br />
                    <strong>Alamat:</strong> ${landAgriculture.address} </br>
                    <strong>Lihat lokasi:</strong> <a href='http://maps.google.com/maps?q=&layer=c&cbll=${landAgriculture.location}&cbp=11,0,0,0' target='_blank' class='text-blue-500 font-semibold underline'>Street view</a></br >
                    <strong>Data dibuat:</strong> ${formatDateToIndonesian(landAgriculture.created_at)}</br >
                    <strong>Data diupdate:</strong> ${formatDateToIndonesian(landAgriculture.updated_at)}</br >
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

    const setDataAreaJsonToMaps = (dataRegion, layer, typeRegion) => {
        // console.log('data region', dataRegion.name);
        L.geoJSON(dataRegion.area_json, {
            style: (feature) => {
                return {
                    color: '#000000',
                    weight: 2,
                    opacity: 1
                };
            },
            onEachFeature: (feature, layer) => {
                const originalStyle = {
                    color: 'black',
                    weight: 2,
                    opacity: 1
                };

                const eventStyle = {
                    color: 'blue', // Highlight color on hover
                    weight: 3,
                    opacity: 1
                };

                // add event listeners
                layer.on({
                    click: () => {
                        // console.log('test data', dataRegion);
                        const popupContent = `
                                                <div>
                                                    <strong>${typeRegion === 'district' ? 'KECAMATAN ' : 'DESA '} ${dataRegion.name}</strong>
                                                    <p style="margin-top: 5px; color: gray; text-align: center;">Gambar tidak tersedia</p>
                                                    <strong>Luas Wilayah:</strong> ${dataRegion?.wide ?? '-'}</br>
                                                    <strong>Jumlah Gapoktan:</strong> ${dataRegion?.agriculture_recap?.gapoktan_count ?? '-'}</br>
                                                    <strong>Jumlah Poktan:</strong> ${dataRegion?.agriculture_recap?.poktan_count ?? '-'}</br>
                                                    <strong>Jumlah Subak:</strong> ${dataRegion?.agriculture_recap?.subak_count ?? '-'}</br>
                                                    <strong>Jumlah BPP:</strong> ${dataRegion?.agriculture_recap?.bpp_count ?? '-'}</br>
                                                    <strong>Jumlah Lahan Pertanian:</strong> ${dataRegion?.agriculture_recap?.land_agriculture_count ?? '-'}</br>
                                                    <strong>Luas Lahan Pertanian:</strong> ${dataRegion?.agriculture_recap?.land_area ?? '-'}</br>
                                                    <strong>Jumlah PPL:</strong> ${dataRegion?.agriculture_recap?.ppl_count ?? '-'}</br>
                                                    <strong>Data diupdate:</strong> ${formatDateToIndonesian(dataRegion?.agriculture_recap?.updated_at) ?? '-'}</br>
                                                    <strong>Analisis Kewilayahan:</strong> <button id='analisis-${dataRegion.id}' class='text-blue-500 font-semibold underline'>Lakukan Analisis</button></br>
                                                    <strong>Detail:</strong> <a href='/' class='text-blue-500 font-semibold underline'>Lihat detail</a></br>
                                                </div>
                                            `;
                        // Menampilkan popup saat layer diklik
                        layer.bindPopup(popupContent).openPopup();

                        // Event delegation: attach event listener to the document
                        document.addEventListener('click', (event) => {
                            // Check if the clicked element is the 'Analisis' button
                            if (event.target && event.target.id === `analisis-${dataRegion.id}`) {
                                // console.log('test');
                                Swal.fire({
                                    title: "Lakukan Analisis Geospasial pada wilayah ini?",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Ya",
                                    cancelButtonText: 'Tidak'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        const coordinates = layer.toGeoJSON().geometry.coordinates;
                                        // const cleanedCoordinates = coordinates[0][0].map(coordinate => coordinate.slice(0, 2)); // lakukan ini karna data geojson nya memiliki 3 data dalam array, jadi yg di ambil hanya index 0, 1
                                        document.getElementById('geometry').value = JSON.stringify(coordinates);

                                        document.getElementById('type').value = 'polygon';

                                        const sidebarElement = document.getElementById("sidebar-analisis");

                                        if (!sidebarElement.classList.contains("active")) {
                                            closeBasemapSidebar();
                                            closeLayerSidebar();
                                            closeLegendSidebar();

                                            sidebarElement.classList.add("active");
                                            adjustPositionControlSidebarLeft('.sidebar-analisis.active');
                                        }

                                        Toast.fire({
                                            icon: "success",
                                            title: "Data berhasil dimasukan ke dalam form input analisis.",
                                            position: 'top-start'
                                        });
                                    }
                                });
                            }
                        });
                    }
                });


                // Change back style on popup close
                layer.on('popupclose', function (e) {
                    layer.setStyle(originalStyle);
                });

                // Change style on hover
                layer.on('mouseover', function (e) {
                    layer.setStyle(eventStyle);
                    // if (feature.properties) {
                    //     // Bind popup dengan konten dari feature properties
                    //     layer.bindPopup(`
                    //         <div>
                    //             <span>${feature.properties.METADATA === 'TASWIL1000020230928_DATA_BATAS_DESAKELURAHAN' ? 'Wilayah Administrasi Desa/Kelurahan' : feature.properties.REMARK} ${feature.properties.NAMOBJ}</span>
                    //         </div>
                    //     `).openPopup(); // Buka popup secara otomatis saat hover
                    // }
                });

                // Revert style on hover out
                layer.on('mouseout', function (e) {
                    layer.setStyle(originalStyle);
                    // layer.closePopup(); // Menutup popup saat mouse keluar dari layer
                });
            }
        }).addTo(layer);
    };

    const layerDataAgricultureMappings = [
        { key: 'layer_gapoktan', data: gapoktans },
        { key: 'layer_poktan', data: poktans },
        { key: 'layer_subak', data: subaks },
        { key: 'layer_bpp', data: bpps },
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
                case bpps:
                    setDataBpps(item, layerGroups[key]);
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
    });

    const createPopupContent = (properties) => {
        let popupContent = "<div><h4>Feature Information</h4><ul>";
        for (const key in properties) {
            if (properties.hasOwnProperty(key)) {
                popupContent += `<li><strong>${key}:</strong> ${properties[key] ?? '-'}</li>`;
            }
        }
        popupContent += "</ul></div>";
        return popupContent;
    };

    const onEachFeatureTwo = (feature, layer) => {
        if (feature.properties) {
            const popupContent = createPopupContent(feature.properties);
            layer.bindPopup(popupContent);
        }
    };

    const fetchDataGeoJson = async (dataSpatial, layer) => {
        try {
            const response = await axios.get(`/storage/${dataSpatial.file}`);
            const geojsonData = response.data;

            L.geoJSON(geojsonData, {
                style: (feature) => {
                    return {
                        color: dataSpatial.color,
                        weight: 2,
                        opacity: 1
                    };
                },
                onEachFeature: onEachFeatureTwo
            }).addTo(layer);

        } catch (error) {
            console.error(`Error fetching GeoJSON: ${error.message}`);
        }
    };

    const fetchShapefileFromZip = async (dataSpatial, layer) => {
        try {
            const response = await axios({
                method: "GET",
                url: `/storage/${dataSpatial.file}`,
                responseType: 'arraybuffer'
            });

            // Konversi shapefile ke GeoJSON
            const geojsonConvert = await shp(response.data);

            L.geoJSON(geojsonConvert, {
                style: (feature) => {
                    return {
                        color: dataSpatial.color,
                        weight: 2,
                        opacity: 1
                    };
                },
                onEachFeature: onEachFeatureTwo
            }).addTo(layer);

        } catch (error) {
            console.error(`Error fetching Shapefile: ${error.message}`);
        }
    };

    const fetchDataGeoJsonStatic = async (path, areaRegion) => {
        try {
            const response = await axios.get(path);
            const geojsonData = response.data;

            geojsonData.features.forEach(geoJsonDistrict => {
                layerGroups[geoJsonDistrict.properties.NAMOBJ] = L.layerGroup();
                checkboxEventListenerLayer(`layer_region_${areaRegion}_${geoJsonDistrict.properties.NAMOBJ}`, layerGroups[geoJsonDistrict.properties.NAMOBJ]);
                setDataAreaJsonToMaps(geoJsonDistrict, layerGroups[geoJsonDistrict.properties.NAMOBJ]);
            });

        } catch (error) {
            console.error(`Error fetching GeoJSON: ${error.message}`);
        }
    };

    const loopDataAreaJsonDynamic = async (dataRegions, typeRegion) => {
        try {
            dataRegions.forEach(dataRegion => {
                layerGroups[dataRegion.name] = L.layerGroup();
                checkboxEventListenerLayer(`layer_region_${typeRegion}_${dataRegion.name}`, layerGroups[dataRegion.name]);
                setDataAreaJsonToMaps(dataRegion, layerGroups[dataRegion.name], typeRegion);
            });

        } catch (error) {
            console.error(`Error fetching GeoJSON: ${error.message}`);
        }
    };

    dataSpatials.forEach(dataSpatial => {
        layerGroups[dataSpatial.name] = L.layerGroup();
        checkboxEventListenerLayer(dataSpatial.name, layerGroups[dataSpatial.name]);
        if (dataSpatial.file.endsWith('.geojson')) {
            fetchDataGeoJson(dataSpatial, layerGroups[dataSpatial.name]);
        } else if (dataSpatial.file.endsWith('.zip')) {
            fetchShapefileFromZip(dataSpatial, layerGroups[dataSpatial.name]);
        }
    });

    // data geojson kewilayahan statis
    fetchDataGeoJsonStatic('/assets/data-spasial/minisize/batas-kabupaten-buleleng.geojson', 'regency');
    // fetchDataGeoJsonStatic('/assets/data-spasial/minisize/batas-kecamatan-buleleng.geojson', 'district');
    // fetchDataGeoJsonStatic('/assets/data-spasial/minisize/batas-desa-buleleng.geojson', 'village');

    // data area json dinamis
    loopDataAreaJsonDynamic(districts, 'district');
    loopDataAreaJsonDynamic(villages, 'village');
};

export default useDataMaps;