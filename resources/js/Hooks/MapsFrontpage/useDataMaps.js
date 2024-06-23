const useDataMaps = (map) => {
    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
        }
    }

    const bataKecamatan = L.layerGroup();
    const kelompokTani = L.layerGroup();

    // Event for checkbox
    function checkboxEventListener(checkboxId, layer) {
        document.getElementById(checkboxId).addEventListener("change", function () {
            if (this.checked) {
                layer.addTo(map); // Dislay layer to map
                // console.log("tes");
            } else {
                layer.removeFrom(map); // Remove layer
            }
        });
    }

    checkboxEventListener("batas-kecamatan", bataKecamatan);
    checkboxEventListener("kelompok-tani", kelompokTani);

    // batas kecamatan
    const getDataBatasKec = async () => {
        try {
            const response = await fetch('/data-spasial/batas-kec-buleleng.geojson', {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            L.geoJSON(data.features, {
                style: function (feature) {
                    return {
                        color: 'black',
                        weight: 2,
                        opacity: 1
                    };
                },
                onEachFeature: onEachFeature
            }).addTo(bataKecamatan);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    getDataBatasKec();


    // kelompok tani
    const getDataKelompokTani = async () => {
        try {
            const response = await fetch('/data-spasial/kelompok-tani.geojson', {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // console.log(data.features[0].properties.name);

            L.geoJSON(data.features, {
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(`
                        <div class="w-32 popup-container">
                            <div class="md:pb-2">
                                <div class="relative">
                                    <div class="flex items-center justify-between md:pt-2 md:pb-2 border-b rounded-t">
                                        <h3 class="text-xl font-medium text-gray-900">
                                            Data Kelompok Tani
                                        </h3>
                                    </div>
                                    <div class="space-y-4 overflow-y-auto">
                                        <div class="relative overflow-x-auto">
                                            <table class="w-full text-sm text-left rtl:text-right text-gray-600 table-fixed">
                                                <tbody>
                                                    <tr class='border-b border-t'>
                                                        <td class='px-0 py-2 w-36'>Nama Kelompok Tani</td>
                                                        <td class='px-0 py-2'>: </td>
                                                        <td class='px-0 py-2'>${feature.properties.name}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                }
            }).addTo(kelompokTani);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };
    getDataKelompokTani();
}

export default useDataMaps;