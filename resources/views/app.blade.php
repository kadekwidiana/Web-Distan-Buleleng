<!DOCTYPE html>
<html lang="{{ str_replace("_", "-", app()->getLocale()) }}">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="/assets/images/logo-buleleng.png" type="image/gif">
    <title inertia>SIG Distan Kab. Buleleng</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    {{-- fontawesome --}}
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
    {{-- leaflet css --}}
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />
    <!-- leaflet draw CSS-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />

    <!-- NAVIGASI BAR -->
    <link rel="stylesheet" href="{{ asset("/assets/css-leaflet/Leaflet.NavBar.css") }}">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(["resources/js/app.jsx", "resources/js/Pages/{$page["component"]}.jsx"])
    @inertiaHead
  </head>

  <body class="font-sans antialiased bg-slate-100">
    @inertia
  </body>
  <!-- Leaflet CDN JS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

  <!-- HASH IN URL -->
  <script src="{{ asset("/assets/js-leaflet/leaflet-hash.js") }}"></script>
  <!-- NAVIGASI BAR -->
  <script src="{{ asset("/assets/js-leaflet/Leaflet.NavBar.js") }}"></script>

  <!-- Plugin leaflet draw JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
  <!-- turf and axios -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Turf.js/6.5.0/turf.min.js"></script>

</html>
