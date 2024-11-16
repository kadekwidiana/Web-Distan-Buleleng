import DataNotFound from '@/Components/Error/DataNotFound';
import { GROUP_STATUSES } from '@/Constant/Status';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { Table } from 'flowbite-react';

export default function BPPList({ bpps }) {
    // console.log(bpps);
    return (
        <div className="flex flex-col w-auto overflow-x-auto pb-4">
            {bpps.length <= 0 && <DataNotFound />}
            {bpps.length > 0 &&
                <Table striped className="min-w-max">
                    <Table.Head>
                        <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                        <Table.HeadCell>NAMA</Table.HeadCell>
                        <Table.HeadCell>KETUA</Table.HeadCell>
                        <Table.HeadCell>SEKRETARIS</Table.HeadCell>
                        <Table.HeadCell>BENDAHARA</Table.HeadCell>
                        <Table.HeadCell>JUMLAH ANGGOTA</Table.HeadCell>
                        <Table.HeadCell>TAHUN BERDIRI</Table.HeadCell>
                        <Table.HeadCell>TELEPON</Table.HeadCell>
                        <Table.HeadCell>EMAIL</Table.HeadCell>
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
                        {bpps.map((bpp, index) => (
                            <Table.Row key={index} className="">
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{bpp.name}</Table.Cell>
                                <Table.Cell>{bpp.leader}</Table.Cell>
                                <Table.Cell>{bpp.secretary}</Table.Cell>
                                <Table.Cell>{bpp.treasurer}</Table.Cell>
                                <Table.Cell>{bpp.number_of_members}</Table.Cell>
                                <Table.Cell>{bpp.since}</Table.Cell>
                                <Table.Cell>{bpp.phone_number}</Table.Cell>
                                <Table.Cell>{bpp.email}</Table.Cell>
                                <Table.Cell>{GROUP_STATUSES.find((groupStatus) => bpp.status === groupStatus.value)?.label}</Table.Cell>
                                <Table.Cell>{bpp.address}</Table.Cell>
                                <Table.Cell>{bpp.description}</Table.Cell>
                                <Table.Cell>{formatDateToIndonesian(bpp?.created_at)}</Table.Cell>
                                <Table.Cell>{formatDateToIndonesian(bpp?.updated_at)}</Table.Cell>
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
