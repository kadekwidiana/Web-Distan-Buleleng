import NavbarFrontpage from '@/Components/Navbar/NavbarFrontpage'
import FrontpageLayout from '@/Layouts/FrontpageLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function LandingPage() {
    return (
        <>
            <Head title="Beranda" />
            <FrontpageLayout>
                <section className="mt-20 lg:mt-32">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-12">
                        <h1 className="mb-4 text-4xl font-bold leading-none text-gray-800 md:text-4xl lg:text-5xl">Selamat Datang Di Sistem Informasi Geografis Dinas Pertanian Kabupaten Buleleng</h1>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum commodi totam ipsa inventore aperiam adipisci odit, aliquam quae excepturi earum quod! Expedita nemo iste consectetur quam numquam explicabo odit quasi ad asperiores! Accusamus, debitis non?</p>
                        <div className="flex flex-col gap-2 space-y-4 px-6 sm:flex-row sm:justify-center sm:space-y-0">
                            <Link href="/maps" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-3xl bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-blue-300">
                                Lihat Peta Geografis
                                <i className="ml-2 fa-solid fa-map-location-dot"></i>
                            </Link>
                            <Link href="/login" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-3xl bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
                                Login User
                                <i className="ml-2 fa-solid fa-right-to-bracket"></i>
                            </Link>
                        </div>
                        <div className="mt-10 flex flex-row gap-6 space-y-0 justify-center">
                            <img src="./assets/images/logo-buleleng.png" className="w-24"
                                alt="Logo" />
                            <img src="./assets/images/logo-buleleng.png" className="w-24"
                                alt="Logo" />
                        </div>
                        <div className="w-full mt-14 flex justify-center">
                            <a href='#'>
                                <p className='text-blue-500'>Copyright © 2024</p>
                            </a>
                        </div>
                    </div>
                </section>
            </FrontpageLayout>
        </>
    )
}
