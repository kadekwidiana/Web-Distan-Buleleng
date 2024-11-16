import DataNotFound from '@/Components/Error/DataNotFound';
import { ABILITY_CLASSES } from '@/Constant/Class';
import { CONFIRMATION_STATUSES, GROUP_STATUSES } from '@/Constant/Status';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { Table } from 'flowbite-react';

export default function PPLList({ ppls }) {
    // console.log(ppls);
    return (
        <div className="flex flex-col w-auto overflow-x-auto pb-4">
            {ppls.length <= 0 && <DataNotFound />}
            {ppls.length > 0 &&
                <Table striped className="min-w-max">
                    <Table.Head>
                        <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                        <Table.HeadCell>NAMA</Table.HeadCell>
                        <Table.HeadCell>ALAMAT</Table.HeadCell>
                        <Table.HeadCell>JENIS KELAMIN</Table.HeadCell>
                        <Table.HeadCell>AGAMA</Table.HeadCell>
                        <Table.HeadCell>BIDANG KEAHLIAN</Table.HeadCell>
                        <Table.HeadCell>PROVINSI</Table.HeadCell>
                        <Table.HeadCell>KABUPATEN</Table.HeadCell>
                        <Table.HeadCell>WILAYAH BINAAN</Table.HeadCell>
                        <Table.HeadCell>LOKASI KERJA (BPP)</Table.HeadCell>
                        {/* <Table.HeadCell className='flex justify-center'>
                        AKSI
                    </Table.HeadCell> */}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {ppls.map((ppl, index) => (
                            <Table.Row key={index} className="">
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{ppl?.ppl.name}</Table.Cell>
                                <Table.Cell>{ppl?.ppl.address}</Table.Cell>
                                <Table.Cell>{ppl?.ppl.gender}</Table.Cell>
                                <Table.Cell>{ppl?.ppl.religion}</Table.Cell>
                                <Table.Cell>{ppl?.ppl.areas_of_expertise}</Table.Cell>
                                <Table.Cell>{ppl?.ppl.provinsi}</Table.Cell>
                                <Table.Cell>{ppl?.ppl.regency}</Table.Cell>
                                <Table.Cell>
                                    {ppl?.ppl?.villages?.length > 0 ? ppl?.ppl?.villages?.map((village, index) => (
                                        <span key={index}>
                                            {village.name}{index < ppl?.ppl?.villages?.length - 1 ? ', ' : ''}
                                        </span>
                                    )) : '-'}
                                </Table.Cell>
                                <Table.Cell>{ppl?.ppl?.bpp?.name ?? '-'}</Table.Cell>
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
