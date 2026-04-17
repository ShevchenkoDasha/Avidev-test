import { memo } from 'react';

type QueryErrorFallbackProps = {
  message: string;
  translate?: (value: string) => string;
};

export const QueryErrorFallback = memo(
  ({ message, translate }: QueryErrorFallbackProps) => {
    const content = translate ? translate(message) : message;

    return (
      <div className="flex justify-between items-center bg-surface border border--border p-6 rounded-2xl hover:opacity-90 transition">
        {content}
      </div>
    );
  },
);
