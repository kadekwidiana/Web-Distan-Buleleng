import ButtonBack from '@/Components/Button/Back';
import MapsDetailData from '@/Components/Maps/MapsDetailData';
import BackpageLayout from '@/Layouts/BackpageLayout';
import { Head, usePage } from '@inertiajs/react';

export default function DetailDistrictPage() {
    const { districtById } = usePage().props;

    return (
        <BackpageLayout>
            <Head title="Detail Kecamatan" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 shadow-default sm:px-7.5 xl:pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        <div className="relative overflow-x-auto">
                            <ButtonBack url={`/master-data/kecamatan`} />
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Nama</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{districtById.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Kabupaten</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{districtById.regency.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Luas</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{districtById.wide}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <MapsDetailData data={districtById} isRegion />
                    </div>
                </div>
            </div>
        </BackpageLayout>
    );
}
