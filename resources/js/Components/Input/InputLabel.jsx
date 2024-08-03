import { LabelHTMLAttributes } from 'react';

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`mb-0.5 block font-medium text-gray-800 ` + className}>
            {value ? value : children}
        </label>
    );
}