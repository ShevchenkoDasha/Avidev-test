import { memo } from 'react';

export const Progress = memo(({ value }: { value: number }) => {
  return (
    <div className="bg-border h-2 rounded-full" data-testid="progressbar">
      <div
        className="bg-primary h-2 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
});
