import { useStore } from '@/Store/Index.store';
import L from 'leaflet';

// NOTE: ID ELEMENT HTML HARUS SAMA DENGAN DATA DI STORE
const dataElementCheckboxAnalisis = [
    {
        id: "Precipitation",
        store: "precipitationData",
        urlImage: "/assets/icons/icon-legend/legend_precipitation.jpeg"
    },
    {
        id: "VCI",
        store: "VCIData",
        urlImage: "/assets/icons/icon-legend/legend_vci.jpeg"
    },
    {
        id: "EVI",
        store: "EVIData",
        urlImage: "/assets/icons/icon-legend/legend_evi.jpeg"
    },
    {
        id: "MSI",
        store: "MSIData",
        urlImage: "/assets/icons/icon-legend/legend_msi.jpeg"
    },
];

const useLayerAnalisis = (map) => {
    const layers = {}; // Objek untuk menyimpan semua layer yang terbuat

    // Loop melalui setiap elemen di dataElementCheckboxAnalisis
    dataElementCheckboxAnalisis.forEach(element => {
        const id = element.id;
        layers[id];

        // Tambahkan event listener untuk setiap checkbox dengan id yang sesuai
        document.getElementById(id).addEventListener("change", function () {
            if (this.checked) {
                const latestData = useStore.getState()[element.store]; // ambil data terakhir hasil analisis di store
                layers[id] = L.tileLayer(latestData.map[id]); // Update layer dengan data terbaru

                layers[id].addTo(map); // Tambahkan layer ke peta jika checkbox dicentang
            } else {
                layers[id].removeFrom(map); // Hapus layer dari peta jika checkbox tidak dicentang
            }
        });
    });

    const imageLegend = document.createElement('img');

    function changeImageLegend(idValue, urlImage) {
        const checkbox = document.getElementById(idValue);

        checkbox.addEventListener('change', function () {
            const containerImg = document.getElementById('c-gee');

            if (this.checked) {
                containerImg.classList.remove('hidden');
                imageLegend.src = urlImage;
            } else {
                containerImg.classList.add('hidden');
            }
        });
    }


    // Control button legend
    const customControlLegendAnalisisGEE = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function () {
            const container = L.DomUtil.create('div', 'container-control-legend hidden');
            container.setAttribute('id', 'c-gee');
            const button = L.DomUtil.create('button', 'button-control-legend-gee', container);
            imageLegend.className = 'custom-image-gee';
            button.appendChild(imageLegend);

            dataElementCheckboxAnalisis.forEach(legend => {
                changeImageLegend(legend.id, legend.urlImage);
            });

            return container;
        },
    });

    // Add the custom button to the map
    map.addControl(new customControlLegendAnalisisGEE());

};

export default useLayerAnalisis;
