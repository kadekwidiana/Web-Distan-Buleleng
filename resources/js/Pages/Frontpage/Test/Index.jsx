import NavbarFrontpage from '@/Components/Navbar/NavbarFrontpage'
import FrontpageLayout from '@/Layouts/FrontpageLayout'
import { Head, Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function LandingPage() {
    const { datas } = usePage().props;
    console.log(datas);
    
    return (
        <>
            <Head title="Beranda" />
            <FrontpageLayout>
                <section className="mt-20 lg:mt-32">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-12">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl">Hello dunia</h1>

                    </div>
                </section>
            </FrontpageLayout>
        </>
    )
}
