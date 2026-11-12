const SITE_ORIGIN = "https://gaboesquivel.com";

export const siteOrigin = SITE_ORIGIN;

export const siteRelativePath = (url: string) => url.replace(SITE_ORIGIN, "");

/** A site path (with or without a leading slash) as an absolute URL; absolute URLs pass through. */
export const absoluteUrl = (href: string) => {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }
  return href.startsWith("/")
    ? `${SITE_ORIGIN}${href}`
    : `${SITE_ORIGIN}/${href}`;
};
