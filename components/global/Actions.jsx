import React, { useState, Children, cloneElement } from 'react';
import { Copy } from 'lucide-react';

const Actions = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Extract tab data from children
  const tabs = Children.toArray(children);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4">
      {/* Action triggers */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`cursor-pointer relative inline-flex items-center pl-4 pr-10 py-2 bg-[var(--rp-c-bg-mute)] !border-t-4 !border-yellow-500 rounded text-sm font-mono whitespace-nowrap transition-opacity ${
              activeTab === index ? 'opacity-100' : 'opacity-70 hover:opacity-90'
            }`}
          >
            {tab.props.data}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(tab.props.data);
              }} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded group hover:bg-[var(--rp-c-brand)]"
              title="Copy to clipboard"
            >
              <Copy size={14} className="opacity-50 group-hover:opacity-100" />
            </button>
          </div>
        ))}
      </div>

      {/* Content area */}
      <div className='m-4 rounded-lg bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-lg !border !border-white/20 shadow-xl'>
        {tabs[activeTab] && cloneElement(tabs[activeTab], {
          key: activeTab,
          isActive: true
        })}
      </div>
    </div>
  );
};

export default Actions;