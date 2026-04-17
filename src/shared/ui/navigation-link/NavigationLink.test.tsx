import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import NavigationLink from './NavigationLink';

vi.mock('@/shared/helpers/keyboard_handlers', () => ({
  handleKeyDownEnterSpace: vi.fn((event, callback) => {
    if (event.key === 'Enter' || event.key === ' ') {
      callback();
    }
  }),
}));

describe('NavigationLink', () => {
  const renderWithRouter = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <>
          <NavigationLink to="/">Home</NavigationLink>
          <NavigationLink to="/about">About</NavigationLink>
        </>
      </MemoryRouter>,
    );
  };

  it('should render link with text', () => {
    renderWithRouter();

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should apply active class when route matches', () => {
    renderWithRouter('/');

    const link = screen.getByText('Home').closest('a');

    expect(link).toHaveClass('text-accent');
  });

  it('should apply inactive class when route does not match', () => {
    renderWithRouter('/about');

    const link = screen.getByText('Home').closest('a');

    expect(link).toHaveClass('text-text-secondary');
  });

  it('should trigger click on Enter key', () => {
    renderWithRouter();

    const link = screen.getByText('Home').closest('a') as HTMLElement;

    const clickSpy = vi.spyOn(link, 'click');

    fireEvent.keyDown(link, { key: 'Enter' });

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should trigger click on Space key', () => {
    renderWithRouter();

    const link = screen.getByText('Home').closest('a') as HTMLElement;

    const clickSpy = vi.spyOn(link, 'click');

    fireEvent.keyDown(link, { key: ' ' });

    expect(clickSpy).toHaveBeenCalled();
  });
});
