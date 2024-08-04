import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, usePage } from '@inertiajs/react'
import { Banner } from 'flowbite-react';
import React from 'react'

export default function Dashboard() {
    const { auth } = usePage().props;
    return (
        <BackpageLayout>
            <Head title="Dashboard" />
            <Banner>
                <div className="flex w-full border-l-4 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-4 py-8 shadow-md">
                    <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                        <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                                fill="white"
                                stroke="white"
                            ></path>
                        </svg>
                    </div>
                    <div className="w-full">
                        <h5 className="mb-3 text-lg text-black">
                            Selamat Datang <span className='font-semibold'>{auth.user.name}</span>, anda login sebagai <span className='font-semibold'>{auth.user.role}</span>
                        </h5>
                        <p className="text-base leading-relaxed text-body">
                            Selalu jaga kerahasiaan username dan password anda.
                        </p>
                    </div>
                    <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 items-center">
                        <i className="fa-solid fa-x"></i>
                    </Banner.CollapseButton>
                </div>
            </Banner>
            <div className="flex flex-col gap-4">
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-4">
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                                <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
                                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                            </svg>
                        </div>
                        <div className="p-4 text-right">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Data?</p>
                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">00</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                                <strong className="text-green-500">00</strong>&nbsp;data?
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="p-4 text-right">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Data?</p>
                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">00</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                                <strong className="text-green-500">00</strong>&nbsp;data?
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                            </svg>
                        </div>
                        <div className="p-4 text-right">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Data?</p>
                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">00</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                                <strong className="text-green-500">00</strong>&nbsp;data?
                            </p>
                        </div>
                    </div>
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                            </svg>
                        </div>
                        <div className="p-4 text-right">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Data?</p>
                            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">00</h4>
                        </div>
                        <div className="border-t border-blue-gray-50 p-4">
                            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                                <strong className="text-green-500">00</strong>&nbsp;data?
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
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
                </div>
            </div>
            <div className="text-blue-gray-600 bg-gray-200 rounded-md">
                <footer className="py-2">
                    <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">© 2024, Develop with <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="-mt-0.5 inline-block h-3.5 w-3.5">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                        </svg> by <a href="https://www.kadekwidiana.site" target="_blank" className="transition-colors hover:text-blue-500">Kadek Widiana</a> </p>
                        <ul className="flex items-center gap-4">
                            <li>
                                <a href="https://www.kadekwidiana.site" target="_blank" className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">Version dev</a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </BackpageLayout>
    )
}
