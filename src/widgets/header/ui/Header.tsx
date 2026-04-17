import React, { useCallback, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';

import { HeaderDesktopNav } from './HeaderDesktopNav';
import { HeaderMobileDrawer } from './HeaderMobileDrawer';
import { useResponsiveHeader } from '../model/useResponsiveHeader';
import { Logo } from '@/shared/ui/logo';
import { NAV_ITEMS } from '@/features/navigation/model/nav.config';
import { LanguageSwitcher } from '@/shared/ui/language-switcher';
import { IconButton } from '@/shared/ui/icon-button/IconButton';
import { handleKeyDownEnterSpace } from '@/shared/helpers/keyboard_handlers';
import { Container } from '@/shared/ui/container';

export const Header = () => {
  const { showFullNav, showMobileMenu } = useResponsiveHeader();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(() => NAV_ITEMS, []);

  const toggleDrawer = useCallback(() => setMobileOpen((prev) => !prev), []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      handleKeyDownEnterSpace(event, () => {
        event.preventDefault();
        (event.currentTarget as HTMLElement).click();
      });
    },
    [handleKeyDownEnterSpace],
  );

  return (
    <>
      <AppBar position="fixed" elevation={0} className="border-b border-border">
        <Container maxWidth="xl">
          <Toolbar className="flex justify-between !py-2">
            <RouterLink
              to="/"
              onKeyDown={handleKeyDown}
              className="focus-ring transition-transform transition-shadow duration-200 rounded-md inline-flex items-center px-2 py-1"
            >
              <Logo />
            </RouterLink>
            {showFullNav && <HeaderDesktopNav items={navItems} />}

            {showMobileMenu && (
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <IconButton onClick={toggleDrawer}>
                  <MenuIcon
                    aria-label="burger menu"
                    className="transition-transform duration-200 group-hover:scale-120"
                  />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {showMobileMenu && (
        <HeaderMobileDrawer
          open={mobileOpen}
          onClose={toggleDrawer}
          items={NAV_ITEMS}
        />
      )}
    </>
  );
};
