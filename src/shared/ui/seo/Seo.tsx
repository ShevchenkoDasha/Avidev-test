import {
  LocaleTypeEnum,
  type LocaleType,
} from '@/features/locale/model/locale.slice.types';
import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title: string;
  description: string;
  locale: LocaleType;
  canonical?: string;
  image?: string;
  noindex?: boolean;
};

const SITE_NAME = 'Avidev';
const SITE_URL = 'https://avidev-1125c.web.app/';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const Seo = ({
  title,
  description,
  locale,
  canonical,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: SeoProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Avidev" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      {locale === LocaleTypeEnum.EN ? (
        <meta property="og:locale:alternate" content="uk_UA" />
      ) : (
        <meta property="og:locale:alternate" content="en_US" />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}
    </Helmet>
  );
};
