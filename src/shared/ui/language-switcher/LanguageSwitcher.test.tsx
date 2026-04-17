import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { LanguageSwitcher } from './LanguageSwitcher';
import { LocaleTypeEnum } from '@/features/locale/model/locale.slice.types';

const changeLanguageMock = vi.fn();

vi.mock('@/shared/hooks', () => ({
  useTranslation: () => ({
    translate: (key: string) => key,
    changeLanguage: changeLanguageMock,
    currentLang: LocaleTypeEnum.EN,
  }),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    changeLanguageMock.mockClear();
  });

  it('should render current language', () => {
    render(<LanguageSwitcher />);

    const selectedLanguage = screen.getByTestId('selected-language-button');
    expect(selectedLanguage).toBeInTheDocument();
    expect(selectedLanguage).toHaveTextContent('EN');
  });

  it('should open dropdown on trigger click', async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    const selectedLanguageButton = screen.getByTestId(
      'selected-language-button',
    );
    await user.click(selectedLanguageButton);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('lang.en')).toBeInTheDocument();
    expect(screen.getByText('lang.ua')).toBeInTheDocument();
    expect(selectedLanguageButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('should close dropdown when trigger is clicked twice', async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    const selectedLanguageButton = screen.getByTestId(
      'selected-language-button',
    );

    await user.click(selectedLanguageButton);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.click(selectedLanguageButton);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(selectedLanguageButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should call changeLanguage and close dropdown on language select', async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    const selectedLanguageButton = screen.getByTestId(
      'selected-language-button',
    );
    await user.click(selectedLanguageButton);

    const languageButtonUA = screen.getByTestId('language-button-ua');
    await user.click(languageButtonUA);

    expect(changeLanguageMock).toHaveBeenCalledTimes(1);
    expect(changeLanguageMock).toHaveBeenCalledWith(LocaleTypeEnum.UA);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should mark current language as selected', async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    const selectedLanguageButton = screen.getByTestId(
      'selected-language-button',
    );
    await user.click(selectedLanguageButton);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);

    const enOption = options.find((option) =>
      option.textContent?.includes('lang.en'),
    );
    const uaOption = options.find((option) =>
      option.textContent?.includes('lang.ua'),
    );

    expect(enOption).toHaveAttribute('aria-selected', 'true');
    expect(uaOption).toHaveAttribute('aria-selected', 'false');
  });

  it('should close dropdown on outside click', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <LanguageSwitcher />
        <button>Outside</button>
      </div>,
    );

    const selectedLanguageButton = screen.getByTestId(
      'selected-language-button',
    );
    await user.click(selectedLanguageButton);

    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByText('Outside'));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
