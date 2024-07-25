import { Head } from '@inertiajs/react';
import React from 'react';

export default function ErrorPage({ status }) {
    const statusResponses = {
        503: '503',
        500: '500',
        404: '404',
        403: '403',
    };

    const titles = {
        503: 'Layanan Tidak Tersedia',
        500: 'Kesalahan Server',
        404: 'Halaman Tidak Ditemukan',
        403: 'Terlarang',
    };

    const descriptions = {
        503: 'Maaf, kami sedang melakukan pemeliharaan. Silakan kembali lagi nanti. Terima kasih atas kesabaran Anda!',
        500: 'Whoops, terjadi kesalahan pada server kami. Silakan coba lagi nanti atau hubungi dukungan kami jika masalah berlanjut.',
        404: 'Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.',
        403: 'Maaf, Anda tidak diizinkan untuk mengakses halaman ini. Jika Anda merasa ini adalah kesalahan, hubungi administrator.',
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat">
            <Head title={titles[status]} />
            <div className="max-w-xl mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                <div className="text-9xl font-bold text-blue-600 mb-4">{statusResponses[status]}</div>
                <h1 className="text-4xl font-bold text-gray-800 mb-6">{titles[status]}</h1>
                <p className="text-lg text-gray-600 mb-8">{descriptions[status]}</p>
                <a href="/"
                    className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300">
                    Kembali Ke Beranda
                </a>
            </div>
        </div>
    );
}
