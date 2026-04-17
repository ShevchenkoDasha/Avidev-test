export const breakpoints = {
  phablet: 640,
  tablet: 960,
  laptop: 1280,
  desktop: 1920,
};

export const tailwindBreakpoints = Object.fromEntries(
  Object.entries(breakpoints).map(([key, value]) => [key, `${value}px`]),
) as Record<keyof typeof breakpoints, string>;

export const mediaQueries = Object.fromEntries(
  Object.entries(tailwindBreakpoints).map(([key, value]) => [
    key,
    `(min-width: ${value})`,
  ]),
) as Record<keyof typeof tailwindBreakpoints, string>;
