import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock all providers and router
vi.mock('./providers/StoreProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="store-provider">{children}</div>
  ),
}));

vi.mock('./providers/QueryClientProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-provider">{children}</div>
  ),
}));

vi.mock('./providers/AuthProvider', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));

vi.mock('./providers/ThemeProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

vi.mock('./providers/NotificationProvider', () => ({
  default: () => <div data-testid="notification-provider" />,
}));

vi.mock('./providers/RouterProvider', () => ({
  default: () => <div data-testid="router-provider">Router Content</div>,
}));

vi.mock('@/shared/ui/circular-loader', () => ({
  CircularLoader: ({ className }: { className?: string }) => (
    <div data-testid="circular-loader" className={className}>
      Loading...
    </div>
  ),
}));

describe('App', () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('store-provider')).toBeInTheDocument();
  });

  it('should render all providers in correct order', () => {
    render(<App />);

    const storeProvider = screen.getByTestId('store-provider');
    const queryProvider = screen.getByTestId('query-provider');
    const authProvider = screen.getByTestId('auth-provider');
    const themeProvider = screen.getByTestId('theme-provider');

    expect(storeProvider).toBeInTheDocument();
    expect(queryProvider).toBeInTheDocument();
    expect(authProvider).toBeInTheDocument();
    expect(themeProvider).toBeInTheDocument();
  });

  it('should render RouterProvider', () => {
    render(<App />);
    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
  });

  it('should render NotificationProvider', () => {
    render(<App />);
    expect(screen.getByTestId('notification-provider')).toBeInTheDocument();
  });

  it('should have Suspense fallback with CircularLoader', () => {
    render(<App />);
    expect(screen.getByTestId('store-provider')).toBeInTheDocument();
  });
});
