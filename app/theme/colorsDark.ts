// Helper to trim color values at runtime (VS Code needs leading space for color decorators)
const trimColor = <T extends Record<string, string>>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ]),
  ) as T
}

const paletteRaw = {
  neutral900: " #FFFFFF",
  neutral800: " #F4F2F1",
  neutral700: " #D7CEC9",
  neutral600: " #B6ACA6",
  neutral500: " #978F8A",
  neutral400: " #564E4A",
  neutral300: " #3C3836",
  neutral200: " #191015",
  neutral100: " #000000",

  primary600: " #F4E0D9",
  primary500: " #E8C1B4",
  primary400: " #DDA28E",
  primary300: " #D28468",
  primary200: " #C76542",
  primary100: " #A54F31",

  secondary500: " #DCDDE9",
  secondary400: " #BCC0D6",
  secondary300: " #9196B9",
  secondary200: " #626894",
  secondary100: " #41476E",

  accent500: " #FFEED4",
  accent400: " #FFE1B2",
  accent300: " #FDD495",
  accent200: " #FBC878",
  accent100: " #FFBB50",

  angry100: " #F2D6CD",
  angry500: " #C03403",

  toggles1: " #EFC7C2",
  toggles2: " #666A86",
  toggles3: " #788AA3",
  toggles4: " #92B6B1",
  toggles5: " #B2C9AB",
  toggles6: " #E8DDB5",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

// Trim all color values at runtime to remove leading spaces for valid React Native colors
const palette = trimColor(paletteRaw)

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral300,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
