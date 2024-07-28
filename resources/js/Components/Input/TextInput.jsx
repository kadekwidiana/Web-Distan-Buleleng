import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, textRight, error, ...props }, ref) {
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
        <div className="relative w-full">
            <input
                {...props}
                type={type}
                className={
                    `w-full rounded-md bg-white border ${error ? 'border-red-500' : 'border-gray-400'} text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 ` +
                    className
                }
                ref={localRef}
            />
            {textRight &&
                <div className="absolute top-0 end-0 p-2.5 text-sm h-full text-white bg-gray-500 rounded-e-lg border border-gray-500">
                    <span>{textRight}</span>
                </div>
            }
        </div>
    );
});