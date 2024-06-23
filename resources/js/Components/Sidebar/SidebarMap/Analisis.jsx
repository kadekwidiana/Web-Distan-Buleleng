import Button from "@/Components/Button/Button"
import InputLabel from "@/Components/Input/InputLabel"
import InputSelect from "@/Components/Input/InputSelect"
import TextInput from "@/Components/Input/TextInput"
import TextInputArea from "@/Components/Input/TextInputArea"
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import { useEffect, useState } from "react";
import Checkbox from "@/Components/Input/Checkbox"
import { YEARRANGE } from "@/Utils/Constan/Index"
import DetailAnalisis from "@/Components/Modal/DetailAnalisis"
import LineChartAnalisis from "@/Components/Grafik/LineChartAnalisis"
import InputError from "@/Components/Input/InputError"
import { Toast, ToastLoading } from "@/Components/Alert/Toast"
import { Spinner } from "flowbite-react"
import { useStore } from "@/Store/Index.store"
import { useShallow } from 'zustand/react/shallow'
import { useEVIAndMSIAnalisis, usePrecipitationAnalisis, useVCIAnalisis } from "@/Services/api.service"

const dataAnalisis = [
    {
        name: "Precipitation",
        id: "Precipitation"
    },
    {
        name: "VCI (Vegetation Condition Index)",
        id: "VCI"
    },
    {
        name: "EVI (Enhanced Vegetation Index)",
        id: "EVI"
    },
    {
        name: "MSI (Moisture Stress Index)",
        id: "MSI"
    }
]

