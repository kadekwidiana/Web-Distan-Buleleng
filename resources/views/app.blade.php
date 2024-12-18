<!DOCTYPE html>
<html lang="{{ str_replace("_", "-", app()->getLocale()) }}">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="/assets/images/logo-buleleng.png" type="image/gif">
    <title inertia>Sipetani</title>

    {{-- fontawesome --}}
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />

    <!-- Conditionally load Swiper's CSS and JS -->
    @if (request()->is("maps"))
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    @endif

    <style>
      .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background-color: rgba(255, 255, 255, 0.9); */
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }

      .preloader {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .preloader-logo {
        width: 150px;
        margin-bottom: 5px;
      }

      .preloader-text {
        font-weight: bold;
        font-family: monospace;
        color: #3C3D37;
        font-size: 25px;
        clip-path: inset(0 3ch 0 0);
        animation: l4 1s steps(4) infinite;
      }

      .preloader-text:before {
        content: "Loading...";
      }

      @keyframes l4 {
        to {
          clip-path: inset(0 -1ch 0 0);
        }
      }
    </style>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    {{-- @vite(["resources/js/app.jsx", "resources/js/Pages/{$page["component"]}.jsx"]) --}}
    @vite(["resources/js/app.jsx"])
    @inertiaHead
  </head>

  <body class="font-sans antialiased bg-slate-100">
    <div id="loading-root" class="loading">
      <div class="preloader">
        <img src="/assets/images/logo-distan-buleleng-2.svg" alt="Logo Distan Buleleng" class="preloader-logo" />
        <span class="preloader-text"></span>
      </div>
    </div>
    @inertia
  </body>
  <script>
    const preloader = document.querySelector('#loading-root');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  </script>

</html>
