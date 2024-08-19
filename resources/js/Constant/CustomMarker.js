export const defaultIcon = L.icon({
    iconUrl: '/assets/icons/icon-marker/leaflet/marker-icon.png',
    iconSize: [25, 41], // ukuran ikon
    iconAnchor: [12, 41], // anchor point pada ikon
    popupAnchor: [1, -34], // anchor point pada popup
    shadowUrl: '/assets/icons/icon-marker/leaflet/marker-shadow.png', // URL gambar bayangan
    shadowSize: [41, 41], // ukuran bayangan
    shadowAnchor: [12, 41] // anchor point pada bayangan
});

export const locationIcon = L.icon({
    iconUrl: '/assets/icons/icon-marker/location-pin.png',
    iconSize: [40, 47], // ukuran ikon
    iconAnchor: [16, 32], // anchor point pada ikon
    popupAnchor: [3, -20]
});
