import React from 'react';
import { Copy } from 'lucide-react';

const Tile = ({ events = [] }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {events.map((event, index) => (
        <div
          key={index}
          className={`relative inline-flex items-center pl-4 pr-10 py-2 bg-[var(--rp-c-bg-mute)] !border-t-4 !border-blue-500 rounded text-sm font-mono whitespace-nowrap`}
        >
          {event}
          <button 
            onClick={() => copyToClipboard(event)} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded group hover:bg-[var(--rp-c-brand)]"
            title="Copy to clipboard"
          >
            <Copy size={14} className="opacity-50 group-hover:opacity-100" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Tile;