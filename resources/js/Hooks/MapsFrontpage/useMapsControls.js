import React from 'react'
import L from 'leaflet';

export const useMapsControls = (map) => {
    // Custom zoom control
    let customZoomControl = L.control.zoom({
        position: 'bottomright'  // Set the position to bottom right
    });

    // Add the custom zoom control to the map
    // map.addControl(customZoomControl);

    // Navigasi bar control in left
    L.control.navbar().addTo(map);

    // Hash in URL
    const hash = new L.Hash(map);

    // Control skala in botomleft
    L.control.scale().addTo(map);
}


