import InputLabel from '@/Components/Input/InputLabel';
import MultiSelect from '@/Components/Input/MultiSelect';
import { MONTHS } from '@/Constant/Month';
import React, { useState, useEffect } from 'react';

export default function AgriculturalCycleInputs({ datas, setDatas }) {
    // Membantu fungsi untuk mengurutkan nilai bulan
    const sortMonths = (months) => months.sort((a, b) => a - b);

    // Menginisialisasi state dengan bulan yang terurut
    const [selectedValues, setSelectedValues] = useState(() =>
        datas.reduce((acc, curr) => {
            acc[curr.name] = sortMonths(curr.months);
            return acc;
        }, {})
    );

    // Update selectedValues ketika datas props berubah
    useEffect(() => {
        setSelectedValues(() =>
            datas.reduce((acc, curr) => {
                acc[curr.name] = sortMonths(curr.months);
                return acc;
            }, {})
        );
    }, [datas]);

    const options = MONTHS.map(month => ({
        value: month.id,
        label: month.name
    }));

    const handleMultiSelectChange = (name, values) => {
        // Mengurutkan nilai yang dipilih berdasarkan id bulan
        const sortedValues = sortMonths(values);

        setSelectedValues(prevSelectedValues => {
            const newSelectedValues = {
                ...prevSelectedValues,
                [name]: sortedValues
            };

            // Memperbarui datas props melalui setDatas
            setDatas(datas.map(data =>
                data.name === name ? { ...data, months: sortedValues } : data
            ));

            return newSelectedValues;
        });
    };

    return (
        <div className='flex flex-col gap-1'>
            {datas.map((data, index) => (
                <label key={index} className="flex items-center gap-2">
                    <InputLabel className="text-nowrap text-sm font-normal">{data.name}</InputLabel>
                    <MultiSelect
                        title={'-- Pilih bulan --'}
                        onChange={(values) => handleMultiSelectChange(data.name, values)}
                        options={options}
                        value={selectedValues[data.name] || []}
                    />
                </label>
            ))}
        </div>
    );
}
