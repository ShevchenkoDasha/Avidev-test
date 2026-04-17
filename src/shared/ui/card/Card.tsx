import { memo, type ReactNode } from 'react';

export const Card = memo(({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col shadow-md overflow-hidden bg-surface border border-border rounded-2xl p-6 hover:opacity-90 transition">
      {children}
    </div>
  );
});
