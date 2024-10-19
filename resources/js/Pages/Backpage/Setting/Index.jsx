import BannerWelcomeAdmin from '@/Components/Banner/WelcomeAdmin';
import CardMenuDashboard from '@/Components/Card/MenuDashboard';
import BackpageLayout from '@/Layouts/BackpageLayout';
import { Head, usePage } from '@inertiajs/react';
import { Banner } from 'flowbite-react';
import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Button from '@/Components/Button/Button';
import ButtonSetting from './ButtonSetting';
import { useStore } from '@/Store/Index.store';
import { useShallow } from 'zustand/react/shallow';


export default function Dashboard() {
    const { localSetting, setLocalSetting } = useStore(
        useShallow((state) => (
            {
                localSetting: state.localSetting,
                setLocalSetting: state.setLocalSetting
            }
        )),
    );

    const toggleGeolocation = () => {
        setLocalSetting({ isGeolocation: !localSetting.isGeolocation });
    };

    const toggleDisplayDataSpatials = () => {
        setLocalSetting({ isDisplayDataSpatials: !localSetting.isDisplayDataSpatials });
    };

    return (
        <BackpageLayout>
            <Head title="Pengaturan" />
            <div className="flex flex-col gap-2">
                <ButtonSetting onClick={toggleGeolocation} label={'Geolokasi'} status={localSetting.isGeolocation} />
                <ButtonSetting onClick={toggleDisplayDataSpatials} label={'Tampilkan Data Spasial di Input Lahan'} status={localSetting.isDisplayDataSpatials} />
            </div>
        </BackpageLayout>
    );
}
