import { Toast } from '@/Components/Alert/Toast';
import Button from '@/Components/Button/Button';
import { HTTP_STATUS_MESSAGES } from '@/Constant/HTTPStartusMessages';
import React, { useState } from 'react';

export default function ButtonSynchronization({ label, url, ...props }) {
    const [isLoading, setIsloading] = useState(false);

    const handleSynchronization = async () => {
        setIsloading(true);
        try {
            const res = await axios.get(url);
            if (res.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: `Data ${label ?? ''} berhasil di perbarui`,
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: HTTP_STATUS_MESSAGES[res.status],
                });
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: HTTP_STATUS_MESSAGES.defaultErrorMessage,
            });
        } finally {
            setIsloading(false);
        }
    };
    return (
        <div className="grid grid-cols-6 justify-start gap-4 w-full sm:w-1/2">
            <div className='col-span-3 flex justify-between items-center text-base'>
                <p>{label}</p>
                <p>:</p>
            </div>
            <Button
                {...props}
                disabled={isLoading}
                onClick={handleSynchronization}
                className={`col-span-2`}>
                {isLoading ? 'Singkronkan Data...' : 'Singkronkan Data'}
            </Button>
        </div>
    );
}
