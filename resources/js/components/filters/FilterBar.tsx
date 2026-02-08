import React from 'react';

interface FilterBarProps {
  children: React.ReactNode;
  className?: string;
}

export default function FilterBar({ children, className = '' }: FilterBarProps) {
  return (
    <div className={`w-full rounded-lg p-4 bg-neutral-900 border border-neutral-800 ${className}`}>
      <div className="max-w-full">{children}</div>
    </div>
  );
}
