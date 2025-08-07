import React from 'react';
import InputField from './shared/InputField';

const DataPath = ({ elements = [] }) => {
    return (
        <div className="flex flex-col gap-3 mb-3">
            <div className='flex w-full'>
                <span className="!border-b !border-[var(--rp-c-bg-mute)] p-2 mb-2 w-1/2 text-md font-medium">Name</span>
                <span className='!border-b !border-[var(--rp-c-bg-mute)] p-2 mb-2 w-1/2 text-md font-medium'>Path</span>
            </div>
            {elements.map((element, index) => (
                <div  className='flex w-full gap-3 mb-3'>
                    <InputField
                        value={element.name}
                        size="sm"
                    />
                    <InputField
                        value={element.path}
                        size="sm"
                    />
                </div>
            ))}
        </div>
    );
};

export default DataPath;