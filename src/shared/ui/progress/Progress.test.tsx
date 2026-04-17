import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  it('should render with value', () => {
    const { container } = render(<Progress value={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render progress bar with correct width', () => {
    const { container } = render(<Progress value={75} />);
    const progressBar = container.querySelector('.bg-primary') as HTMLElement;
    expect(progressBar).toBeInTheDocument();
    expect(progressBar.style.width).toBe('75%');
  });

  it('should render with 0 value', () => {
    const { container } = render(<Progress value={0} />);
    const progressBar = container.querySelector('.bg-primary') as HTMLElement;
    expect(progressBar.style.width).toBe('0%');
  });

  it('should render with 100 value', () => {
    const { container } = render(<Progress value={100} />);
    const progressBar = container.querySelector('.bg-primary') as HTMLElement;
    expect(progressBar.style.width).toBe('100%');
  });

  it('should have correct container styling', () => {
    const { container } = render(<Progress value={50} />);
    const progressContainer = container.firstChild as HTMLElement;
    expect(progressContainer.className).toContain('bg-border');
    expect(progressContainer.className).toContain('h-2');
    expect(progressContainer.className).toContain('rounded-full');
  });

  it('should have correct bar styling', () => {
    const { container } = render(<Progress value={50} />);
    const progressBar = container.querySelector('.bg-primary') as HTMLElement;
    expect(progressBar.className).toContain('bg-primary');
    expect(progressBar.className).toContain('h-2');
    expect(progressBar.className).toContain('rounded-full');
  });
});
