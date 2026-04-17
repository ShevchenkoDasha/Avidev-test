import { useState, useRef, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useTranslation } from '@/shared/hooks';
import { LocaleTypeEnum } from '@/features/locale/model/locale.slice.types';

const languages = [
  { code: LocaleTypeEnum.EN, label: 'lang.en' },
  { code: LocaleTypeEnum.UA, label: 'lang.ua' },
];

export const LanguageSwitcher = () => {
  const { translate, changeLanguage, currentLang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const baseButtonClasses =
    'w-full text-left px-4 py-2 text-sm rounded transition-colors duration-200 focus:outline-none focus-visible:shadow-focus-accent';

  return (
    <div className="relative ml-4" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        data-testid={'selected-language-button'}
        className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-semibold
          text-text-secondary bg-bg-secondary
          hover:text-white hover:bg-bg-hover hover:cursor-pointer
          focus:outline-none focus-visible:shadow-focus-accent
          transition-colors duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {currentLang.toUpperCase()}
        <ArrowDropDownIcon
          className={`!w-5 !h-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-24 bg-bg-secondary rounded-md shadow-lg border border-border z-50"
          role="listbox"
        >
          {languages.map(({ code, label }) => {
            const isSelected = currentLang === code;
            return (
              <li key={code} role="option" aria-selected={isSelected}>
                <button
                  data-testid={`language-button-${code}`}
                  onClick={() => {
                    changeLanguage(code);
                    setIsOpen(false);
                  }}
                  className={`${baseButtonClasses} ${
                    isSelected
                      ? 'bg-accent text-white font-semibold'
                      : 'text-text-secondary hover:bg-bg-hover hover:text-white'
                  }`}
                >
                  {translate(label)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

LanguageSwitcher.displayName = 'LanguageSwitcher';
