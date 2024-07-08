export default function Button({ value, className = '', children, ...props }) {
    return (
        <button {...props}
            className={"inline-flex items-center justify-center gap-2 rounded-md bg-blue-500 px-8 py-2 text-center font-medium text-white hover:bg-opacity-90 hover:bg-blue-600 " + className}>
            {value ? value : children}
        </button>
    );
}