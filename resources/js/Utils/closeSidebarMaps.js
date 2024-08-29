import { adjustPositionControlSidebarLeft, adjustPositionControlSidebarRight } from "./adjustPositionControlSidebarMaps";

// func close basemap sidebar
export function closeBasemapSidebar() {
    const basemapSidebar = document.getElementById("sidebar-basemap");
    if (basemapSidebar.classList.contains("active")) {
        basemapSidebar.classList.remove("active");
        adjustPositionControlSidebarRight('.sidebar-basemap'); // Call the function to adjust control positions
        const basemapButton = document.querySelector('.container-control-basemap button');
        basemapButton.classList.remove("active"); // Remove active class from the button
    }
}

// Function to close layer sidebar and adjust icons
export function closeLayerSidebar() {
    const layerSidebar = document.getElementById("sidebar-layer");
    if (layerSidebar.classList.contains("active")) {
        layerSidebar.classList.remove("active");
        adjustPositionControlSidebarRight('.sidebar-layer'); // Call the function to adjust control positions
        const layerButton = document.querySelector('.container-control-layer button');
        layerButton.classList.remove("active"); // Remove active class from the button
    }
}

// Function to close legend sidebar and adjust icons
export function closeLegendSidebar() {
    const layerSidebar = document.getElementById("sidebar-legend");
    if (layerSidebar.classList.contains("active")) {
        layerSidebar.classList.remove("active");
        adjustPositionControlSidebarRight('.sidebar-legend'); // Call the function to adjust control positions
        const layerButton = document.querySelector('.container-control-legend button');
        layerButton.classList.remove("active"); // Remove active class from the button
    }
}

// Function to close basemap sidebar and adjust icons
export function closeAnalisisSidebar() {
    const basemapSidebar = document.getElementById("sidebar-analisis");
    if (basemapSidebar.classList.contains("active")) {
        basemapSidebar.classList.remove("active");
        adjustPositionControlSidebarLeft('.sidebar-analisis.active'); // Call the function to adjust control positions
        const basemapButton = document.querySelector('.container-control-analisis button');
        basemapButton.classList.remove("active"); // Remove active class from the button
    }
}

