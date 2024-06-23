export const SidebarLegend = () => {
    return (
        <div className="max-h-[90dvh] container sidebar-legend bg-white mt-0 pb-5 px-2" id="sidebar-legend">
            <h5 className="text-center font-semibold text-gray-700 text-lg my-1">Legenda</h5>
            <div className="border mb-2"></div>
            <div className="col">
                <div className="border rounded mt-2">
                    {/* <!-- <div className="border-top"></div> --> */}
                    <p className="bg-secondary p-2 m-0 rounded-top fw-bold">Legenda Informasi Pertanian</p>
                    <div className="p-2">
                        <div className="flex justify-start gap-2">
                            <img className="rounded" src="/assets/icons/icon-marker/corn.png"
                                alt="" />
                            Jagung
                            {/* </label> */}
                        </div>
                        <div className="flex justify-start gap-2">
                            <img className="rounded" src="/assets/icons/icon-marker/paddy.png"
                                alt="" />
                            Padi
                            {/* </label> */}
                        </div>
                    </div>

                    {/* <!-- Tambahkan item lain di sini --> */}
                </div>
            </div>
        </div>
    )
}