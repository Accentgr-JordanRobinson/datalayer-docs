import React from 'react';
import { Copy } from 'lucide-react';

const CustomCode = ({ data = {} }) => {
  const {
    extension = 'Core',
    action_type = 'Custom Code',
    name = '',
    language
  } = data;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const InputField = ({ label, value, placeholder, icon = true }) => (
    <div className="mb-4">
      <label className="block text-md font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <input type="text" value={value} placeholder={placeholder} readOnly className="w-full px-3 py-2 placeholder-opacity-50 rounded-lg border !border-[var(--rp-c-bg-mute)]" />
        {icon && ( 
          <button onClick={() => copyToClipboard(value)} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-[var(--rp-c-brand)]" >
            <Copy size={16} className="opacity-50 hover:opacity-100" />
          </button>
        )} 
      </div>
    </div>
    );

  const RadioField = ({ label, value, options = ['JavaScript', 'HTML'] }) => (
    <div className="mb-4">
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

  return (
    <div className="m-4 p-4 border !border-[var(--rp-c-bg-mute)] rounded-lg">
      <InputField
        label="Extension"
        value={extension}
      />

      <InputField
        label="Action Type"
        value={action_type}
      />

      <InputField
        label="Name"
        value={name}
        placeholder="send_cart_add_to_klaviyo"
      />

      {language && (
        <RadioField
          label="Language"
          value={language}
        />
      )}
    </div>
  );
};

export default CustomCode;