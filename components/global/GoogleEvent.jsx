import React, { useState } from 'react';
import InputField from './shared/InputField';
import CustomField from './shared/CustomField';

const GoogleTag = ({ data = {} }) => {
  const [showCustomFields, setShowCustomFields] = useState(true);
  
  const {
    event_name = '',
    category = '',
    label = '',
    value = '',
    custom = {},
    extension = 'Google Global Site Tag (gtag)',
    action_type = 'Send an event',
    name = '',
  } = data;

  return (
    <div>
      <div className="m-4 p-4 border !border-[var(--rp-c-bg-mute)] rounded-lg bg-[var(--rp-c-dark)]/30">
        <InputField
          label="Extension"
          value={extension}
          size="lg"
        />

        <InputField
          label="Action Type"
          value={action_type}
          size="lg"
        />

        <InputField
          label="Name"
          value={name}
          placeholder="send_cart_add_to_klaviyo"
          size="lg"
        />
      </div>
      <div className="m-4 p-4 border !border-[var(--rp-c-bg-mute)] rounded-lg bg-[var(--rp-c-dark)]/20">
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
            size="md"
          />

          <InputField
            label="Event Category"
            value={category}
            placeholder="The event category"
            size="md"
          />

          <InputField
            label="Event Label"
            value={label}
            placeholder="The event label"
            size="md"
          />

          <InputField
            label="Event Value"
            value={value}
            placeholder="The event's value"
            size="md"
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

export default GoogleTag;