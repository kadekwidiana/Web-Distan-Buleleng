import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

export default forwardRef(function TextInputPassword(
    { type = 'text', className = '', isFocused = false, textRight, error, ...props }, ref) {
    const localRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative w-full">
            <input
                {...props}
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                className={
                    `w-full rounded-md bg-white border ${error ? 'border-red-500' : 'border-gray-400'} text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 ` +
                    className
                }
                ref={localRef}
            />
            {type === 'password' && (
                <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute top-0 right-0 p-2.5 text-sm h-full text-gray-700 focus:outline-none"
                >
                    {showPassword ? (
                        <i className="fa-regular fa-eye"></i>
                    ) : (
                        <i className="fa-regular fa-eye-slash"></i>
                    )}
                </button>
            )}
            {textRight && (
                <div className="absolute top-0 right-0 p-2.5 text-sm h-full text-white">
                    <span>{textRight}</span>
                </div>
            )}
        </div>
    );
});
