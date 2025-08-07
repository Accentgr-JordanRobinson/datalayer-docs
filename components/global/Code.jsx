import React from 'react';
import InputField from './shared/InputField';
import RadioField from './shared/RadioField';

const Code = ({ data = {} }) => {
  const {
    extension = 'Core',
    type = 'Custom Code',
    type_label = 'Action Type',
    name = '',
    language
  } = data;



  return (
    <div className="m-4 p-4 border !border-[var(--rp-c-bg-mute)] bg-[var(--rp-c-dark)]/30 rounded-lg">
      <InputField
        label="Extension"
        value={extension}
      />

      <InputField
        label={type_label}
        value={type}
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

export default Code;