import React from 'react';
import InputField from './shared/InputField';

const GooglePage = () => {
    return (
        <div className="m-4 p-4 border !border-[var(--rp-c-bg-mute)] rounded-lg bg-[var(--rp-c-dark)]/30">
            <InputField
                label="Extension"
                value="Google Global Site Tag (gtag)"
            />

            <InputField
                label="Action Type"
                value="Send a page view"
            />

            <InputField
                label="Name"
                value="send_ga4_page_view"
            />
        </div>
    );
};

export default GooglePage;