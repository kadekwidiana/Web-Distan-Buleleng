import DataNotFound from '@/Components/Error/DataNotFound';
import { ABILITY_CLASSES } from '@/Constant/Class';
import { CONFIRMATION_STATUSES, GROUP_STATUSES } from '@/Constant/Status';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { Table } from 'flowbite-react';

export default function PoktanList({ poktans }) {
    // console.log(poktans);
    return (
        <div className="flex flex-col w-auto overflow-x-auto pb-4">
            {poktans.length <= 0 && <DataNotFound />}
            {poktans.length > 0 &&
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
                        <Table.HeadCell>STATUS KONFIRMASI</Table.HeadCell>
                        <Table.HeadCell>KELAS KEMAMPUAN</Table.HeadCell>
                        <Table.HeadCell>TAHUN KELAS KEMAMPUAN</Table.HeadCell>
                        <Table.HeadCell>KOMODITAS YANG DIUSAHAKAN</Table.HeadCell>
                        <Table.HeadCell>ALAMAT</Table.HeadCell>
                        <Table.HeadCell>DESKRIPSI</Table.HeadCell>
                        <Table.HeadCell>DATA DIBUAT</Table.HeadCell>
                        <Table.HeadCell>DATA DIUPDATE</Table.HeadCell>
                        {/* <Table.HeadCell className='flex justify-center'>
                        AKSI
                    </Table.HeadCell> */}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {poktans.map((poktan, index) => (
                            <Table.Row key={index} className="">
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{poktan.name}</Table.Cell>
                                <Table.Cell>{poktan.leader}</Table.Cell>
                                <Table.Cell>{poktan.secretary}</Table.Cell>
                                <Table.Cell>{poktan.treasurer}</Table.Cell>
                                <Table.Cell>{poktan.number_of_members}</Table.Cell>
                                <Table.Cell>{poktan.since}</Table.Cell>
                                <Table.Cell>{GROUP_STATUSES.find((groupStatus) => poktan.status === groupStatus.value)?.label}</Table.Cell>
                                <Table.Cell>{CONFIRMATION_STATUSES.find((confirmationStatus) => poktan.group_confirmation_status === confirmationStatus.value)?.label}</Table.Cell>
                                <Table.Cell>{ABILITY_CLASSES.find((abilityClass) => poktan.ability_class === abilityClass.value)?.label}</Table.Cell>
                                <Table.Cell>{poktan.year_of_class_assignment}</Table.Cell>
                                <Table.Cell>
                                    {poktan.commodities.length > 0 ? poktan.commodities.map((commodity, index) => (
                                        <span key={index}>
                                            {commodity.name}{index < poktan.commodities.length - 1 ? ', ' : ''}
                                        </span>
                                    )) : 'No commodities'}
                                </Table.Cell>
                                <Table.Cell>{poktan.address}</Table.Cell>
                                <Table.Cell>{poktan.description}</Table.Cell>
                                <Table.Cell>{formatDateToIndonesian(poktan?.created_at)}</Table.Cell>
                                <Table.Cell>{formatDateToIndonesian(poktan?.updated_at)}</Table.Cell>
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
