import { useState } from 'react';

export const useHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  return { mobileOpen, toggleDrawer };
};
