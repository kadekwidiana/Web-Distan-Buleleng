import FooterFrontpage from '@/Components/Footer/FooterFrontpage';
import FrontpageLayout from '@/Layouts/FrontpageLayout';
import { Head } from '@inertiajs/react';
import { Carousel } from 'flowbite-react';

export default function LandingPage() {
    return (
        <>
            <Head>
                <title>Beranda</title>
                <meta
                    name="description"
                    content="Sistem Informasi Potensi Pertanian Dinas Pertanian Kabupaten Buleleng adalah platform yang menyediakan data geografis terintegrasi untuk mendukung pengelolaan dan pengembangan sektor pertanian. Pengguna dapat mengakses peta interaktif, informasi lahan, batas wilayah, dan data terkait pertanian di Kabupaten Buleleng. Sebagai pengembangan dari aplikasi Siprotani, sistem ini menawarkan fitur yang lebih lengkap dan mudah diakses."
                />
                <meta
                    name="keywords"
                    content="Sistem Informasi Pertanian, Potensi Pertanian, Pertanian Buleleng, Data Geografis, Petani, Lahan Pertanian, Penyuluh, Sistem Informasi"
                />
                <meta name="author" content="Dinas Pertanian Kabupaten Buleleng" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Sipetani - Beranda" />
                <meta
                    property="og:description"
                    content="Platform yang menyediakan data geografis terintegrasi untuk mendukung pengelolaan dan pengembangan sektor pertanian, memudahkan akses peta interaktif dan data relevan di Kabupaten Buleleng."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sipetani.bulelengkab.go.id/" />
                <meta property="og:image" content="https://sipetani.bulelengkab.go.id/assets/images/logo-buleleng.png" />
                <meta property="og:locale" content="id_ID" />
                <link rel="canonical" href="https://sipetani.bulelengkab.go.id/" />
            </Head>

            <FrontpageLayout>
                <section className="mt-16 lg:mt-20">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-12">
                        <h1 className="mb-4 text-4xl font-bold leading-none text-gray-800 md:text-4xl lg:text-5xl">Selamat Datang Di Sistem Informasi Potensi Pertanian Dinas Pertanian Kabupaten Buleleng</h1>
                        <p className="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 lg:px-36">
                            Sistem Informasi Potensi Pertanian Dinas Pertanian Kabupaten Buleleng adalah platform yang menyediakan data geografis terintegrasi untuk mendukung pengelolaan serta pengembangan sektor pertanian. Sistem ini memudahkan pengguna mengakses peta interaktif, informasi lahan, batas wilayah, dan data lainnya yang relevan dengan pertanian di Kabupaten Buleleng. Sistem ini merupakan pengembangan dari aplikasi Siprotani, platform ini menawarkan fitur yang lebih lengkap dan mudah diakses.
                        </p>

                        <div className="flex flex-col gap-2 space-y-4 px-6 sm:flex-row sm:justify-center sm:space-y-0">
                            <a href="/maps" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-3xl bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-blue-300">
                                Lihat Peta Geografis
                                <i className="ml-2 fa-solid fa-map-location-dot"></i>
                            </a>
                            <a href="/login" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-3xl bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
                                Login Pengguna
                                <i className="ml-2 fa-solid fa-right-to-bracket"></i>
                            </a>
                        </div>
                        <div className="mt-12 flex flex-col gap-2">
                            <h3 className='font-semibold text-gray-800 text-3xl'>Layanan</h3>
                            <p className="mb-2 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 lg:px-36">
                                Layanan/Fitur yang terdapat dalam sistem
                            </p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="">
                                    <div className="h-80">
                                        <Carousel>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <img
                                                    key={index}
                                                    src={`./assets/images/homepage/gambar-${index + 1}.png`}
                                                    alt={`Gambar ${index + 1}`}
                                                    className='border-2 rounded-md'
                                                />
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 items-start">
                                    {/* <h2 className="mb-2 text-lg font-semibold text-gray-900">List fitur:</h2> */}
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Menyajikan informasi geografis pertanian.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Analisis informasi geografis.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Pengelolaan data kelembagaan pertanian.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Pengelolaan data lahan pertanian.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Pengelolaan data petani.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Pengelolaan data penyuluh.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Pengelolaan data spasial.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Pendataan kegiatan penyuluhan pertanian.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Pengelolaan laporan
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Dll.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mt-14 flex flex-col gap-5">
                            <h3 className='font-semibold text-gray-800 text-3xl'>Link Terkait</h3>
                            <div className="flex flex-row gap-6 space-y-0 justify-center">
                                <div className="max-w-32 flex flex-col items-center gap-2 justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200">
                                    <a href="https://bulelengkab.go.id/" className='p-2 rounded-full border-2 shadow-lg shadow-gray-500 border-gray-500 bg-blue-500'>
                                        <img src="./assets/images/logo-buleleng.png" className="w-24 h-24"
                                            alt="Logo" />
                                    </a>
                                    <span className='text-gray-700 text-base'>Kabupaten Buleleng</span>
                                </div>
                                <div className="max-w-44 flex flex-col items-center gap-2 justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200">
                                    <a href="https://distan.bulelengkab.go.id/" className='p-2 rounded-full border-2 shadow-lg shadow-gray-500 border-gray-500 bg-green-500'>
                                        <img src="./assets/images/logo-distan-buleleng-1.png" className="w-24 h-24"
                                            alt="Logo" />
                                    </a>
                                    <span className='text-gray-700 text-base'>Dinas Pertanian Kabupaten Buleleng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FooterFrontpage />
            </FrontpageLayout>
        </>
    );
}
