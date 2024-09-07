<!DOCTYPE html>
<html lang="{{ str_replace("_", "-", app()->getLocale()) }}">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="/assets/images/logo-buleleng.png" type="image/gif">
    <title inertia>SIG Distan Kab. Buleleng</title>

    {{-- fontawesome --}}
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />

    <!-- Conditionally load Swiper's CSS and JS -->
    @if (request()->is("maps"))
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    @endif

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    {{-- @vite(["resources/js/app.jsx", "resources/js/Pages/{$page["component"]}.jsx"]) --}}
    @vite(["resources/js/app.jsx"])
    @inertiaHead
  </head>

  <body class="font-sans antialiased bg-slate-100">
    @inertia
  </body>

</html>
