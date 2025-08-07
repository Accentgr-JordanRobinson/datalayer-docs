import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';

const MarketingTable = () => {
  const [eventFilter, setEventFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Data from your table
  const data = [
    { event: 'account_create-complete', ME: '🟢', PI: '🟢', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'account_create-start', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'account_login-start', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'account_login-complete', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'account_logout', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'blog_post', ME: '', PI: '🟢', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'blog_home', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'cart_add', ME: '🟢', PI: '🟢', TT: '🟢', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'cart_remove', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'cart_update', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'cart_view-full', ME: '', PI: '', TT: '', IN: '🟢', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'cart_view-mini', ME: '', PI: '', TT: '', IN: '🟢', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'checkout_start', ME: '🟢', PI: '🟢', TT: '🟢', IN: '🟢', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'checkout_step2', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'checkout_step3', ME: '🟢', PI: '🟢', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'member_view', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'order_success', ME: '🟢', PI: '🟢', TT: '🟢', IN: '🟢', CF: '🟢', ZD: '', BV: '🟢', UD: '🟢', FS: '', DG: '', TF: '' },
    { event: 'page_default', ME: '🟢', PI: '🟢', TT: '🟢', IN: '🟢', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'product_listing-filters', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'product_listing-sort', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'product_listing-view', ME: '🟢', PI: '🟢', TT: '🟢', IN: '🟢', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'product_size-select', ME: '🟢', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'product_view', ME: '🟢', PI: '🟢', TT: '🟢', IN: '🟢', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'site_errors', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'site_search-results', ME: '🟢', PI: '🟢', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'store-locator_details', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'store-locator_view', ME: '🟢', PI: '🟢', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'add_to-wishlist', ME: '🟢', PI: '🟢', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
    { event: 'wishlist_home', ME: '', PI: '', TT: '', IN: '', CF: '', ZD: '', BV: '', UD: '', FS: '', DG: '', TF: '' },
  ];

  const platforms = [
    { key: 'ME', name: 'Meta' },
    { key: 'PI', name: 'Pinterest' },
    { key: 'TT', name: 'TikTok' },
    { key: 'IN', name: 'Insider' },
    { key: 'CF', name: 'CommissionFactory' },
    { key: 'ZD', name: 'ZenDesk' },
    { key: 'BV', name: 'BaazarVoice' },
    { key: 'UD', name: 'Unidays' },
    { key: 'FS', name: 'Fullstory' },
    { key: 'DG', name: 'Digioh' },
    { key: 'TF', name: 'Trufit' }
  ];

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchesEvent = eventFilter === '' || 
        row.event.toLowerCase().includes(eventFilter.toLowerCase());
      
      const matchesPlatform = platformFilter === '' || 
        row[platformFilter] === '🟢';
      
      return matchesEvent && matchesPlatform;
    });
  }, [eventFilter, platformFilter]);

  // Get statistics
  const stats = useMemo(() => {
    const total = filteredData.length;
    const platformCounts = platforms.reduce((acc, platform) => {
      acc[platform.key] = filteredData.filter(row => row[platform.key] === '🟢').length;
      return acc;
    }, {});
    
    return { total, ...platformCounts };
  }, [filteredData]);

  const clearFilters = () => {
    setEventFilter('');
    setPlatformFilter('');
  };

  const hasActiveFilters = eventFilter !== '' || platformFilter !== '';

  return (
    <div className="w-full max-w-7xl mx-auto p-6">

      {/* Filter Controls */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-[var(--rp-c-brand)]"
          >
            <Filter size={16} />
            Filters
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-3 py-2 bg-red-100 !text-red-700 hover:bg-red-200 rounded-lg transition-colors text-sm"
            >
              <X size={14} />
              Clear Filters
            </button>
          )}
          
          {hasActiveFilters && (
            <div className="text-sm">
              Showing {filteredData.length} of {data.length} events
            </div>
          )}
        </div>

        {/* Filter Inputs */}
        {showFilters && (
          <div className="mt-4 p-4 bg-[var(--rp-c-bg-soft)] rounded-lg border !border-[var(--rp-c-divider-light)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Filter by Event Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={eventFilter}
                    onChange={(e) => setEventFilter(e.target.value)}
                    className="w-full p-2 border !border-[var(--rp-c-divider-light)] bg-[var(--rp-c-bg-mute)] rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Filter by Platform
                </label>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="w-full p-2 border !border-[var(--rp-c-divider-light)] bg-[var(--rp-c-bg-mute)] rounded-lg"
                >
                  <option value="">All Platforms</option>
                  {platforms.map(platform => (
                    <option key={platform.key} value={platform.key}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto border !border-[var(--rp-c-divider-light)] rounded-lg">
        <table className="w-full min-w-max">
          <thead className="bg-[var(--rp-c-bg-mute)]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider sticky left-0 bg-[var(--rp-c-bg-mute)] z-10">
                Event Name
              </th>
              {platforms.map(platform => (
                <th key={platform.key} className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider min-w-[80px]">
                  <div className="flex flex-col items-center">
                    <span className="text-sm">{platform.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--rp-c-divider)]">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={platforms.length + 1} className="px-6 py-8 text-center">
                  No events match your current filters
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr key={row.event} className={index % 2 === 0 ? 'bg-[var(--rp-c-bg)]' : 'bg-[var(--rp-c-bg-soft)]'}>
                  <td className="px-4 py-4 whitespace-nowrap sticky left-0 bg-inherit z-10">
                    <div className="text-sm font-medium rp-text-1">{row.event}</div>
                  </td>
                  {platforms.map(platform => (
                    <td key={platform.key} className="px-3 py-4 whitespace-nowrap text-center">
                      <div className="text-md">
                        {row[platform.key] === '🟢' ? (
                          <span className="text-green-500">🟢</span>
                        ) : (
                          <span className="rp-c-gray">○</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { MarketingTable };