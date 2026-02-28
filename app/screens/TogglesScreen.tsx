import { FC, useCallback, useState } from "react"
import { ViewStyle } from "react-native"
import { View } from "react-native"
import * as Haptics from "expo-haptics"

import { Screen } from "@/components/Screen"
import { Switch, type SwitchToggleProps } from "@/components/Toggle/Switch"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

interface TogglesScreenProps extends AppStackScreenProps<"Toggles"> {}

// Hex colors from colors.ts (generated on coolors.co)
const toggleColors = [
  "toggles1",
  "toggles2",
  "toggles3",
  "toggles4",
  "toggles5",
  "toggles6",
] as const

export const TogglesScreen: FC<TogglesScreenProps> = () => {
  const { themed } = useAppTheme()

  return (
    <Screen
      style={$root}
      preset="scroll"
      contentContainerStyle={$styles.flex1}
      safeAreaEdges={["bottom", "left", "right"]}
    >
      <View style={themed($centerContent)}>
        {toggleColors.map((toggleColor) => (
          <BigToggle key={toggleColor} toggleColor={toggleColor} />
        ))}
      </View>
    </Screen>
  )
}

const BigToggle = ({ toggleColor }: { toggleColor: (typeof toggleColors)[number] }) => {
  const { themed, theme } = useAppTheme()

  const [isTogglePressed, setIsTogglePressed] = useState(false)

  const onTogglePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    setIsTogglePressed(!isTogglePressed)
  }, [isTogglePressed])

  return (
    <Switch
      value={isTogglePressed}
      onPress={onTogglePress}
      inputOuterStyle={themed($bigToggleOuter)}
      inputInnerStyle={{
        ...themed($bigToggleInner),
        backgroundColor: theme.colors.palette[toggleColor],
      }}
      inputDetailStyle={$bigToggleKnob}
    />
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $centerContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  gap: spacing.md,
})

// Styling to create 4x the size of the default toggle

const $bigToggleOuter: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 175, // Maintains 1.75:1 ratio (56:32 default), doubled
  height: 100,
  borderRadius: 50, // Half of height to maintain rounded shape
  backgroundColor: colors.palette.angry100,
})

const $bigToggleInner: ThemedStyle<ViewStyle> = () => ({
  // The movement formula uses: [offsetLeft, knobWidth + offsetRight]
  // This doesn't scale proportionally, so start padding needs to be larger
  // to achieve equal visual spacing. Original: 4/4, scaled: 16/8 works visually
  paddingStart: 16,
  paddingEnd: 8,
})

const $bigToggleKnob: SwitchToggleProps["inputDetailStyle"] = {
  width: 75, // Scaled proportionally (24/32 * 100), doubled
  height: 75,
  borderRadius: 37.5, // Half of width/height for circular knob
  backgroundColor: colors.palette.primary100,
}