export const SidebarAnalisis = () => {
    const [precipitationData, setPrecipitationData] = useState([]);
    const [VCIData, setVciData] = useState([]);
    const [EVIAndMSIData, setEviAndMsiData] = useState([]);
    const [yearRange, setYearRange] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { setPrecipitationData: setPrecipitationDataStore, setVCIData: setVCIDataStore, setEVIData: setEVIDataStore, setMSIData: setMSIDataStore } = useStore(
        useShallow((state) => (
            {
                setPrecipitationData: state.setPrecipitationData,
                setVCIData: state.setVCIData,
                setEVIData: state.setEVIData,
                setMSIData: state.setMSIData
            }
        )),
    );

    const {
        mutate: postDataPrecipitation,
        data: resDataPrecipitation,
        isPending: isPendingPrecipitation,
        isSuccess: isSuccessPrecipitation,
        isError: isErrorPrecipitation
    } = usePrecipitationAnalisis();

    const {
        mutate: postDataVCI,
        data: resDataVCI,
        isPending: isPendingVCI,
        isSuccess: isSuccessVCI,
        isError: isErrorVCI
    } = useVCIAnalisis();

    const {
        mutate: postDataEVIAndMSI,
        data: resDataEVIAndMSI,
        isPending: isPendingEVIAndMSI,
        isSuccess: isSuccessEVIAndMSI,
        isError: isErrorEVIAndMSI
    } = useEVIAndMSIAnalisis();

    const handleSumbit = async (e) => {
        e.preventDefault();
        const formData = {
            geometry: e.target.geometry.value,
            type: e.target.type.value,
            startYear: e.target.startYear.value,
            endYear: e.target.endYear.value
        }

        setYearRange([
            formData.startYear,
            formData.endYear
        ]);

        if (formData.startYear > formData.endYear) return setIsError(true);
        setIsError(false);

        postDataPrecipitation(formData);
        postDataVCI(formData);
        postDataEVIAndMSI(formData);
    }

    useEffect(() => {
        if (isPendingPrecipitation || isPendingVCI || isPendingEVIAndMSI) {
            setIsLoading(true);
            ToastLoading.fire({
                title: "Sedang memuat...",
            });
        } else {
            setIsLoading(false);
            ToastLoading.close();
        }

        if (isSuccessPrecipitation && resDataPrecipitation.data) {
            setPrecipitationData(resDataPrecipitation.data);
            setPrecipitationDataStore(resDataPrecipitation);
        }

        if (isSuccessVCI && resDataVCI.data) {
            setVciData(resDataVCI.data);
            setVCIDataStore(resDataVCI);
        }

        if (isSuccessEVIAndMSI && resDataEVIAndMSI.data) {
            setEviAndMsiData(resDataEVIAndMSI.data);
            setEVIDataStore(resDataEVIAndMSI);
            setMSIDataStore(resDataEVIAndMSI);
        }
    }, [
        // pending/loading
        isPendingPrecipitation,
        isPendingVCI,
        isPendingEVIAndMSI,
        // success
        isSuccessPrecipitation,
        isSuccessVCI,
        isSuccessEVIAndMSI,
        // error
        isErrorPrecipitation,
        isErrorVCI,
        isErrorEVIAndMSI,
        // res data
        resDataPrecipitation,
        resDataVCI,
        resDataEVIAndMSI
    ]);

    return (
        <div className="max-h-[90dvh] container sidebar-analisis bg-white mt-0 pb-5 px-2" id="sidebar-analisis">
            <h5 className="text-center font-semibold text-gray-700 text-lg my-1">Analisis Informasi Geospasial</h5>
            <div className="border mb-2"></div>
            <form onSubmit={handleSumbit} action="" className="py-2 flex flex-col gap-2">
                <div className="">
                    <InputLabel>
                        Geometry
                    </InputLabel>
                    <TextInputArea
                        required
                        id="geometry"
                        name="geometry"
                        placeholder="Geometry"
                    />
                </div>
                <div className="">
                    <InputLabel>
                        Tipe
                    </InputLabel>
                    <TextInput
                        required
                        id="type"
                        name="type"
                        placeholder="Type"
                    />
                </div>
                <div className="flex justify-between gap-2">
                    <div className="w-full">
                        <InputLabel>
                            Tahun Mulai
                        </InputLabel>
                        <InputSelect
                            className={isError && 'border border-red-500'}
                            id="startYear"
                            name="startYear"
                            required>
                            {YEARRANGE.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                            ))}
                        </InputSelect>
                    </div>
                    <div className="w-full">
                        <InputLabel>
                            Tahun Selesai
                        </InputLabel>
                        <InputSelect
                            className={isError && 'border border-red-500'}
                            id="endYear"
                            name="endYear"
                            required>
                            {YEARRANGE.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                            ))}
                        </InputSelect>
                    </div>
                </div>
                {isError &&
                    <div className="">
                        <InputError message={'Mohon pilih rentan tahun yang sesuai!'} />
                    </div>
                }
                <div className="flex justify-end">
                    <Button disabled={isLoading} type="submit" className={isLoading ? 'cursor-wait' : ''}>
                        {isLoading &&
                            <Spinner aria-label="Spinner button example" size="md" />
                        }
                        {isLoading ? 'Loading...' : 'Dapatkan Informasi'}
                    </Button>
                </div>
            </form>
            {isPendingPrecipitation && precipitationData.length <= 0 &&
                <div className="animate-pulse">
                    <article className="flex max-w-xl flex-col items-start justify-between my-3 bg-gray-100 rounded-md">
                        <div className="h-52 w-full relative mb-2">
                            <div className="bg-slate-300 h-full w-full rounded-t-md flex justify-center items-center">
                                Memuat data...
                            </div>
                        </div>
                        <div className="px-2 pb-2 w-full">
                            <div className="h-3 bg-slate-300 rounded mb-2"></div>
                        </div>
                    </article>
                </div>
            }
            {precipitationData.length > 0 &&
                <div className="w-full border border-gray-400 p-1 rounded-md">
                    <div className="flex justify-end">
                        <DetailAnalisis
                            yearRange={yearRange}
                            dataPrecipitation={precipitationData}
                            dataVCI={VCIData}
                            dataEviAndMSI={EVIAndMSIData}
                        />
                    </div>
                    <div className="">
                        <LineChartAnalisis
                            dataPrecipitation={precipitationData}
                            dataVCI={VCIData}
                            dataEviAndMSI={EVIAndMSIData}
                        />
                    </div>
                </div>
            }
            <div className={`flex flex-col gap-2 mt-2 mb-2 ${isPendingPrecipitation || precipitationData.length <= 0 && 'hidden'}`}>
                <label className="flex items-center">
                    <span className="text-base font-semibold text-gray-800">Layer</span>
                </label>
                <label className={`flex items-center ${precipitationData.length > 0 ? '' : 'hidden'}`}>
                    <Checkbox
                        id="Precipitation"
                        name="Precipitation"
                    />
                    <span className="ms-2 text-base text-gray-800">Precipitation(Curah Hujan)</span>
                </label>

                <label className={`flex items-center ${VCIData.length > 0 ? '' : 'hidden'}`}>
                    <Checkbox
                        id="VCI"
                        name="remember"
                    />
                    <span className="ms-2 text-base text-gray-800">VCI (Vegetation Condition Index) </span>
                </label>

                <label className={`flex items-center ${EVIAndMSIData.length > 0 ? '' : 'hidden'}`}>
                    <Checkbox
                        id="EVI"
                        name="remember"
                    />
                    <span className="ms-2 text-base text-gray-800">EVI (Enhanced Vegetation Index)</span>
                </label>

                <label className={`flex items-center ${EVIAndMSIData.length > 0 ? '' : 'hidden'}`}>
                    <Checkbox
                        id="MSI"
                        name="remember"
                    />
                    <span className="ms-2 text-base text-gray-800">MSI (Moisture Stress Index)</span>
                </label>
            </div>
        </div>
    )
}
