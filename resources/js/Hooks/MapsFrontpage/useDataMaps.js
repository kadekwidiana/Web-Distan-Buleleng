import { AxiosInstance } from "@/Services/AxiosConfig";

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

    console.log(commodities);

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
                onEachFeature: onEachFeature
            }).addTo(layer);

        } catch (error) {
            throw new Error(`Error: ${error.message}`);
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

    const getAndSetDataAgriculture = (dataAgriculture, layer) => {
        const iconUrl = dataAgriculture.icon; // URL ikon diambil dari dataAgriculture.icon
        const marker = L.marker(dataAgriculture.location, { icon: customIcon(iconUrl) });
        marker.bindPopup(`
            <div>
                <strong>Name:</strong> ${dataAgriculture.name}<br>
                <strong>Leader:</strong> ${dataAgriculture.leader}<br>
                <strong>Secretary:</strong> ${dataAgriculture.secretary}<br>
                <strong>Treasurer:</strong> ${dataAgriculture.treasurer}<br>
                <strong>Members:</strong> ${dataAgriculture.number_of_members}<br>
                <strong>Since:</strong> ${dataAgriculture.since}<br>
                <strong>Address:</strong> ${dataAgriculture.address}<br>
            </div>
        `);
        marker.addTo(layer);
    };

    const layerDataAgricultureMappings = [
        { key: 'gapoktan', data: gapoktans },
        { key: 'poktan', data: poktans },
        { key: 'subak', data: subaks },
        { key: 'lahan_pertanian', data: landAgricultures }
    ];

    layerDataAgricultureMappings.forEach(mapping => {
        const { key, data } = mapping;
        layerGroups[key] = L.layerGroup();
        checkboxEventListenerLayer(key, layerGroups[key]);
        data.forEach(item => {
            getAndSetDataAgriculture(item, layerGroups[key]);
        });
    });


    // Loop data lalu buat layerGroup, checkboxEventListenerLayer, dan fetchDataGeoJson
    dataSpatials.forEach(dataSpatial => {
        // Create a new layer group
        layerGroups[dataSpatial.name] = L.layerGroup();
        checkboxEventListenerLayer(dataSpatial.name, layerGroups[dataSpatial.name]);
        fetchDataGeoJson(dataSpatial.file_spatial, layerGroups[dataSpatial.name]);
    });

}

export default useDataMaps;