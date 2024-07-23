import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function InputSelect(
    { value, className = '', isFocused = false, error, children, ...props }, ref) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <select
            {...props}
            ref={localRef}
            className={`w-full appearance-none rounded-md bg-transparent py-2 bg-white border ${error ? 'border-red-500' : 'border-gray-400'} text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 ` + className}
        >
            {value ? value : children}
        </select>
    );
});