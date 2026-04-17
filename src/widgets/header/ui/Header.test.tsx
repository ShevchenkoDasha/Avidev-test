import { screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Header } from './Header';
import { useResponsiveHeader } from '../model/useResponsiveHeader';
import { renderWithProviders } from '@/test/test-utils.tsx';

vi.mock('../model/useResponsiveHeader', () => ({
  useResponsiveHeader: vi.fn(),
}));

vi.mock('@/shared/ui/logo', () => ({
  Logo: () => <div>Logo</div>,
}));

vi.mock('@/shared/ui/language-switcher', () => ({
  LanguageSwitcher: () => <div>LanguageSwitcher</div>,
}));

vi.mock('@/shared/ui/navigation-link', () => ({
  NavigationLink: ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => <a href={to}>{children}</a>,
}));

vi.mock('@/shared/ui/drawer', () => ({
  Drawer: ({
    open,
    children,
    ariaLabel,
  }: {
    open: boolean;
    children: React.ReactNode;
    ariaLabel?: string;
  }) => (open ? <div aria-label={ariaLabel}>{children}</div> : null),
}));

describe('Header', () => {
  // beforeEach(() => {
  //   vi.mocked(useTranslation).mockReturnValue({
  //     translate: (key: string) => key,
  //     changeLanguage: vi.fn(),
  //     currentLang: LocaleTypeEnum.EN,
  //   });
  // });

  it('renders desktop navigation when showFullNav is true', () => {
    vi.mocked(useResponsiveHeader).mockReturnValue({
      showFullNav: true,
      showMobileMenu: false,
    });

    renderWithProviders(<Header />);

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('LanguageSwitcher')).toBeInTheDocument();

    expect(screen.getByText('nav.career')).toBeInTheDocument();
    expect(screen.getByText('nav.contact')).toBeInTheDocument();
  });

  it('renders mobile menu button when showMobileMenu is true', () => {
    vi.mocked(useResponsiveHeader).mockReturnValue({
      showFullNav: false,
      showMobileMenu: true,
    });

    renderWithProviders(<Header />);

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('LanguageSwitcher')).toBeInTheDocument();

    expect(screen.queryByLabelText('burger menu')).toBeInTheDocument();
    expect(
      screen.queryByLabelText('header mobile menu'),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('opens mobile drawer after clicking menu button', async () => {
    vi.mocked(useResponsiveHeader).mockReturnValue({
      showFullNav: false,
      showMobileMenu: true,
    });

    const { user } = renderWithProviders(<Header />);

    const menuButton = screen.getByRole('button');
    await user.click(menuButton);

    expect(screen.getByLabelText('header mobile menu')).toBeInTheDocument();
  });

  it('closes mobile drawer after clicking close button', async () => {
    vi.mocked(useResponsiveHeader).mockReturnValue({
      showFullNav: false,
      showMobileMenu: true,
    });

    const { user } = renderWithProviders(<Header />);

    const menuButton = screen.getByRole('button');
    await user.click(menuButton);

    expect(screen.getByLabelText('header mobile menu')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close header menu');

    await user.click(closeButton);

    expect(
      screen.queryByLabelText('header mobile menu'),
    ).not.toBeInTheDocument();
  });
});
