import DataNotFound from '@/Components/Error/DataNotFound';
import { ABILITY_CLASSES } from '@/Constant/Class';
import { CONFIRMATION_STATUSES, GROUP_STATUSES } from '@/Constant/Status';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { Table } from 'flowbite-react';

export default function SubakList({ subaks }) {
    // console.log(subaks);
    return (
        <div className="flex flex-col w-auto overflow-x-auto pb-4">
            {subaks.length <= 0 && <DataNotFound />}
            {subaks.length > 0 &&
                <Table striped className="min-w-max">
                    <Table.Head>
                        <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                        <Table.HeadCell>NAMA</Table.HeadCell>
                        <Table.HeadCell>KETUA</Table.HeadCell>
                        <Table.HeadCell>SEKRETARIS</Table.HeadCell>
                        <Table.HeadCell>BENDAHARA</Table.HeadCell>
                        <Table.HeadCell>JUMLAH ANGGOTA</Table.HeadCell>
                        <Table.HeadCell>TAHUN BERDIRI</Table.HeadCell>
                        <Table.HeadCell>STATUS</Table.HeadCell>
                        <Table.HeadCell>KOMODITAS</Table.HeadCell>
                        <Table.HeadCell>ALAMAT</Table.HeadCell>
                        <Table.HeadCell>DESKRIPSI</Table.HeadCell>
                        <Table.HeadCell>DATA DIBUAT</Table.HeadCell>
                        <Table.HeadCell>DATA DIUPDATE</Table.HeadCell>
                        {/* <Table.HeadCell className='flex justify-center'>
                        AKSI
                    </Table.HeadCell> */}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {subaks.map((subak, index) => (
                            <Table.Row key={index} className="">
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{subak.name}</Table.Cell>
                                <Table.Cell>{subak.leader}</Table.Cell>
                                <Table.Cell>{subak.secretary}</Table.Cell>
                                <Table.Cell>{subak.treasurer}</Table.Cell>
                                <Table.Cell>{subak.number_of_members}</Table.Cell>
                                <Table.Cell>{subak.since}</Table.Cell>
                                <Table.Cell>{GROUP_STATUSES.find((groupStatus) => subak.status === groupStatus.value)?.label}</Table.Cell>
                                <Table.Cell>
                                    {subak.commodities.length > 0 ? subak.commodities.map((commodity, index) => (
                                        <span key={index}>
                                            {commodity.name}{index < subak.commodities.length - 1 ? ', ' : ''}
                                        </span>
                                    )) : 'No commodities'}
                                </Table.Cell>
                                <Table.Cell>{subak.address}</Table.Cell>
                                <Table.Cell>{subak.description}</Table.Cell>
                                <Table.Cell>{formatDateToIndonesian(subak?.created_at)}</Table.Cell>
                                <Table.Cell>{formatDateToIndonesian(subak?.updated_at)}</Table.Cell>
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
