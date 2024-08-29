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

// Adjust the position control sidebar left
export function adjustPositionControlSidebarLeft(sidebarClass) {
    const sidebarWidth = document.querySelector(sidebarClass + '.active') ? sidebarWidthLeft : 0; // Adjust the width based on sidebar visibility

    // Set position control leaflet
    const controlContainersLeaflet = document.querySelectorAll('.leaflet-control-scale, .leaflet-control-geocoder, .leaflet-control-navbar, .leaflet-draw ');
    controlContainersLeaflet.forEach(function (controlContainerLeaflet) {
        controlContainerLeaflet.style.left = sidebarWidth + 'px';
    });

    // Set position control analisis
    const controlContainers = document.querySelectorAll('.container-control-analisis');
    controlContainers.forEach(function (controlContainer) {
        controlContainer.style.left = sidebarWidth + 'px';
    });
}

// Adjust the position control sidebar right
export function adjustPositionControlSidebarRight(sidebarClass) {
    const sidebarWidth = document.querySelector(sidebarClass + '.active') ? sidebarWidthRight : 0; // Adjust the width based on sidebar visibility

    // Set position control leaflet
    const controlContainersLeaflet = document.querySelectorAll('.leaflet-control-zoom, .leaflet-control-attribution');
    controlContainersLeaflet.forEach(function (controlContainerLeaflet) {
        controlContainerLeaflet.style.right = sidebarWidth + 'px';
    });

    // Set position control basemap, layer, legend, street view, legend GEE
    const controlContainers = document.querySelectorAll('.container-control-basemap, .container-control-layer, .container-control-legend,.container-control-street-view, .control-legend-gee');
    controlContainers.forEach(function (controlContainer) {
        controlContainer.style.right = sidebarWidth + 'px';
    });
}