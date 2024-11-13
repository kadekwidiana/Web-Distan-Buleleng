import { Accordion } from 'flowbite-react';
import React from 'react';

export default function IntructionsUploadImage({ isOutreachActivity = false }) {
    return (
        <Accordion>
            <Accordion.Panel>
                <Accordion.Title> <h3 className="text-lg font-semibold">Petunjuk Pengunggahan Foto</h3></Accordion.Title>
                <Accordion.Content>
                    {isOutreachActivity &&
                        <p className="text-sm font-normal text-gray-600 mb-2">
                            Untuk memastikan kualitas yang optimal saat ekspor ke PDF, disarankan untuk mengunggah foto dengan orientasi <strong>landscape</strong> (horizontal).
                        </p>
                    }
                    <p className="text-sm font-normal text-gray-600 mb-2">
                        Foto pertama yang Anda unggah akan digunakan untuk mendeteksi lokasi koordinat secara otomatis. Pastikan foto tersebut jelas dan memiliki metadata EXIF yang valid agar proses deteksi lokasi berjalan dengan baik.
                    </p>
                    <p className="text-sm font-normal text-gray-600">
                        Jika foto pertama tidak memiliki informasi lokasi atau metadata EXIF yang valid, Anda dapat menambahkan lokasi secara manual pada form yang tersedia.
                    </p>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}
