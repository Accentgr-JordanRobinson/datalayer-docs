import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';

const AnalyticsTable = () => {
  const [eventFilter, setEventFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Data from your table
  const data = [
    { event: 'account_create-complete', GA4: '🟢', KL: '', VE: '' },
    { event: 'account_create-start', GA4: '', KL: '', VE: '' },
    { event: 'account_login-start', GA4: '', KL: '', VE: '' },
    { event: 'account_login-complete', GA4: '🟢', KL: '', VE: '' },
    { event: 'account_logout', GA4: '', KL: '', VE: '' },
    { event: 'blog_post', GA4: '', KL: '', VE: '' },
    { event: 'blog_home', GA4: '', KL: '', VE: '' },
    { event: 'cart_add', GA4: '🟢', KL: '🟢', VE: '🟢' },
    { event: 'cart_remove', GA4: '🟢', KL: '', VE: '' },
    { event: 'cart_update', GA4: '', KL: '', VE: '' },
    { event: 'cart_view-full', GA4: '🟢', KL: '🟢', VE: '' },
    { event: 'cart_view-mini', GA4: '🟢', KL: '🟢', VE: '🟢' },
    { event: 'checkout_start', GA4: '🟢', KL: '🟢', VE: '' },
    { event: 'checkout_step2', GA4: '🟢', KL: '', VE: '' },
    { event: 'checkout_step3', GA4: '🟢', KL: '', VE: '' },
    { event: 'member_view', GA4: '🟢', KL: '', VE: '🟢' },
    { event: 'order_success', GA4: '🟢', KL: '🟢', VE: '🟢' },
    { event: 'page_default', GA4: '🟢', KL: '', VE: '🟢' },
    { event: 'product_listing-filters', GA4: '', KL: '', VE: '' },
    { event: 'product_listing-sort', GA4: '', KL: '', VE: '' },
    { event: 'product_listing-view', GA4: '🟢', KL: '🟢', VE: '' },
    { event: 'product_size-select', GA4: '', KL: '', VE: '' },
    { event: 'product_view', GA4: '🟢', KL: '🟢', VE: '🟢' },
    { event: 'site_errors', GA4: '🟢', KL: '', VE: '' },
    { event: 'site_search-results', GA4: '🟢', KL: '🟢', VE: '🟢' },
    { event: 'store-locator_details', GA4: '🟢', KL: '', VE: '🟢' },
    { event: 'store-locator_view', GA4: '🟢', KL: '', VE: '🟢' },
    { event: 'add_to-wishlist', GA4: '🟢', KL: '', VE: '' },
    { event: 'wishlist_home', GA4: '🟢', KL: '', VE: '' },
  ];

  const platforms = [
    { key: 'GA4', name: 'Google Analytics' },
    { key: 'KL', name: 'Klaviyo' },
    { key: 'VE', name: 'Google Vertex' }
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
    const ga4Count = filteredData.filter(row => row.GA4 === '🟢').length;
    const klCount = filteredData.filter(row => row.KL === '🟢').length;
    const veCount = filteredData.filter(row => row.VE === '🟢').length;
    
    return { total, ga4Count, klCount, veCount };
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
        <table className="w-full">
          <thead className="bg-[var(--rp-c-bg-mute)]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Event Name
              </th>
              {platforms.map(platform => (
                <th key={platform.key} className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  <div className="flex flex-col items-center">
                    <span className="text-md mb-1">{platform.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--rp-c-divider)]">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center">
                  No events match your current filters
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr key={row.event} className={index % 2 === 0 ? 'bg-[var(--rp-c-bg)]' : 'bg-[var(--rp-c-bg-soft)]'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium rp-text-1">{row.event}</div>
                  </td>
                  {platforms.map(platform => (
                    <td key={platform.key} className="px-6 py-4 whitespace-nowrap text-center">
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

export { AnalyticsTable };