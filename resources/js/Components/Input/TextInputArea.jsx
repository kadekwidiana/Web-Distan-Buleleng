import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const TextInputArea = forwardRef(({ className = '', isFocused = false, error, ...props }, ref) => {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <textarea
            {...props}
            ref={localRef}
            className={`w-full rounded-md bg-white border ${error ? 'border-red-500' : 'border-gray-400'} py-2 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 ` + className}
        ></textarea>
    );
});

export default TextInputArea;
