import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import { Modal } from "flowbite-react";
import { useState } from "react";
import LineChartDetailAnalisis from "../Grafik/LineChartDetailAnalisis";
import InputLabel from "../Input/InputLabel";
import InputSelect from "../Input/InputSelect";
import { YEARRANGE } from "@/Utils/Constan/Index";

export default function DetailAnalisis({ yearRange, dataPrecipitation, dataVCI, dataEviAndMSI, monthLabel }) {
    const [openModal, setOpenModal] = useState(false);
    const [modalSize, setModalSize] = useState('6xl');
    const [yearRangeValue, setYearRangeValue] = useState(yearRange);

    const handleStartYearChange = (e) => {
        const newStartYear = (e.target.value);
        setYearRangeValue([newStartYear, yearRangeValue[1]]);
    };

    const handleEndYearChange = (e) => {
        const newEndYear = (e.target.value);
        setYearRangeValue([yearRangeValue[0], newEndYear]);
    };

    return (
        <div>
            <button onClick={() => setOpenModal(true)} className="inline-flex rounded-md bg-gray-200 text-center font-medium text-gray-700 hover:bg-opacity-90 w-auto justify-center items-center gap-2 px-3 py-1 border">
                <span>Detail Grafik</span>
                <i className="fa-solid fa-magnifying-glass-plus"></i>
            </button>
            <Modal dismissible className="z-[300]" size={modalSize} show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Detail Analisis</Modal.Header>
                <div className="w-full mx-2 mt-1 flex justify-between items-center gap-2">
                    <div className="w-40 mx-2 flex justify-start items-center gap-2">
                        <span>Size: </span>
                        <select className="py-1 px-2 rounded-md border border-gray-300" defaultValue={modalSize} onChange={(event) => setModalSize(event.target.value)}>
                            <option value="sm">sm</option>
                            <option value="md">md</option>
                            <option value="lg">lg</option>
                            <option value="xl">xl</option>
                            <option value="2xl">2xl</option>
                            <option value="3xl">3xl</option>
                            <option value="4xl">4xl</option>
                            <option value="5xl">5xl</option>
                            <option value="6xl">6xl</option>
                            <option value="7xl">7xl</option>
                        </select>
                    </div>
                    <div className="w-[50dvh] flex justify-between items-center content-center gap-2 mx-4">
                        <InputLabel className="text-nowrap">
                            Rentan Tahun:
                        </InputLabel>
                        <div className="w-full">
                            <InputSelect
                                defaultValue={yearRangeValue[0]}
                                onChange={handleStartYearChange}
                                id="startYear"
                                name="startYear"
                                required>
                                {YEARRANGE.map((data, index) => (
                                    data >= yearRange[0] && data <= yearRange[1] &&
                                    <option key={index} value={data}>{data}</option>
                                ))}
                            </InputSelect>
                        </div>
                        <InputLabel>
                            -
                        </InputLabel>
                        <div className="w-full">
                            <InputSelect
                                defaultValue={yearRangeValue[1]}
                                onChange={handleEndYearChange}
                                id="endYear"
                                name="endYear"
                                required>
                                {YEARRANGE.map((data, index) => (
                                    data >= yearRange[0] && data <= yearRange[1] &&
                                    <option key={index} value={data}>{data}</option>
                                ))}
                            </InputSelect>
                        </div>
                    </div>
                </div>
                {yearRangeValue[0] > yearRangeValue[1] &&
                    <div className="flex justify-center items-center h-[40dvh] w-full">
                        <div className="text-center">
                            <h1 className="text-red-500 font-semibold text-2xl">Grafik tidak bisa di tampilkan</h1>
                            <h2 className="text-gray-700 font-semibold text-lg">Mohon pilih rentan tahun yang sesuai!</h2>
                            <p className="text-gray-700 text-lg">Tahun mulai harus lebih kecil atau sama dengan tahun selesai</p>
                        </div>
                    </div>
                }
                {yearRangeValue[0] <= yearRangeValue[1] &&
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1250px] h-auto flex justify-center">
                            <LineChartDetailAnalisis
                                yearRange={yearRangeValue}
                                dataPrecipitation={dataPrecipitation}
                                dataVCI={dataVCI}
                                dataEviAndMSI={dataEviAndMSI}
                                monthLabel={monthLabel}
                            />
                        </div>
                    </div>
                }
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
