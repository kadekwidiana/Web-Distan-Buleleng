export const SidebarBasemap = () => {
    return (
        <div className="max-h-[90dvh] sidebar-basemap bg-gray-50 mt-0 px-2" id="sidebar-basemap">
            <h5 className="text-center font-semibold text-gray-700 text-lg my-1">Basemap</h5>
            <div className="border mb-2"></div>
            <div className="flex-row">
                <div className="columns-2">
                    <div className="basemap-options">
                        <label htmlFor="">
                            <div className="">
                                <img src="/assets/icons/icon-basemap/openstreetmap_blackandwhite.png"
                                    alt="OpenStreetMap" className="w-32 h-28 object-cover border rounded-md border-gray-400" />
                                <input className="form-check-input" type="radio" name="basemap" value="openStreetMap" />
                                OSM
                            </div>
                        </label>
                        <label htmlFor="">
                            <div className="">
                                <img src="/assets/icons/icon-basemap/google-streets.png" alt="GoogleStreetMap"
                                    className="w-32 h-28 object-cover border rounded-md border-gray-400" />
                                <input className="form-check-input" type="radio" name="basemap" value="googleStreetMap" defaultChecked />
                                Street
                            </div>
                        </label>

                    </div>
                </div>

                <div className="columns-2">
                    <div className="basemap-options">
                        <label htmlFor="">
                            <div>
                                <img src="/assets/icons/icon-basemap/here_satelliteday.png" alt="Satellite "
                                    className="w-32 h-28 object-cover border rounded-md border-gray-400" />
                                <input className="form-check-input" type="radio" name="basemap" value="satelliteMap" />
                                Satelite
                            </div>
                        </label>
                        <label htmlFor="">
                            <div>
                                <img src="/assets/icons/icon-basemap/google-hibrid.png" alt="Satellite "
                                    className="w-32 h-28 object-cover border rounded-md border-gray-400" />
                                <input className="form-check-input" type="radio" name="basemap" value="googleHibridMap" />
                                Hibrid
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex-row">
                <div className="columns-2">
                    <div className="basemap-options">
                        <label htmlFor="">
                            <div>
                                <img src="/assets/icons/icon-basemap/esri-street.png" alt="Esri"
                                    className="w-32 h-28 object-cover border rounded-md border-gray-400" />
                                <input className="form-check-input" type="radio" name="basemap" value="esriWorldStreetMap" />
                                Esri Street
                            </div>
                        </label>
                        <label htmlFor="">
                            <div>
                                <img src="/assets/icons/icon-basemap/topo-map.png" alt="OpenTopoMap"
                                    className="w-32 h-28 object-cover border rounded-md border-gray-400" />
                                <input className="form-check-input" type="radio" name="basemap" value="openTopoMap" />
                                TopoMap
                            </div>
                        </label>
                    </div>
                </div>

                <div className="columns-2">
                    <div className="basemap-options">
                        <label htmlFor="">
                            <div>
                                <img src="/assets/icons/icon-basemap/esri-satelite.png" alt="Esri "
                                    className="w-32 h-28 object-cover border rounded-md border-gray-400" />
                                <input className="form-check-input" type="radio" name="basemap" value="esriSatelite" />
                                Esri Satelite
                            </div>
                        </label>
                        <label htmlFor="">
                            <div>
                                <img src="/assets/icons/icon-basemap/google-earth.png" alt="Thunderforest "
                                    className="w-32 h-28 object-cover border rounded-md border-gray-400" />
                                <input className="form-check-input" type="radio" name="basemap" value="googleEarth" />
                                Earth
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}