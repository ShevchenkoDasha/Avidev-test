import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Hero } from './Hero';
import { renderWithProviders } from '@/test/test-utils.tsx';

vi.mock('@/shared/ui/container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

vi.mock('@/shared/ui/button', () => ({
  Button: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant?: string;
  }) => <button data-variant={variant ?? 'default'}>{children}</button>,
}));

describe('Hero', () => {
  it('renders title and subtitle', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByRole('heading', { name: 'hero.title' }),
    ).toBeInTheDocument();

    expect(screen.getByText('hero.subtitle')).toBeInTheDocument();
  });

  it('renders both action buttons', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByRole('button', { name: 'hero.supportButton' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'hero.detailsButton' }),
    ).toBeInTheDocument();
  });

  it('renders details button with outline variant', () => {
    renderWithProviders(<Hero />);

    const supportButton = screen.getByRole('button', {
      name: 'hero.supportButton',
    });
    const detailsButton = screen.getByRole('button', {
      name: 'hero.detailsButton',
    });

    expect(supportButton).toHaveAttribute('data-variant', 'default');
    expect(detailsButton).toHaveAttribute('data-variant', 'outline');
  });
});
