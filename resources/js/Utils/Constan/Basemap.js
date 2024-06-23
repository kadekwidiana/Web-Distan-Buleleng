// BASEMAP
const ATRIBUTE_NAME = '© SIG Distan Kab. Buleleng';

export const OPEN_STREET_MAP = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ATRIBUTE_NAME,
});

export const GOOGLE_STREET_MAP = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    attribution: ATRIBUTE_NAME,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
});

export const SATELLITE_MAP = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    attribution: ATRIBUTE_NAME,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
});

export const GOOGLE_HYBRID_MAP = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
    attribution: ATRIBUTE_NAME,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
});

export const OPEN_TOPO_MAP = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
});

export const ESRI_SATELLITE = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.esri.com">Esri</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
});

export const ESRI_WORLD_STREET_MAP = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.esri.com">Esri</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
});

export const GOOGLE_EARTH = L.tileLayer('https://storage.googleapis.com/global-surface-water/tiles2021/transitions/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.thunderforest.com/maps/landscape/">Thunderforest</a>',
});
