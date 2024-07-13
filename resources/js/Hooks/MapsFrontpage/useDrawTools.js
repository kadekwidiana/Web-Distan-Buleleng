import React from 'react'
import L from 'leaflet';

export const useDrawTools = (map) => {
    // MAP DRAW
    const drawnItems = new L.FeatureGroup(); // For saving the elements in draw
    map.addLayer(drawnItems); // Add feature group to map

    const drawControl = new L.Control.Draw({
        position: 'topleft',
        draw: {
            polygon: {
                shapeOptions: {
                    color: 'green', // Color border polygon
                    fillColor: 'rgba(0, 0, 0, 0.5)' // Fill color blue transparent
                },
                allowIntersection: false,
                drawError: {
                    color: 'orange',
                    timeout: 1000 // = 1 second
                },
                showArea: true, // Show polygon area when draw
                metric: false,
                repeatMode: true
            },
            // Disable features
            polyline: false,
            circlemarker: false,
            rect: false,
            circle: false,
            rectangle: false
        },
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl); // Add to map

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

            document.getElementById('geometry').value = `[${lng}, ${lat}]`;
            document.getElementById('type').value = 'point';
        }

        // Condition type polygon
        if (type == 'polygon') {
            // Take coordinate from draw element in JSON format
            const coordinates = layer.toGeoJSON().geometry.coordinates;
            document.getElementById('geometry').value = JSON.stringify(coordinates);
            document.getElementById('type').value = 'polygon';
        }
    });

    // Edit data geojson
    map.on('draw:edited', function (e) {
        const editedLayers = e.layers;
        editedLayers.eachLayer(function (layer) {
            const type = layer instanceof L.Marker ? 'marker' : 'polygon'; // Determine the edited shape type

            if (type === 'marker') {
                // Extract coordinates from the layer options
                const coordinates = layer.getLatLng();
                const lat = coordinates.lat;
                const lng = coordinates.lng;

                document.getElementById('geometry').value = `[${lng}, ${lat}]`;
                document.getElementById('type').value = 'point';
            }

            // Condition type polygon
            if (type == 'polygon') {
                // Take coordinate from draw element in JSON format
                const coordinates = layer.toGeoJSON().geometry.coordinates;
                document.getElementById('geometry').value = JSON.stringify(coordinates);
                document.getElementById('type').value = 'polygon';
            }
        });
    });

    // Delete data geojson
    map.on('draw:deleted', function (e) {
        const deletedLayers = e.layers;
        deletedLayers.eachLayer(function (layer) {
            document.getElementById('geometry').value = '';
            document.getElementById('type').value = '';
        });
    });
}
