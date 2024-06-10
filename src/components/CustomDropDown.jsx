import React, { useState } from 'react';

export const CustomDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const options = ['Personal', 'Community'];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div 
        className="bg-gray-200 p-[10px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer mt-1 text-black/50 font-semibold text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || 'Select Category'}
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-gray-200 border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <div 
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-400 text-black/50 font-semibold text-sm"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
