'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { 
  Star as Sun, 
  Star as Moon, 
  Star as Monitor, 
  ChevronDown,
  CheckCircle as Check 
} from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 touch-target-sm"
      >
        <Monitor className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const themes = [
    {
      key: 'light' as const,
      label: 'Light',
      icon: Sun,
      description: 'Light theme'
    },
    {
      key: 'dark' as const,
      label: 'Dark',
      icon: Moon,
      description: 'Dark theme'
    },
    {
      key: 'system' as const,
      label: 'System',
      icon: Monitor,
      description: 'Use system preference'
    }
  ];

  const currentTheme = themes.find(t => t.key === theme);
  const CurrentIcon = currentTheme?.icon || Monitor;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="h-9 px-2 touch-target-sm dark:hover:bg-gray-800 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <CurrentIcon className="h-4 w-4" />
        <ChevronDown className="ml-1 h-3 w-3" />
        <span className="sr-only">Toggle theme menu</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="p-1">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                const isSelected = theme === themeOption.key;
                
                return (
                  <button
                    key={themeOption.key}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                    onClick={() => {
                      setTheme(themeOption.key);
                      setIsOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="flex flex-1 flex-col items-start">
                      <span>{themeOption.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {themeOption.description}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-blue-400" />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Current resolved theme indicator */}
            <div className="border-t border-border px-3 py-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {resolvedTheme === 'dark' ? (
                  <Moon className="h-3 w-3" />
                ) : (
                  <Sun className="h-3 w-3" />
                )}
                <span>Currently: {resolvedTheme}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
