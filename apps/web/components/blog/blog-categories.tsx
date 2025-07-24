
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

interface BlogCategoriesProps {
  categories: string[];
}

export function BlogCategories({ categories }: BlogCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Filter className="h-4 w-4" />
        <span>Filter by:</span>
      </div>
      
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>

      {categories.slice(0, 6).map((category) => (
        <button
          key={category}
          onClick={() => toggleCategory(category)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
      
      {categories.length > 6 && (
        <Badge variant="secondary" className="text-xs">
          +{categories.length - 6} more
        </Badge>
      )}
    </div>
  );
}
