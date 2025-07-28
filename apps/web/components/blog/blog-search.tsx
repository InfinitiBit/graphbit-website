'use client';

import { Search } from 'lucide-react';

interface BlogSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function BlogSearch({ searchTerm, onSearchChange }: BlogSearchProps) {
  return (
    <div className="relative mb-6 sm:mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="mobile-input pl-10 sm:pl-12 text-sm sm:text-base placeholder-gray-500 focus:placeholder-gray-400"
      />
    </div>
  );
}