import { Toast } from '@/Components/Alert/Toast';
import Button from '@/Components/Button/Button';
import FetchError from '@/Components/Error/FetchError';
import InputSelect from '@/Components/Input/InputSelect';
import SelectTwo from '@/Components/Input/InputSelectTwo';
import LoadData from '@/Components/Loading/LoadData';
import { HTTP_STATUS_MESSAGES } from '@/Constant/HTTPStartusMessages';
import FrontpageLayout from '@/Layouts/FrontpageLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Accordion } from 'flowbite-react';
import { pickBy } from 'lodash';
import { useState } from 'react';
import GapoktanList from './_Component/GapoktanList';
import PoktanList from './_Component/PoktanList';
import SubakList from './_Component/SubakList';
import LandAgricultureList from './_Component/LandAgricultureList';
import BPPList from './_Component/BPPList';
import PPLList from './_Component/PPLList';
import FooterFrontpage from '@/Components/Footer/FooterFrontpage';

const filtersBy = [
    'Kecamatan',
    'Desa'
];

export default function InformationPage() {
    const { districts, villages } = usePage().props;

    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1]);

    const [informationAgricultures, setInformationAgricultures] = useState('');
    const [filterBy, setFilterBy] = useState(searchParams.get('districtId') ? 'Kecamatan' : searchParams.get('villageId') ? 'Desa' : '');
    const [districtId, setDistrictId] = useState(searchParams.get('districtId') ?? '');
    const [villageId, setVillageId] = useState(searchParams.get('villageId') ?? '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const getData = async () => {
        setIsLoading(true);

        let params;
        if (districtId) {
            params = pickBy({
                districtId: districtId
            });
        }
        if (villageId) {
            params = pickBy({
                villageId: villageId
            });
        }

        // url params
        router.get(
            route('information-frontpage'),
            params,
            {
                preserveScroll: true,
                preserveState: true,
                // onFinish: () => setIsLoading(false),
            }
        );
        // get to api
        try {
            const res = await axios.get(`/information-agriculture-regions?district_id=${districtId}&village_id=${villageId}`);
            if (res.status === 200) {
                setInformationAgricultures(res.data.data);
                Toast.fire({
                    icon: "success",
                    title: 'Data berhasil diambil.',
                });
            } else {
                setError(HTTP_STATUS_MESSAGES[res.status]);
                Toast.fire({
                    icon: "error",
                    title: HTTP_STATUS_MESSAGES[res.status],
                });
            }
        } catch (error) {
            setError(HTTP_STATUS_MESSAGES.defaultErrorMessage);
            Toast.fire({
                icon: "error",
                title: HTTP_STATUS_MESSAGES.defaultErrorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetData = () => {
        getData();
    };

    // skip dulu ini, terjadi infinity loop
    // useEffect(() => {
    //     if (districtId || villageId) {
    //         getData();
    //     }
    // }, [districtId, villageId]);

    // console.log('data set', informationAgricultures);
    return (
        <>
            <Head title="Informasi Pertanian" />
            <FrontpageLayout>
                <div className="min-h-[90dvh] flex flex-col">
                    <section className="flex-grow">
                        <div className="pt-4 pb-8 px-4 mx-auto max-w-screen-xl text-center">
                            <table className="w-full text-base text-left rtl:text-right text-gray-800 mb-2">
                                <tbody>
                                    <tr className="">
                                        <td className="pr-2 py-2 w-1/5">Cari Berdasarkan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            <div className="flex justify-start gap-2 items-center lg:w-1/2">
                                                <InputSelect
                                                    value={filterBy} // Set nilai select berdasarkan state filterBy
                                                    id="filterBy"
                                                    name="filterBy"
                                                    onChange={(e) => {
                                                        setFilterBy(e.target.value);
                                                        setDistrictId('');
                                                        setVillageId('');
                                                    }} // Tambahkan onChange handler
                                                >
                                                    <option value={''}>-- Pilih Kriteria Pencarian --</option>
                                                    {filtersBy.map((filterBy, index) => (
                                                        <option key={index} value={filterBy}>{filterBy}</option>
                                                    ))}
                                                </InputSelect>
                                            </div>
                                        </td>
                                    </tr>
                                    {filterBy === 'Kecamatan' &&
                                        <tr className="">
                                            <td className="pr-2 py-2 w-1/5">Kecamatan</td>
                                            <td className="px-2 py-2 w-3">:</td>
                                            <td className="px-2 py-2 w-full">
                                                <div className="flex justify-start gap-2 items-center w-1/2">
                                                    <SelectTwo
                                                        entities={districts}
                                                        selectedEntityId={districtId}
                                                        setSelectedEntityId={(id) => setDistrictId(id)}
                                                        label={'-- Pilih Kecamatan --'}
                                                        placeholder={'Cari Kecamatan...'}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                    {filterBy === 'Desa' &&
                                        <tr className="">
                                            <td className="pr-2 py-2 w-1/5">Desa</td>
                                            <td className="px-2 py-2 w-3">:</td>
                                            <td className="px-2 py-2 w-full">
                                                <div className="flex justify-start gap-2 items-center w-1/2">
                                                    <SelectTwo
                                                        entities={villages}
                                                        selectedEntityId={villageId}
                                                        setSelectedEntityId={(id) => setVillageId(id)}
                                                        label={'-- Pilih Desa --'}
                                                        placeholder={'Cari Desa...'}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <div className="py-4 flex justify-start gap-2 items-center">
                                <a href={`/information`}>
                                    <Button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-white">Reset</Button>
                                </a>
                                <Button onClick={handleGetData} disabled={isLoading || districtId === '' && villageId === ''} type="button" className={`${districtId === '' && villageId === '' ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                                    Cari
                                </Button>
                            </div>
                            {isLoading && <LoadData />}
                            {error && !isLoading && <FetchError message={error} />}
                            {!isLoading && !error && informationAgricultures !== '' &&
                                <Accordion collapseAll alwaysOpen>
                                    <Accordion.Panel>
                                        <Accordion.Title>Gabungan Kelompok Tani</Accordion.Title>
                                        <Accordion.Content>
                                            <GapoktanList gapoktans={informationAgricultures?.gapoktans} />
                                        </Accordion.Content>
                                    </Accordion.Panel>
                                    <Accordion.Panel>
                                        <Accordion.Title>Kelompok Tani</Accordion.Title>
                                        <Accordion.Content>
                                            <PoktanList poktans={informationAgricultures?.poktans} />
                                        </Accordion.Content>
                                    </Accordion.Panel>
                                    <Accordion.Panel>
                                        <Accordion.Title>Subak</Accordion.Title>
                                        <Accordion.Content>
                                            <SubakList subaks={informationAgricultures?.subaks} />
                                        </Accordion.Content>
                                    </Accordion.Panel>
                                    <Accordion.Panel>
                                        <Accordion.Title>Balai Penyuluh Pertanian (BPP)</Accordion.Title>
                                        <Accordion.Content>
                                            <BPPList bpps={informationAgricultures?.bpps} />
                                        </Accordion.Content>
                                    </Accordion.Panel>
                                    <Accordion.Panel>
                                        <Accordion.Title>Lahan Pertanian</Accordion.Title>
                                        <Accordion.Content>
                                            <LandAgricultureList landAgricultures={informationAgricultures?.land_agricultures} />
                                        </Accordion.Content>
                                    </Accordion.Panel>
                                    <Accordion.Panel>
                                        <Accordion.Title>Penyuluh Pertanian Lapangan (PPL)</Accordion.Title>
                                        <Accordion.Content>
                                            <PPLList ppls={informationAgricultures?.ppls} />
                                        </Accordion.Content>
                                    </Accordion.Panel>
                                </Accordion>
                            }
                        </div>
                    </section>
                    <FooterFrontpage />
                </div>
            </FrontpageLayout>
        </>
    );
}
