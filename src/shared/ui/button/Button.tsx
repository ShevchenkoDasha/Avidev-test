import clsx from 'clsx';
import { memo } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'alert' | 'text';
}

export const Button = memo((props: ButtonProps) => {
  const { className, ...buttonProps } = props;
  const variant = props?.variant ?? 'primary';

  const baseStyles =
    'rounded-xl font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary:
      'px-6 py-3 bg-accent text-white shadow-sm hover:bg-primary-hover hover:shadow-md',
    outline:
      'px-6 py-3 border border-accent text-accent hover:bg-primary-hover hover:border-primary-hover hover:text-white',
    alert: 'px-6 py-3 bg-alert text-black hover:bg-alert-dark',
    text: 'px-0 py-0 bg-transparent text-accent shadow-none hover:bg-transparent hover:text-primary-hover hover:underline focus-visible:ring-0',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...buttonProps}
    />
  );
});
