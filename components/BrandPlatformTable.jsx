import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';

const BrandPlatformTable = () => {
  const [brandFilter, setBrandFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Data from your table
  const data = [
    { brand: 'au:Dickies', GA4: '🟢', ME: '🟢', PI: '', TT: '', IN: '', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '', FS: '🟢', VE: '', DG: '', TF: '' },
    { brand: 'au:Dr Martens', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '🟢', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '🟢', FS: '🟢', VE: '', DG: '', TF: '🟢' },
    { brand: 'au:Herschel', GA4: '🟢', ME: '🟢', PI: '', TT: '', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '', FS: '🟢', VE: '', DG: '', TF: '' },
    { brand: 'au:Hype', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '🟢', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '🟢', FS: '🟢', VE: '🟢', DG: '', TF: '' },
    { brand: 'au:Merrell', GA4: '🟢', ME: '🟢', PI: '', TT: '', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '', FS: '🟢', VE: '', DG: '', TF: '' },
    { brand: 'au:TAF', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '🟢', IN: '', CF: '🟢', ZD: '🟢', BV: '', KL: '', UD: '🟢', FS: '🟢', VE: '', DG: '🟢', TF: '🟢' },
    { brand: 'au:Platypus', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '🟢', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '🟢', KL: '', UD: '🟢', FS: '🟢', VE: '', DG: '', TF: '' },
    { brand: 'au:Saucony', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '', FS: '🟢', VE: '🟢', DG: '', TF: '' },
    { brand: 'au:Skechers', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '🟢', IN: '', CF: '🟢', ZD: '🟢', BV: '🟢', KL: '', UD: '🟢', FS: '🟢', VE: '', DG: '', TF: '🟢' },
    { brand: 'au:Subtype', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '🟢', FS: '🟢', VE: '🟢', DG: '', TF: '' },
    { brand: 'au:Ugg', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '🟢', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '🟢', FS: '🟢', VE: '🟢', DG: '', TF: '' },
    { brand: 'au:Vans', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '🟢', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '🟢', FS: '🟢', VE: '', DG: '', TF: '🟢' },
    { brand: 'nz:Dr Martens', GA4: '🟢', ME: '🟢', PI: '', TT: '🟢', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '🟢', KL: '🟢', UD: '🟢', FS: '🟢', VE: '', DG: '', TF: '🟢' },
    { brand: 'nz:Herschel', GA4: '🟢', ME: '🟢', PI: '', TT: '', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '', FS: '🟢', VE: '', DG: '', TF: '' },
    { brand: 'nz:Hype', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '🟢', FS: '🟢', VE: '🟢', DG: '', TF: '' },
    { brand: 'nz:TAF', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '🟢', IN: '', CF: '🟢', ZD: '🟢', BV: '', KL: '', UD: '🟢', FS: '🟢', VE: '', DG: '🟢', TF: '' },
    { brand: 'nz:Platypus', GA4: '🟢', ME: '🟢', PI: '', TT: '🟢', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '🟢', KL: '', UD: '🟢', FS: '🟢', VE: '', DG: '', TF: '' },
    { brand: 'nz:Skechers', GA4: '🟢', ME: '🟢', PI: '', TT: '', IN: '', CF: '🟢', ZD: '🟢', BV: '🟢', KL: '', UD: '', FS: '🟢', VE: '', DG: '', TF: '🟢' },
    { brand: 'nz:Subtype', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '🟢', FS: '🟢', VE: '🟢', DG: '', TF: '' },
    { brand: 'nz:Ugg', GA4: '🟢', ME: '🟢', PI: '🟢', TT: '', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '', KL: '🟢', UD: '🟢', FS: '🟢', VE: '🟢', DG: '', TF: '' },
    { brand: 'nz:Vans', GA4: '🟢', ME: '🟢', PI: '', TT: '🟢', IN: '🟢', CF: '🟢', ZD: '🟢', BV: '🟢', KL: '🟢', UD: '🟢', FS: '🟢', VE: '', DG: '', TF: '🟢' },
  ];

  const platforms = [
    { key: 'GA4', name: 'Google Analytics' },
    { key: 'ME', name: 'Meta' },
    { key: 'PI', name: 'Pinterest' },
    { key: 'TT', name: 'TitTok' },
    { key: 'IN', name: 'Insider' },
    { key: 'CF', name: 'CommisionFactory' },
    { key: 'ZD', name: 'ZenDesk' },
    { key: 'BV', name: 'BaazarVoice' },
    { key: 'KL', name: 'Klaviyo' },
    { key: 'UD', name: 'Unidays' },
    { key: 'FS', name: 'Fullstory' },
    { key: 'VE', name: 'Google Vertex' },
    { key: 'DG', name: 'Digioh' },
    { key: 'TF', name: 'Trufit' }
  ];

  const countries = [
    { key: 'au', name: 'Australia' },
    { key: 'nz', name: 'New Zealand' }
  ];

  // Extract unique brand names (without country prefix)
  const uniqueBrands = [...new Set(data.map(row => row.brand.split(':')[1]))].sort();

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchesBrand = brandFilter === '' || 
        row.brand.toLowerCase().includes(brandFilter.toLowerCase());
      
      const matchesPlatform = platformFilter === '' || 
        row[platformFilter] === '🟢';
      
      const matchesCountry = countryFilter === '' ||
        row.brand.startsWith(countryFilter + ':');
      
      return matchesBrand && matchesPlatform && matchesCountry;
    });
  }, [brandFilter, platformFilter, countryFilter]);

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
    setBrandFilter('');
    setPlatformFilter('');
    setCountryFilter('');
  };

  const hasActiveFilters = brandFilter !== '' || platformFilter !== '' || countryFilter !== '';

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
              Showing {filteredData.length} of {data.length} brands
            </div>
          )}
        </div>

        {/* Filter Inputs */}
        {showFilters && (
          <div className="mt-4 p-4 bg-[var(--rp-c-bg-soft)] rounded-lg border !border-[var(--rp-c-divider-light)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Filter by Brand
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search brands..."
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className="w-full p-2 border !border-[var(--rp-c-divider-light)] bg-[var(--rp-c-bg-mute)] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Filter by Country
                </label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full p-2 border !border-[var(--rp-c-divider-light)] bg-[var(--rp-c-bg-mute)] rounded-lg"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country.key} value={country.key}>
                      {country.name}
                    </option>
                  ))}
                </select>
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
                Brand
              </th>
              {platforms.map(platform => (
                <th key={platform.key} className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider min-w-[70px]">
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
                  No brands match your current filters
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr key={row.brand} className={index % 2 === 0 ? 'bg-[var(--rp-c-bg)]' : 'bg-[var(--rp-c-bg-soft)]'}>
                  <td className="px-4 py-4 whitespace-nowrap sticky left-0 bg-inherit z-10">
                    <div className="text-sm font-medium rp-text-1">{row.brand}</div>
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

export default BrandPlatformTable;