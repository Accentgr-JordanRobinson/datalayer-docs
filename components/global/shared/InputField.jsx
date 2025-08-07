import React from 'react';
import { Copy } from 'lucide-react';

const InputField = ({ label, value, placeholder, required = false, icon = true, size = 'lg' }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    // lg - Full width stacked layout (label above input)
    if (size === 'lg') {
        return (
            <div className="mb-4">
                <label className="block text-md font-medium mb-2">
                    {label}
                </label>
                <div className="relative">
                    <input 
                        type="text" 
                        value={value} 
                        placeholder={placeholder} 
                        readOnly 
                        className="w-full px-3 py-2 placeholder-opacity-50 rounded-lg border !border-[var(--rp-c-brand-tint)] bg-[var(--rp-c-dark-light-1)]/20" 
                    />
                    {icon && ( 
                        <button 
                            onClick={() => copyToClipboard(value)} 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-[var(--rp-c-brand)]" 
                        >
                            <Copy size={16} className="opacity-50 hover:opacity-100" />
                        </button>
                    )} 
                </div>
            </div>
        );
    }

    // md - Side-by-side layout (1/3 label, 2/3 input)
    if (size === 'md') {
        return (
            <div className="mb-4 flex flex-row">
                <div className="w-1/3">
                    <label className="block text-md font-medium mb-2">
                        {label} {required && <span className="text-red-400">*</span>}
                    </label>
                </div>
                <div className="w-2/3">
                    <div className="relative">
                        <input
                            type="text"
                            value={value}
                            placeholder={placeholder}
                            readOnly
                            className="w-full px-3 py-2 placeholder-opacity-50 rounded-lg border !border-[var(--rp-c-brand-tint)] bg-[var(--rp-c-dark-light-1)]/20"
                        />
                        {icon && (
                            <button 
                                onClick={() => copyToClipboard(value)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-[var(--rp-c-brand)]"
                            >
                                <Copy size={16} className="opacity-50 hover:opacity-100" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // sm - Split layout (50/50) - no label, just input
    return (
        <div className="flex-1">
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    readOnly
                    className="w-full px-3 py-2 placeholder-opacity-50 rounded-lg border !border-[var(--rp-c-brand-tint)] bg-[var(--rp-c-dark-light-1)]/20"
                />
                {icon && (
                    <button 
                        onClick={() => copyToClipboard(value)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-[var(--rp-c-brand)]"
                    >
                        <Copy size={16} className="opacity-50 hover:opacity-100" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputField;