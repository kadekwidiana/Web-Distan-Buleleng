import BannerWelcomeAdmin from '@/Components/Banner/WelcomeAdmin';
import CardMenuDashboard from '@/Components/Card/MenuDashboard';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, usePage } from '@inertiajs/react'
import { Banner } from 'flowbite-react';
import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';


export default function Dashboard() {
    const { auth } = usePage().props;
    const { gapoktanCount, poktanCount, subakCount, pplCount, landAgricultureCount, outreachActivityCount, outreachActivitiesThisMonthCount, builtAreasPpl, dataSpatialCount } = usePage().props;
    const currentMonth = format(new Date(), 'MMMM yyyy', { locale: id });
    return (
        <BackpageLayout>
            <Head title="Dashboard" />
            <BannerWelcomeAdmin builtAreasPpl={builtAreasPpl} />
            <div className="flex flex-col gap-4">
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {auth.user.role === 'PPL' ?
                        <>
                            <CardMenuDashboard
                                icon={<i className="fa-solid fa-earth-americas fa-lg"></i>}
                                bgIcon={'blue'}
                                label={'Wilayah Binaan'}
                                count={builtAreasPpl.length}
                                url={'#'}
                            />
                            <CardMenuDashboard
                                icon={<i className="fa-solid fa-clipboard fa-lg"></i>}
                                bgIcon={'blue'}
                                label={`Kegiatan Penyuluhan Anda pada Bulan ${currentMonth}`}
                                count={outreachActivitiesThisMonthCount}
                                url={'/penyuluhan'}
                            />
                        </>
                        :
                        <>
                            <CardMenuDashboard
                                icon={<i className="fa-solid fa-users fa-lg"></i>}
                                bgIcon={'blue'}
                                label={'Data Penyuluh'}
                                count={pplCount}
                                url={'/ppl'}
                            />
                            <CardMenuDashboard
                                icon={<i className="fa-solid fa-clipboard fa-lg"></i>}
                                bgIcon={'blue'}
                                label={`Kegiatan Penyuluhan Bulan ${currentMonth}`}
                                count={outreachActivitiesThisMonthCount}
                                url={'/management-report/penyuluhan'}
                            />
                            <CardMenuDashboard
                                icon={<i className="fa-solid fa-building-columns fa-lg"></i>}
                                bgIcon={'blue'}
                                label={'Gapoktan'}
                                count={gapoktanCount}
                                url={'/kelembagaan-pertanian/gapoktan'}
                            />
                            <CardMenuDashboard
                                icon={<i className="fa-solid fa-building-columns fa-lg"></i>}
                                bgIcon={'blue'}
                                label={'Poktan'}
                                count={poktanCount}
                                url={'/kelembagaan-pertanian/poktan'}
                            />
                            <CardMenuDashboard
                                icon={<i className="fa-solid fa-building-columns fa-lg"></i>}
                                bgIcon={'blue'}
                                label={'Subak'}
                                count={subakCount}
                                url={'/kelembagaan-pertanian/subak'}
                            />
                            <CardMenuDashboard
                                icon={<i className="fa-solid fa-chart-area fa-lg"></i>}
                                bgIcon={'blue'}
                                label={'Lahan Pertanian'}
                                count={landAgricultureCount}
                                url={'/lahan_pertanian'}
                            />
                            <CardMenuDashboard
                                icon={<i className="fa-solid fa-map fa-lg"></i>}
                                bgIcon={'blue'}
                                label={'Data Spasial'}
                                count={dataSpatialCount}
                                url={'/data-spasial'}
                            />
                        </>
                    }
                </div>
                {/* <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                            <div>
                                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">Data?</h6>
                                <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                    <strong>00 </strong> bulan ini
                                </p>
                            </div>
                            <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                            <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">DATA</p>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                            <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">DATA</p>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                            <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">DATA</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-4">
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Lorem, ipsum dolor.</p>
                                            </div>
                                        </td>

                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">00</p>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="w-10/12">
                                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">00%</p>
                                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                    <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" ></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-4">
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Lorem, ipsum dolor.</p>
                                            </div>
                                        </td>

                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">00</p>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="w-10/12">
                                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">00%</p>
                                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                    <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" ></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-4">
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Lorem, ipsum dolor.</p>
                                            </div>
                                        </td>

                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">00</p>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="w-10/12">
                                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">00%</p>
                                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                    <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" ></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-4">
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Lorem, ipsum dolor.</p>
                                            </div>
                                        </td>

                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">00</p>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="w-10/12">
                                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">00%</p>
                                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                    <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" ></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-4">
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Lorem, ipsum dolor.</p>
                                            </div>
                                        </td>

                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">00</p>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="w-10/12">
                                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">00%</p>
                                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                    <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" ></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-4">
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Lorem, ipsum dolor.</p>
                                            </div>
                                        </td>

                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">00</p>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="w-10/12">
                                                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">00%</p>
                                                <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                    <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" ></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-1">
                        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                            <div>
                                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">Data?</h6>
                                <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                    <strong>00 </strong> bulan ini
                                </p>
                            </div>
                            <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2 flex justify-center items-center">
                            <div className="rounded-full w-64 h-64 bg-cyan-800"></div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="text-blue-gray-600 rounded-md fixed bottom-2">
                <footer className="py-2">
                    <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">© 2024</p>
                    </div>
                    {/* <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">© 2024, Develop with <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="-mt-0.5 inline-block h-3.5 w-3.5">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                        </svg> by <a href="https://www.kadekwidiana.site" target="_blank" className="transition-colors hover:text-blue-500">Kadek Widiana</a> </p>
                    </div> */}
                </footer>
            </div>
        </BackpageLayout>
    )
}
