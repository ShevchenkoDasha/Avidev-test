import type { FC } from 'react';

import type { NavItem } from '@/features/navigation/model/types';
import { NavigationLink } from '@/shared/ui/navigation-link';
import { useTranslation } from '@/shared/hooks';
import { LanguageSwitcher } from '@/shared/ui/language-switcher';

interface Props {
  items: NavItem[];
}

export const HeaderDesktopNav: FC<Props> = ({ items }) => {
  const { translate } = useTranslation();

  return (
    <div className="font-sans flex items-center gap-8 text-text-secondary">
      <div className="flex gap-6">
        {items.map((item) => (
          <NavigationLink key={item.label} to={item.href}>
            {translate(item.label)}
          </NavigationLink>
        ))}
      </div>
      <LanguageSwitcher />
    </div>
  );
};
