import { adjustPositionControlSidebarRight, adjustPositionControlSidebarLeft } from '@/Utils/adjustPositionControlSidebarMaps';
import { closeBasemapSidebar, closeLayerSidebar, closeLegendSidebar, closeAnalisisSidebar } from '@/Utils/closeSidebarMaps';
import L from 'leaflet';

const useScriptSidebarMaps = (map) => {
    // get width sreen
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Determines the sidebar width based on the screen width
    let sidebarWidthLeft = 450;
    let sidebarWidthRight = 250;

    if (screenWidth <= 480) {
        // if width screen HP
        sidebarWidthLeft = 250;
        sidebarWidthRight = 200;
    }

    // START JS SIDEBAR RIGHT
    // Control button basemaps
    const customControlBasemap = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function () {
            const container = L.DomUtil.create('div', 'container-control-basemap');
            const button = L.DomUtil.create('button', 'button-control-basemap', container);
            const image = document.createElement('img');
            image.src = '/assets/icons/icon-control/icon-basemap.png';
            image.className = 'custom-image';
            button.appendChild(image);

            container.addEventListener("click", function () {
                closeLayerSidebar(); // Close layer sidebar if open
                closeLegendSidebar(); // Close layer sidebar if open
                if (screenWidth <= 480) {
                    closeAnalisisSidebar();
                }
                document.getElementById("sidebar-basemap").classList.toggle("active");
                adjustPositionControlSidebarRight('.sidebar-basemap'); // Call the function to adjust control positions
                const basemapButton = document.querySelector('.container-control-basemap button');
                basemapButton.classList.toggle("active"); // Toggle active class on the button
            });

            return container;
        }
    });
    // Add the custom button to the map
    map.addControl(new customControlBasemap());

    // Control button layer
    const customControlLayer = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function () {
            const container = L.DomUtil.create('div', 'btn btn-light btn-outline-secondary container-control-layer');
            const button = L.DomUtil.create('button', 'button-control-layer', container);
            const image = document.createElement('img');
            image.src = '/assets/icons/icon-control/icon-layer.png';
            image.className = 'custom-image';
            button.appendChild(image);


            container.addEventListener("click", function () {
                closeBasemapSidebar(); // Close basemap sidebar if open
                closeLegendSidebar(); // Close basemap sidebar if open
                if (screenWidth <= 480) {
                    closeAnalisisSidebar();
                }
                document.getElementById("sidebar-layer").classList.toggle("active");
                adjustPositionControlSidebarRight('.sidebar-layer'); // Call the function to adjust control positions
                const layerButton = document.querySelector('.container-control-layer button');
                layerButton.classList.toggle("active"); // Toggle active class on the button
            });

            return container;
        }
    });
    // Add the custom button to the map
    map.addControl(new customControlLayer());

    // Control button legend
    const customControlLegend = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function () {
            const container = L.DomUtil.create('div', 'btn btn-light btn-outline-secondary container-control-legend');
            const button = L.DomUtil.create('button', 'button-control-legend', container);
            const icon = L.DomUtil.create('i', 'fa-solid fa-circle-info fa-2xl');
            icon.style.color = '#F1C40F';
            button.appendChild(icon);

            container.addEventListener("click", function () {
                closeBasemapSidebar(); // Close basemap sidebar if open
                closeLayerSidebar(); // Close basemap sidebar if open
                if (screenWidth <= 480) {
                    closeAnalisisSidebar();
                }
                document.getElementById("sidebar-legend").classList.toggle("active");
                adjustPositionControlSidebarRight('.sidebar-legend'); // Call the function to adjust control positions
                const layerButton = document.querySelector('.container-control-legend button');
                layerButton.classList.toggle("active"); // Toggle active class on the button
            });

            return container;
        }
    });
    // Add the custom button to the map
    // map.addControl(new customControlLegend());

    // END SIDEBAR RIGTH

    // START SIDEBAR LEFT
    // Control button analisis
    const customControlAnalisis = L.Control.extend({
        options: {
            position: 'topleft'
        },

        onAdd: function () {
            const container = L.DomUtil.create('div', 'btn btn-light btn-outline-secondary container-control-analisis');
            const button = L.DomUtil.create('button', 'button-control-analisis', container);
            const icon = L.DomUtil.create('i', 'fa-solid fa-magnifying-glass-chart fa-xl');
            icon.style.color = '#F1C40F';
            button.appendChild(icon);

            container.addEventListener("click", function () {
                if (screenWidth <= 480) {
                    closeBasemapSidebar();
                    closeLayerSidebar();
                    closeLegendSidebar();
                }
                document.getElementById("sidebar-analisis").classList.toggle("active");
                adjustPositionControlSidebarLeft('.sidebar-analisis.active'); // Call the function to adjust control positions
                const layerButton = document.querySelector('.container-control-analisis button');
                layerButton.classList.toggle("active"); // Toggle active class on the button
            });

            return container;
        }
    });
    // Add the custom button to the map
    map.addControl(new customControlAnalisis());
}

export default useScriptSidebarMaps;