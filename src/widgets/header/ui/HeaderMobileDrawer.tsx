import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

import type { NavItem } from '@/features/navigation/model/types';
import { NavigationLink } from '@/shared/ui/navigation-link';
import { Drawer } from '@/shared/ui/drawer';
import { IconButton } from '@/shared/ui/icon-button';
import { useTranslation } from '@/shared/hooks';

interface Props {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

export const HeaderMobileDrawer: React.FC<Props> = ({
  open,
  onClose,
  items,
}) => {
  const { translate } = useTranslation();

  return (
    <Drawer
      anchor="right"
      open={open}
      handleClose={onClose}
      ariaLabel="header mobile menu"
    >
      <div className="h-full flex flex-col gap-4">
        <div className="flex self-end">
          <IconButton data-testid="close header menu" onClick={onClose}>
            <CloseIcon className="transition-transform duration-200 group-hover:scale-120" />
          </IconButton>
        </div>

        <ul className="flex flex-col gap-2 py-2">
          {items.map((item) => (
            <li key={item.label} onClick={onClose} className="py-2 px-4">
              <NavigationLink to={item.href}>
                {translate(item.label)}
              </NavigationLink>
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  );
};
