import React, { useContext } from 'react';

// NOTE: Theme is currently applied only on components in 'components' folder
// but, it can be used in other components in the same manner

export const fonts = {
  textRegular: 'open-sans',
  headSemiBold: 'open-sans-semi-bold',
  headBold: 'open-sans-bold',
};

export const palette = {
  primaryActive: '#000000',
  secondaryActive: '#ffffff',
};

export type ColorTheme = typeof DEFAULT_APP_THEME['colors'];

type AppTheme = typeof DEFAULT_APP_THEME;

export const DEFAULT_APP_THEME = {
  fonts: {
    default: {
      regular: {
        fontFamily: fonts.textRegular,
      },
      semiBold: {
        fontFamily: fonts.headSemiBold,
      },
      bold: {
        fontFamily: fonts.headBold,
      },
    },
  },
  colors: {
    activePrimary: palette.primaryActive,
    activeSecondary: palette.secondaryActive,
  },
  spacing: {
    s: 10,
    m: 20,
    l: 30,
    xl: 40,
  },
};

export const ThemeContext = React.createContext<AppTheme>(DEFAULT_APP_THEME);

export const useAppTheme = (): AppTheme => {
  return useContext(ThemeContext);
};
