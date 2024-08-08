import { em, MantineThemeOverride, rem } from "@mantine/core";
import { themeColors } from "./colors";
import { themeShadows } from "./shadows";

const BREAKPOINTS: Record<string, number> = {
  md: 800,
  lg: 1300,
};

export const themeOverride: MantineThemeOverride = {
  fontFamily: "Roboto",
  fontFamilyMonospace: "Roboto",
  colors: {
    primary: themeColors.primary,
    dark: themeColors.dark,
    gray: themeColors.gray,
    red: themeColors.red,
  } as unknown as MantineThemeOverride["colors"],
  primaryColor: "primary",
  headings: {
    sizes: {
      h1: {
        fontSize: rem(40),
        lineHeight: "1.2",
      },
      h2: {
        fontSize: rem(32),
        lineHeight: "1.35",
      },
      h3: {
        fontSize: rem(24),
        lineHeight: "1.33",
      },
      h4: {
        fontSize: rem(18),
        lineHeight: "1.2",
      },
      h5: {
        fontSize: rem(16),
        lineHeight: "1.25",
      },
      h6: {
        fontSize: rem(12),
        lineHeight: "1.33",
      },
    },
  },
  fontSizes: {
    xxs: rem(10),
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  shadows: {
    xs: themeShadows.xs,
    sm: themeShadows.sm,
    md: themeShadows.md,
    lg: themeShadows.lg,
    xl: themeShadows.xl,
  },
  breakpoints: { md: em(BREAKPOINTS.md), lg: em(BREAKPOINTS.lg) },

  components: {
    Checkbox: {
      styles: {
        label: { paddingLeft: 8, color: themeColors.gray[9] },
        description: { paddingLeft: 8 },
      },
    },
    Button: {
      styles: {
        leftIcon: { margin: 0 },
      },
    },
  },
};
