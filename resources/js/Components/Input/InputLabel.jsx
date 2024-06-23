import { LabelHTMLAttributes } from 'react';

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`mb-2.5 block font-medium text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}