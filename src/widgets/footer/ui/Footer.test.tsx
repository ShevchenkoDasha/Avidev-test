import { screen } from '@testing-library/react';

import { Footer, FOOTER_LINKS } from './Footer';
import { renderWithProviders } from '@/test/test-utils.tsx';

describe('Footer', () => {
  it('renders copyright text', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('© 2026 Defense Project')).toBeInTheDocument();
  });

  it('renders all footer links', () => {
    renderWithProviders(<Footer />);

    FOOTER_LINKS.forEach((item) => {
      expect(
        screen.getByRole('link', { name: item.label }),
      ).toBeInTheDocument();
    });
  });

  it('renders links with correct href', () => {
    renderWithProviders(<Footer />);

    FOOTER_LINKS.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        item.href,
      );
    });
  });
});
