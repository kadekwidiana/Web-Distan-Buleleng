import { Link } from '@inertiajs/react';

export default function FooterFrontpage() {
    return (
        <footer className="bg-gray-800 py-2">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-4 lg:py-6">
                <div className=" md:flex md:justify-between">
                    <div className="mb-6 md:mb-0 sm:w-2/6">
                        <Link href="https://flowbite.com/" className="flex items-center">
                            <img src="./assets/images/logo-distan-buleleng-2.svg" width={100} height={100} alt="Picture of the author" className='w-24' />
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
                    <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-2">
                        <a href="https://facebook.com/p/Dinas-Pertanian-Kabupaten-Buleleng-100086306629196" className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                <linearGradient id="awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1" x1="6.228" x2="42.077" y1="4.896" y2="43.432" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#0d61a9"></stop><stop offset="1" stopColor="#16528c"></stop></linearGradient><path fill="url(#awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1)" d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"></path><path d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z" opacity=".05"></path><path d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z" opacity=".07"></path><path fill="#fff" d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"></path>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/distanbuleleng/" className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fd5"></stop><stop offset=".328" stopColor="#ff543f"></stop><stop offset=".348" stopColor="#fc5245"></stop><stop offset=".504" stopColor="#e64771"></stop><stop offset=".643" stopColor="#d53e91"></stop><stop offset=".761" stopColor="#cc39a4"></stop><stop offset=".841" stopColor="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4168c9"></stop><stop offset=".999" stopColor="#4168c9" stopOpacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@dinaspertanianbuleleng7447" className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
