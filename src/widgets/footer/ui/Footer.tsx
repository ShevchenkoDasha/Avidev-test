import { Link } from 'react-router-dom';

import { useTranslation } from '@/shared/hooks';
import { Container } from '@/shared/ui/container';
import { FOOTER_LINKS } from '../constants/fotter-links';

export const Footer = () => {
  const { translate } = useTranslation();

  return (
    <footer className="mt-16 border-t border-border bg-bg-primary">
      <Container>
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-text-secondary">
          <span>© 2026 Defense Project</span>

          <div className="flex gap-4">
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="hover:text-white transition-colors focus-ring rounded"
              >
                {translate(item.label)}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
