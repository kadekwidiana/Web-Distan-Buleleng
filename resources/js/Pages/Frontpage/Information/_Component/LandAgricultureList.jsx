import DataNotFound from '@/Components/Error/DataNotFound';
import { ABILITY_CLASSES } from '@/Constant/Class';
import { CONFIRMATION_STATUSES, GROUP_STATUSES } from '@/Constant/Status';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { generateCommoditiesCycleHtml } from '@/Utils/generateCommoditiesCycleHtml';
import { Table } from 'flowbite-react';

export default function LandAgricultureList({ landAgricultures }) {
    // console.log(landAgricultures);
    return (
        <div className="flex flex-col w-auto overflow-x-auto pb-4">
            {landAgricultures.length <= 0 && <DataNotFound />}
            {landAgricultures.length > 0 &&
                <Table striped className="min-w-max">
                    <Table.Head>
                        <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                        <Table.HeadCell>PEMILIK</Table.HeadCell>
                        <Table.HeadCell>PENGGARAP</Table.HeadCell>
                        <Table.HeadCell>POKTAN</Table.HeadCell>
                        <Table.HeadCell>SUBAK</Table.HeadCell>
                        <Table.HeadCell>JENIS LAHAN</Table.HeadCell>
                        <Table.HeadCell>LUAS LAHAN</Table.HeadCell>
                        <Table.HeadCell>KOMODITAS</Table.HeadCell>
                        <Table.HeadCell>PERKIRAAN PANEN</Table.HeadCell>
                        <Table.HeadCell>STATUS</Table.HeadCell>
                        <Table.HeadCell>ALAMAT</Table.HeadCell>
                        <Table.HeadCell>DESKRIPSI</Table.HeadCell>
                        <Table.HeadCell>DATA DIBUAT</Table.HeadCell>
                        <Table.HeadCell>DATA DIUPDATE</Table.HeadCell>
                        {/* <Table.HeadCell className='flex justify-center'>
                        AKSI
                    </Table.HeadCell> */}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {landAgricultures.map((landAgriculture, index) => (
                            <Table.Row key={index} className="">
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{landAgriculture?.owner?.name}</Table.Cell>
                                <Table.Cell>{landAgriculture?.cultivator?.name ?? '-'}</Table.Cell>
                                <Table.Cell>{landAgriculture?.poktan?.name ?? '-'}</Table.Cell>
                                <Table.Cell>{landAgriculture?.subak?.name ?? '-'}</Table.Cell>
                                <Table.Cell>{landAgriculture.type_land_agriculture.name}</Table.Cell>
                                <Table.Cell>{landAgriculture.land_area} are (m²)</Table.Cell>
                                <Table.Cell>
                                    {landAgriculture.commodities.length > 0 ? landAgriculture.commodities.map((commodity, index) => (
                                        <span key={index}>
                                            {commodity.name}{index < landAgriculture.commodities.length - 1 ? ', ' : ''}
                                        </span>
                                    )) : 'No commodities'}
                                </Table.Cell>
                                <Table.Cell dangerouslySetInnerHTML={{ __html: generateCommoditiesCycleHtml(JSON.parse(landAgriculture.commodities_cycle)) }}></Table.Cell>
                                <Table.Cell>{GROUP_STATUSES.find((groupStatus) => landAgriculture.status === groupStatus.value)?.label}</Table.Cell>
                                <Table.Cell>{landAgriculture.address}</Table.Cell>
                                <Table.Cell>{landAgriculture.description}</Table.Cell>
                                <Table.Cell>{formatDateToIndonesian(landAgriculture?.created_at)}</Table.Cell>
                                <Table.Cell>{formatDateToIndonesian(landAgriculture?.updated_at)}</Table.Cell>
                                {/* <Table.Cell className='flex justify-center items-center gap-3'>
                            <Link href={`/`}>
                                <i className="fa-solid fa-circle-info fa-2xl text-green-500"></i>
                            </Link>
                        </Table.Cell> */}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            }
        </div>
    );
}
