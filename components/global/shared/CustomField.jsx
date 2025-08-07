import React from 'react';
import InputField from './InputField';

const CustomField = ({ fieldName, fieldValue }) => {
    return (
        <div className="flex gap-3 mb-3">
            <InputField
                value={fieldName}
                size="sm"
            />
            <InputField
                value={fieldValue}
                size="sm"
            />
        </div>
    );
};

export default CustomField;