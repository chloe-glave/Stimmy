import { FC, useCallback, useState } from "react"
import { ViewStyle } from "react-native"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Switch, type SwitchToggleProps } from "@/components/Toggle/Switch"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

interface TogglesScreenProps extends AppStackScreenProps<"Toggles"> {}

// todo: first screen - list of big toggle components switch variant
export const TogglesScreen: FC<TogglesScreenProps> = () => {
  const navigation = useNavigation<AppStackScreenProps<"Toggles">["navigation"]>()
  const { themed } = useAppTheme()

  return (
    <Screen
      style={$root}
      preset="scroll"
      contentContainerStyle={$styles.flex1}
      safeAreaEdges={["top", "bottom", "left", "right"]}
    >
      <Button
        onPress={() => navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })}
        text="Go to DemoShowroom"
        style={themed($button)}
      />

      <View style={themed($centerContent)}>
        <BigToggle />
        <BigToggle />
        <BigToggle />
        <BigToggle />
        <BigToggle />
        <BigToggle />
      </View>
    </Screen>
  )
}

const BigToggle = () => {
  const { themed } = useAppTheme()

  const [isTogglePressed, setIsTogglePressed] = useState(false)

  const onTogglePress = useCallback(() => {
    setIsTogglePressed(!isTogglePressed)
  }, [isTogglePressed])

  return (
    <Switch
      value={isTogglePressed}
      onPress={onTogglePress}
      inputOuterStyle={themed($bigToggleOuter)}
      inputInnerStyle={themed($toggleInner)}
      inputDetailStyle={$toggleKnob}
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

const $button: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginHorizontal: spacing.lg,
  backgroundColor: colors.tint,
})

// Styling to create 4x the size of the default toggle

const $bigToggleOuter: ThemedStyle<ViewStyle> = () => ({
  width: 175, // Maintains 1.75:1 ratio (56:32 default), doubled
  height: 100,
  borderRadius: 50, // Half of height to maintain rounded shape
})

const $toggleInner: ThemedStyle<ViewStyle> = () => ({
  // The movement formula uses: [offsetLeft, knobWidth + offsetRight]
  // This doesn't scale proportionally, so start padding needs to be larger
  // to achieve equal visual spacing. Original: 4/4, scaled: 16/8 works visually
  paddingStart: 16,
  paddingEnd: 8,
})

const $toggleKnob: SwitchToggleProps["inputDetailStyle"] = {
  width: 75, // Scaled proportionally (24/32 * 100), doubled
  height: 75,
  borderRadius: 37.5, // Half of width/height for circular knob
}
