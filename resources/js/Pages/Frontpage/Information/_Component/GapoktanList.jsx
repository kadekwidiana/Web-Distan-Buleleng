import DataNotFound from '@/Components/Error/DataNotFound';
import { GROUP_STATUSES } from '@/Constant/Status';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { Link } from '@inertiajs/react';
import { Table } from 'flowbite-react';
import React from 'react';

export default function GapoktanList({ gapoktans }) {
    // console.log(gapoktans);
    return (
        <div className="flex flex-col w-auto overflow-x-auto pb-4">
            {gapoktans.length <= 0 && <DataNotFound />}
            {gapoktans.length > 0 &&
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
                        <Table.HeadCell>ALAMAT</Table.HeadCell>
                        <Table.HeadCell>USAHA PERTANIAN</Table.HeadCell>
                        <Table.HeadCell>UNIT USAHA</Table.HeadCell>
                        <Table.HeadCell>PERALATAN DAN MESIN</Table.HeadCell>
                        <Table.HeadCell>DESKRIPSI</Table.HeadCell>
                        <Table.HeadCell>DATA DIBUAT</Table.HeadCell>
                        <Table.HeadCell>DATA DIUPDATE</Table.HeadCell>
                        {/* <Table.HeadCell className='flex justify-center'>
                        AKSI
                    </Table.HeadCell> */}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {gapoktans.map((gapoktan, index) => (
                            <Table.Row key={index} className="">
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{gapoktan.name}</Table.Cell>
                                <Table.Cell>{gapoktan.leader}</Table.Cell>
                                <Table.Cell>{gapoktan.secretary}</Table.Cell>
                                <Table.Cell>{gapoktan.treasurer}</Table.Cell>
                                <Table.Cell>{gapoktan.number_of_members}</Table.Cell>
                                <Table.Cell>{gapoktan.since}</Table.Cell>
                                <Table.Cell>{GROUP_STATUSES.find((groupStatus) => gapoktan.status === groupStatus.value)?.label}</Table.Cell>
                                <Table.Cell>{gapoktan.address}</Table.Cell>
                                <Table.Cell>{gapoktan.farming_business}</Table.Cell>
                                <Table.Cell>
                                    {(() => {
                                        const businessUnit = JSON.parse(gapoktan.business_unit);
                                        const activeUnits = [];

                                        if (businessUnit?.sp_produksi) activeUnits.push('SP Produksi');
                                        if (businessUnit?.pemasaran) activeUnits.push('Pemasaran');
                                        if (businessUnit?.keuangan_mikro) activeUnits.push('Keuangan Mikro');

                                        return (
                                            <>
                                                {activeUnits.join(', ')}
                                                {businessUnit?.jasa_lainnya && `, Jasa Lainnya: ${businessUnit.jasa_lainnya}`}
                                            </>
                                        );
                                    })()}
                                </Table.Cell>
                                <Table.Cell>
                                    {(() => {
                                        const toolsAndMachines = JSON.parse(gapoktan.tools_and_machines);
                                        const toolDescriptions = [];

                                        if (toolsAndMachines?.traktor) toolDescriptions.push(`Traktor: ${toolsAndMachines.traktor}`);
                                        if (toolsAndMachines?.hand_traktor) toolDescriptions.push(`Hand Traktor: ${toolsAndMachines.hand_traktor}`);
                                        if (toolsAndMachines?.pompa_air) toolDescriptions.push(`Pompa Air: ${toolsAndMachines.pompa_air}`);
                                        if (toolsAndMachines?.mesin_penggiling_padi) toolDescriptions.push(`Mesin Penggiling Padi: ${toolsAndMachines.mesin_penggiling_padi}`);
                                        if (toolsAndMachines?.mesin_pengering) toolDescriptions.push(`Mesin Pengering: ${toolsAndMachines.mesin_pengering}`);
                                        if (toolsAndMachines?.mesin_pencacah) toolDescriptions.push(`Mesin Pencacah: ${toolsAndMachines.mesin_pencacah}`);
                                        if (toolsAndMachines?.lainnya) toolDescriptions.push(`Lainnya: ${toolsAndMachines.lainnya}`);

                                        return toolDescriptions.join(', ');
                                    })()}
                                </Table.Cell>
                                <Table.Cell>{gapoktan.description}</Table.Cell>
                                <Table.Cell>{formatDateToIndonesian(gapoktan?.created_at)}</Table.Cell>
                                <Table.Cell>{formatDateToIndonesian(gapoktan?.updated_at)}</Table.Cell>
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
