import Button from '@/Components/Button/Button';
import React from 'react';

export default function ButtonSetting({ label, status, ...props }) {
    return (
        <div className="grid grid-cols-6 justify-start gap-4 w-full sm:w-1/2">
            <div className='col-span-3 flex justify-between items-center text-base'>
                <p>{label}</p>
                <p>:</p>
            </div>
            <Button
                {...props}
                className={`col-span-1 ${status ? '' : 'bg-red-500 hover:bg-red-600'}`}>
                {status ? 'On' : 'Off'}
            </Button>
        </div>
    );
}
