import React from 'react';
import InputField from './shared/InputField';

const EFCode = ({ data = {} }) => {
  const {
    extension = 'Core',
    action_type = 'Custom Code',
    name = '',
    key = ''
  } = data;

  return (
    <div>
        <div className="m-4 p-4 border !border-[var(--rp-c-bg-mute)] rounded-lg bg-[var(--rp-c-dark)]/30">
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
        </div>
        <div className="mt-8 pt-4 px-4 border-t !border-[var(--rp-c-bg-mute)]">
            <InputField
                label="Key Name (required)"
                value={key}
            />
        </div>
    </div>
  );
};

export default EFCode;