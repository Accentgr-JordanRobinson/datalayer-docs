import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';

const Table = ({ 
  data = [], 
  columns = [], 
  title = "Data Table",
  searchable = true,
  filterable = false,
  filterOptions = [],
  emptyMessage = "No data available"
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchesSearch = searchFilter === '' || 
        columns.some(col => 
          String(row[col.key] || '').toLowerCase().includes(searchFilter.toLowerCase())
        );
      
      const matchesColumnFilter = columnFilter === '' || 
        (filterOptions.length > 0 && row[columnFilter]);
      
      return matchesSearch && matchesColumnFilter;
    });
  }, [data, columns, searchFilter, columnFilter, filterOptions]);

  const clearFilters = () => {
    setSearchFilter('');
    setColumnFilter('');
  };

  const hasActiveFilters = searchFilter !== '' || columnFilter !== '';

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      
      {/* Filter Controls */}
      {(searchable || filterable) && (
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
                Showing {filteredData.length} of {data.length} items
              </div>
            )}
          </div>

          {/* Filter Inputs */}
          {showFilters && (
            <div className="mt-4 p-4 bg-[var(--rp-c-bg-soft)] rounded-lg border !border-[var(--rp-c-divider-light)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchable && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search all columns..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="w-full p-2 border !border-[var(--rp-c-divider-light)] bg-[var(--rp-c-bg-mute)] rounded-lg"
                      />
                    </div>
                  </div>
                )}
                
                {filterable && filterOptions.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Filter by Column
                    </label>
                    <select
                      value={columnFilter}
                      onChange={(e) => setColumnFilter(e.target.value)}
                      className="w-full p-2 border !border-[var(--rp-c-divider-light)] bg-[var(--rp-c-bg-mute)] rounded-lg"
                    >
                      <option value="">All Items</option>
                      {filterOptions.map(option => (
                        <option key={option.key} value={option.key}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Data Table */}
      <div className="overflow-x-auto border !border-[var(--rp-c-divider-light)] rounded-lg">
        <table className="w-full">
          <thead className="bg-[var(--rp-c-bg-mute)]">
            <tr>
              {columns.map(column => (
                <th 
                  key={column.key} 
                  className={`px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                    column.align === 'center' ? 'text-center' : 
                    column.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className={`flex ${
                    column.align === 'center' ? 'justify-center items-center' : 
                    column.align === 'right' ? 'justify-end items-center' : 'items-center'
                  }`}>
                    <span className="text-md">{column.header}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--rp-c-divider)]">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr key={row.id || index} className={index % 2 === 0 ? 'bg-[var(--rp-c-bg)]' : 'bg-[var(--rp-c-bg-soft)]'}>
                  {columns.map(column => (
                    <td 
                      key={column.key} 
                      className={`px-6 py-4 whitespace-nowrap ${
                        column.align === 'center' ? 'text-center' : 
                        column.align === 'right' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div className="text-sm font-medium rp-text-1">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
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

export default Table;