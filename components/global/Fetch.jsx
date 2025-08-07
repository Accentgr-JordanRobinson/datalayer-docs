import React, { useState } from 'react';
import InputField from './shared/InputField';
import CustomField from './shared/CustomField';
import RadioField from './shared/RadioField';
import { Copy } from 'lucide-react';

const Fetch = ({ data = {} }) => {
    const [activeTab, setActiveTab] = useState(0);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };
  
    const {
        extension = 'Adobe Cloud Connector',
        action_type = 'Make Fetch Call',
        name = '',
        method = '',
        url = '',
        queries = {},
        headers = {},
        body = {},
        response_key,
    } = data;

    const tabsData = [
        { name: "Query Parameters", data: queries },
        { name: "Headers", data: headers },
        { name: "Body", data: body }
    ];

    const renderTabContent = (tabData, tabIndex) => {
        if (tabIndex === 2) {
            return (
                <div className="space-y-3">
                    <RadioField
                        style="flex gap-4 items-start"
                        label="Select the way you want to provide the body"
                        value='Raw'
                        options={['Raw', 'JSON Key-Value Pairs Editor']}
                    />
                    <code className="relative block min-h-24 p-4 rounded border text-sm font-mono whitespace-pre-wrap bg-[var(--rp-c-dark-light-1)]/20">
                        <button 
                            onClick={() => copyToClipboard(typeof tabData === 'object' ? JSON.stringify(tabData, null, 2) : tabData)}
                            className="absolute right-2 top-2 transform p-1 rounded hover:bg-[var(--rp-c-brand)]"
                        >
                            <Copy size={16} className="opacity-50 hover:opacity-100" />
                        </button>
                        {typeof tabData === 'object' ? JSON.stringify(tabData, null, 2) : tabData}
                    </code>
                </div>
            );
        }

        return (
            <div className="space-y-3">
                {Object.keys(tabData).length > 0 ? (
                    Object.entries(tabData).map(([key, value]) => (
                        <CustomField
                            key={key}
                            fieldName={key}
                            fieldValue={value}
                        />
                    ))
                ) : (
                    <CustomField
                        key=''
                        fieldName=''
                        fieldValue=''
                    />
                )}
            </div>
        );
    };

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
                />
            </div>
        
            <div className="m-4 p-4 border !border-[var(--rp-c-bg-mute)] rounded-lg bg-[var(--rp-c-dark)]/20">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Request</h2>
                </div>

                {/* Main Event Settings */}
                <div className="flex gap-4 mb-6">
                    <div className="w-1/4">
                        <InputField
                            label="Method (required)"
                            value={method}
                        />
                    </div>
                    <div className="w-3/4">
                        <InputField
                            label="URL (required)"
                            value={url}
                        />
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-[var(--rp-c-bg-mute)] mb-4">
                    <div className="flex gap-4 space-x-8">
                        {tabsData.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`pb-2 px-1 text-sm font-medium ${
                                activeTab === index
                                    ? 'text-[var(--rp-c-brand)] !border-b !border-[var(--rp-c-brand)]'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab !== 2 && (
                        <div className='flex w-full mb-2'>
                            <span className="!border-b !border-[var(--rp-c-bg-mute)] text-sm p-2 mb-2 w-1/2 font-medium">Name</span>
                            <span className='!border-b !border-[var(--rp-c-bg-mute)] text-sm p-2 mb-2 w-1/2 font-medium'>Value</span>
                        </div>
                    )}
                    {renderTabContent(tabsData[activeTab].data, activeTab)}
                </div>

                {/* Advanced */}
                <div className="my-6 pt-4 !border-t !border-[var(--rp-c-bg-mute)]">
                    <h2 className="text-xl font-semibold mb-2">Advanced</h2>
                </div>

                {/* Advanced Options */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="save_response"
                        checked={response_key}
                        readOnly
                        className="w-4 h-4 text-[var(--rp-c-brand)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--rp-c-brand)] focus:ring-2"
                    />
                    <label htmlFor="save_response" className="text-sm font-medium">
                        Save the request response
                    </label>
                </div>
                {response_key && (
                    <div className="w-1/3 mt-4">
                        <InputField
                            label="Response key"
                            value={response_key}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Fetch;