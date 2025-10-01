import { ChevronDown, Search } from 'lucide-react';
import React from 'react';
import { AlertFilters } from '../../../../shared/types';

interface SearchAndFiltersProps {
  filters: AlertFilters;
  onFiltersChange: (filters: AlertFilters) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      search: e.target.value,
    });
  };

  const handlePriorityChange = (priority: AlertFilters['priority']) => {
    onFiltersChange({
      ...filters,
      priority,
    });
  };

  const handleCategoryChange = (category: AlertFilters['category']) => {
    onFiltersChange({
      ...filters,
      category,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleSearchChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Priority Filter */}
      <div className="relative">
        <select
          value={filters.priority}
          onChange={e =>
            handlePriorityChange(e.target.value as AlertFilters['priority'])
          }
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="relative">
        <select
          value={filters.category}
          onChange={e =>
            handleCategoryChange(e.target.value as AlertFilters['category'])
          }
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Whiskey">Whiskey</option>
          <option value="Vodka">Vodka</option>
          <option value="Beer">Beer</option>
          <option value="Wine">Wine</option>
          <option value="Rum">Rum</option>
          <option value="Tequila">Tequila</option>
          <option value="Gin">Gin</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
