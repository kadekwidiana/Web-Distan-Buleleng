import React, { useState, useEffect, useRef } from 'react';

const MultiSelect = ({ title, options, value, onChange, error, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (selectedValue) => {
        const newSelectedValues = value.includes(selectedValue)
            ? value.filter((v) => v !== selectedValue)
            : [...value, selectedValue];
        onChange(newSelectedValues);
    };

    const handleRemoveOption = (selectedValue) => {
        const newSelectedValues = value.filter((v) => v !== selectedValue);
        onChange(newSelectedValues);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e, option) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleOptionClick(option.value);
        }
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div ref={ref} className="relative w-full">
            <div
                className={`flex items-center justify-between w-full appearance-none rounded-md bg-transparent py-2 px-2 bg-white border cursor-pointer ${error ? 'border-red-500' : 'border-gray-400'} ${className}`}
                onClick={toggleDropdown}
            >
                <div className="flex justify-start items-center gap-2 overflow-auto">
                    {value.length > 0 ? (
                        value.map((val) => (
                            <span
                                key={val}
                                className="flex items-center gap-1 px-2 py-0.5 text-sm capitalize bg-white rounded border"
                            >
                                {options.find((option) => option.value === val)?.label}
                                <i
                                    className="fa-solid fa-circle-xmark text-gray-500 cursor-pointer hover:text-red-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveOption(val);
                                    }}
                                ></i>
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-900">{title ?? 'Select options...'}</span>
                    )}
                </div>
                <span className="ml-2">
                    {isOpen ? <i className="fa-solid fa-chevron-up text-gray-500"></i> : <i className="fa-solid fa-chevron-down text-gray-500"></i>}
                </span>
            </div>
            {isOpen && (
                <div className="absolute left-0 right-0 z-10 overflow-y-auto bg-white border rounded shadow max-h-60 border-gray-300">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-2 border-b border-gray-300 rounded-t-sm focus:ring-blue-500 focus:border-blue-400 focus:outline-none focus-visible:outline-none"
                        placeholder="Search..."
                    />
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`p-2 cursor-pointer capitalize ${value.includes(option.value) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                    onClick={() => handleOptionClick(option.value)}
                                    onKeyDown={(e) => handleKeyDown(e, option)}
                                    tabIndex={0}
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-gray-500">Data tidak di temukan.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
