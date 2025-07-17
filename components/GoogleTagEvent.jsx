import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const GoogleTagEvent = ({ data = {} }) => {
  const [showCustomFields, setShowCustomFields] = useState(true);
  
  const {
    event_name = '',
    category = '',
    label = '',
    value = '',
    custom = {},
    extension = 'Google Global Site Tag (gtag)',
    action_type = 'Send an event',
    name = `send_${event_name}_to_ga4`,
  } = data;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const InputFieldAlt = ({ label, value, placeholder, icon = true }) => (
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

  const InputField = ({ label, value, placeholder, required = false, icon = true }) => (
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
                className="w-full px-3 py-2 placeholder-opacity-50 rounded-lg border !border-[var(--rp-c-bg-mute)]"
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

  const CustomField = ({ fieldName, fieldValue }) => (
    <div className="flex gap-3 mb-3">
        <div className="flex-1">
            <div className="relative">
                <input
                type="text"
                value={fieldName}
                readOnly
                className="w-full px-3 py-2 placeholder-opacity-50 rounded-lg border !border-[var(--rp-c-bg-mute)]"
                />
                <button 
                    onClick={() => copyToClipboard(fieldName)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-[var(--rp-c-brand)]"
                >
                    <Copy size={16} className="opacity-50 hover:opacity-100" />
                </button>
            </div>
      </div>
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={fieldValue}
            readOnly
            className="w-full px-3 py-2 placeholder-opacity-50 rounded-lg border !border-[var(--rp-c-bg-mute)]"
          />
          <button 
            onClick={() => copyToClipboard(fieldValue)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[var(--rp-c-brand)]"
          >
            <Copy size={16} className="opacity-50 hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="m-4 p-4 border !border-[var(--rp-c-bg-mute)] rounded-lg">
        <InputFieldAlt
          label="Extension"
          value={extension}
        />

        <InputFieldAlt
          label="Action Type"
          value={action_type}
        />

        <InputFieldAlt
          label="Name"
          value={name}
          placeholder="send_cart_add_to_klaviyo"
        />
      </div>
      <div className="m-4 p-4 border !border-[var(--rp-c-bg-mute)] rounded-lg">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Event Settings</h2>
          <p className="text-sm opacity-50">Set globally used settings for the event.</p>
        </div>

        {/* Main Event Settings */}
        <div className="space-y-4">
          <InputField
            label="Event Name (Action)"
            value={event_name}
            placeholder="The Event's name (action)"
            required
          />

          <InputField
            label="Event Category"
            value={category}
            placeholder="The event category"
          />

          <InputField
            label="Event Label"
            value={label}
            placeholder="The event label"
          />

          <InputField
            label="Event Value"
            value={value}
            placeholder="The event's value"
          />

        </div>

        {/* Additional Data Fields */}
        {Object.keys(custom).length > 0 && (
          <div className="mt-8 pt-6 border-t !border-[var(--rp-c-bg-mute)]">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Additional Data Fields</h3>
              
            </div>

            <div className="space-y-3">
              {Object.entries(custom).map(([key, value]) => (
                <CustomField
                  key={key}
                  fieldName={key}
                  fieldValue={value}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleTagEvent;