import BackpageLayout from '@/Layouts/BackpageLayout';
import { Head } from '@inertiajs/react';
import ButtonSynchronization from './ButtonSynchronization';


export default function SynchronizationPage() {
    return (
        <BackpageLayout>
            <Head title="Singkronasi Data" />
            <div className="flex flex-col gap-2">
                <ButtonSynchronization label={'Rekap Pertanian Kecamatan'} url={'/generate-recap-districts'} />
                <ButtonSynchronization label={'Rekap Pertanian Desa'} url={'/generate-recap-villages'} />
            </div>
        </BackpageLayout>
    );
}
