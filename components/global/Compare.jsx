import React from 'react';
import InputField from './shared/InputField';

const Compare = ({ data = {} }) => {
    const {
        left = '',
        right = '',
        op = '',
        logic = 'Regular',
        extension = 'Core',
        condition_type = 'Value Comparison',
        name = '',
    } = data;

    return (
        <div className='flex p-4 gap-4'>
            <div className="w-1/2 p-4 border !border-[var(--rp-c-bg-mute)] bg-[var(--rp-c-dark)]/30 rounded-lg">
                <InputField
                    label="Logic Type"
                    value={logic}
                    size="lg"
                />

                <InputField
                    label="Extension"
                    value={extension}
                    size="lg"
                />

                <InputField
                    label="Condition Type"
                    value={condition_type}
                    size="lg"
                />

                <InputField
                    label="Name"
                    value={name}
                    size="lg"
                />
            </div>

            <div className="w-1/2 p-4 border !border-[var(--rp-c-bg-mute)] bg-[var(--rp-c-dark)]/20 rounded-lg">
                <InputField
                    label="Left Operand (required)"
                    value={left}
                />

                <InputField
                    label="Operator"
                    value={op}
                />

                <InputField
                    label="Right Operand"
                    value={right}
                />
            </div>
        </div>
    );
};

export default Compare;