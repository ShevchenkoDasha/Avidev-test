import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply variant prop - outline', () => {
    const { container } = render(<Button variant="outline">Button</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button?.className).toContain('border');
  });

  it('should apply variant prop - primary', () => {
    const { container } = render(<Button variant="primary">Button</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button?.className).toContain('bg-accent');
  });

  it('should apply variant prop - alert', () => {
    const { container } = render(<Button variant="alert">Button</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button?.className).toContain('bg-alert');
  });

  it('should apply variant prop - text', () => {
    const { container } = render(<Button variant="text">Button</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button?.className).toContain('bg-transparent');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toBeDisabled();
  });

  it('should not trigger onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Button
      </Button>,
    );

    await user.click(screen.getByText('Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Button className="custom-class">Button</Button>,
    );
    const button = container.querySelector('button');
    expect(button?.className).toContain('custom-class');
  });

  it('should accept type prop', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
