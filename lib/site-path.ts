const SITE_ORIGIN = "https://gaboesquivel.com";

export const siteOrigin = SITE_ORIGIN;

export const siteRelativePath = (url: string) => url.replace(SITE_ORIGIN, "");
