import React from 'react';

const RadioField = ({ label, value, options = ['JavaScript', 'HTML'], style }) => {
    return (
        <div className={`mb-4 ${style}`}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <div className="flex gap-6">
                {options.map(option => (
                <label key={option} className="flex items-center cursor-pointer">
                    <div className="relative">
                    <input
                        type="radio"
                        name="language"
                        value={option}
                        checked={value === option}
                        readOnly
                        className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full !border transition-colors ${
                        value === option 
                        ? '!border-[var(--rp-c-brand-light)] bg-[var(--rp-c-brand)]' 
                        : '!border-[var(--rp-c-dark-light-5)] bg-[var(--rp-c-bg-mute)]'
                    }`}>
                        {value === option && (
                        <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                    </div>
                    </div>
                    <span className="ml-2 text-sm text-gray-300">{option}</span>
                </label>
                ))}
            </div>
        </div>
    );
};

export default RadioField;