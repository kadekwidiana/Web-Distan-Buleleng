import NavbarFrontpage from '@/Components/Navbar/NavbarFrontpage';
import FrontpageLayout from '@/Layouts/FrontpageLayout';
import { Head, Link } from '@inertiajs/react';
import { Carousel } from 'flowbite-react';
import React from 'react';

export default function LandingPage() {
    return (
        <>
            <Head title="Beranda" />
            <FrontpageLayout>
                <section className="mt-16 lg:mt-20">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-12">
                        <h1 className="mb-4 text-4xl font-bold leading-none text-gray-800 md:text-4xl lg:text-5xl">Selamat Datang Di Sistem Informasi Geografis Dinas Pertanian Kabupaten Buleleng</h1>
                        <p className="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 lg:px-36">
                            Sistem Informasi Geografis Dinas Pertanian Kabupaten Buleleng menyediakan data dan informasi geografis yang lengkap dan akurat untuk mendukung pengelolaan dan pengembangan sektor pertanian. Platform ini memudahkan pengguna dalam mengakses peta interaktif, informasi lahan pertanian, batas wilayah, serta berbagai data penting lainnya yang terkait dengan pertanian di Kabupaten Buleleng.
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
                                            Menampilkan informasi geografis terkait pertanian.
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
                                            Pengelolaan data Kelompok Tani.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Pengelolaan data Gabungan Kelompok Tani.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Pengelolaan data Subak.
                                        </li>
                                    </ul>
                                    <ul className="space-y-1 text-lg text-gray-600 list-inside">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            Pengelolaan data Lahan Pertanian.
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
                <footer className="bg-gray-800 py-2">
                    <div className="mx-auto w-full max-w-screen-xl p-4 py-4 lg:py-6">
                        <div className=" md:flex md:justify-between">
                            <div className="mb-6 md:mb-0 sm:w-2/6">
                                <Link href="https://flowbite.com/" className="flex items-center">
                                    <img src="./assets/images/logo-distan-buleleng-1.png" width={100} height={100} alt="Picture of the author" className='w-24' priority={true} />
                                </Link>
                            </div>
                            <div className="sm:w-1/2 flex justify-between">
                                <div>
                                    <h2 className="mb-4 text-sm text-gray-400">Menu</h2>
                                    <ul className="text-white text-sm flex flex-col gap-2">
                                        <li className='hover:text-gray-300'>
                                            <a href="/">Beranda</a>
                                        </li>
                                        <li className='hover:text-gray-300'>
                                            <a href="/maps">Peta Geografis</a>
                                        </li>
                                        <li className='hover:text-gray-300'>
                                            <a href="/information">Informasi Pertanian</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-4 text-sm text-gray-400">Kontak Kami</h2>
                                    <ul className="text-white text-sm flex flex-col gap-2">
                                        <li className="flex justify-start gap-2 items-center">
                                            <i className="fa-solid fa-location-dot"></i>
                                            <p>Jl. Ahmad Yani No 99, Singaraja - Bali</p>
                                        </li>
                                        <li className='flex justify-start gap-2 items-center'>
                                            <i className="fa-solid fa-phone"></i>
                                            <p>(0362) 25090</p>
                                        </li>
                                        <li className='flex justify-start gap-2 items-center'>
                                            <i className="fa-solid fa-envelope"></i>
                                            <p>distan@bulelengkab.go.id</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4 border-gray-500 border" />
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <span className="text-sm sm:text-center text-gray-400">©2024 Dinas Pertanian Kabupaten Buleleng. ©Support by WEF GIS </span>
                            <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-4">
                                <a href="https://facebook.com/p/Dinas-Pertanian-Kabupaten-Buleleng-100086306629196" className="text-white">
                                    <i className="fa-brands fa-square-facebook fa-2xl" style={{ color: '#1877F2' }}></i>
                                </a>
                                <a href="https://www.instagram.com/distanbuleleng/" className="text-white">
                                    <i className="fa-brands fa-square-instagram fa-2xl" style={{ color: '#FD1D1D' }}></i>
                                </a>
                                <a href="https://www.youtube.com/@dinaspertanianbuleleng7447" className="text-white">
                                    <i className="fa-brands fa-youtube fa-2xl" style={{ color: '#FF0000' }}></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </FrontpageLayout>
        </>
    );
}
