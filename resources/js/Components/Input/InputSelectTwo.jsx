import React, { useEffect, useRef, useState } from 'react';

const SelectTwo = ({ entities, selectedEntityId, setSelectedEntityId, otherEntity, placeholder, label, error }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEntities, setFilteredEntities] = useState(entities);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setFilteredEntities(
            entities.filter((entity) =>
                entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (otherEntity && entity[otherEntity]?.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        );
    }, [searchTerm, entities, otherEntity]);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen) {
            setTimeout(() => {
                dropdownRef.current.querySelector('input').focus();
            }, 0);
        }
    };

    const handleOptionSelect = (id) => {
        setSelectedEntityId(id);
        setIsDropdownOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (!isDropdownOpen) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedOptionIndex((prevIndex) =>
                prevIndex === filteredEntities.length - 1 ? 0 : prevIndex + 1
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedOptionIndex((prevIndex) =>
                prevIndex === 0 ? filteredEntities.length - 1 : prevIndex - 1
            );
        } else if (e.key === 'Enter') {
            e.preventDefault();
            handleOptionSelect(filteredEntities[focusedOptionIndex].id);
        }
    };

    const selectedEntity = entities.find((entity) => Number(entity.id) === Number(selectedEntityId));

    const selectedEntityLabel = selectedEntity
        ? `${selectedEntity.name} ${otherEntity && selectedEntity[otherEntity] ? `(${selectedEntity[otherEntity]})` : ''}`
        : label ?? '-- Select entity --';

    return (
        <div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
            <button
                type='button'
                className={`flex items-center justify-between w-full appearance-none rounded-md bg-transparent py-2 px-2 bg-white border cursor-pointer ${error ? 'border-red-500' : 'border-gray-400'}`}
                onClick={handleDropdownToggle}
            >
                {selectedEntityLabel}
                <span className="ml-2">
                    {isDropdownOpen ? <i className="fa-solid fa-chevron-up text-gray-500"></i> : <i className="fa-solid fa-chevron-down text-gray-500"></i>}
                </span>
            </button>
            {isDropdownOpen && (
                <div className="absolute left-0 right-0 z-10 overflow-y-auto bg-white border rounded shadow max-h-60 border-gray-300">
                    <input
                        type="text"
                        placeholder={placeholder ?? "Search..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border-b border-gray-300 rounded-t-sm focus:ring-blue-500 focus:border-blue-400 focus:outline-none focus-visible:outline-none"
                    />
                    <div className="max-h-48 overflow-y-auto">
                        {filteredEntities.length > 0 ? (
                            filteredEntities.map((entity, index) => (
                                <div
                                    key={entity.id}
                                    className={`p-2 cursor-pointer ${Number(entity.id) === Number(selectedEntityId) ? 'bg-gray-200' : 'hover:bg-gray-200'
                                        } ${index === focusedOptionIndex ? 'bg-blue-100' : ''}`}
                                    onClick={() => handleOptionSelect(entity.id)}
                                >
                                    {`${entity.name}${otherEntity && entity[otherEntity] ? ` (${entity[otherEntity]})` : ''}`}
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

export default SelectTwo;
