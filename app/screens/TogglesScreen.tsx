import { FC, useCallback, useState } from "react"
import { ViewStyle } from "react-native"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Switch } from "@/components/Toggle/Switch"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

interface TogglesScreenProps extends AppStackScreenProps<"Toggles"> {}

// todo: first screen - list of big toggle components switch variant
export const TogglesScreen: FC<TogglesScreenProps> = () => {
  const navigation = useNavigation<AppStackScreenProps<"Toggles">["navigation"]>()
  const { themed } = useAppTheme()

  const [isTogglePressed, setIsTogglePressed] = useState(false)

  const onTogglePress = useCallback(() => {
    setIsTogglePressed(!isTogglePressed)
  }, [isTogglePressed])

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
        <Switch value={isTogglePressed} onPress={onTogglePress} />
        <Switch value={isTogglePressed} onPress={onTogglePress} />
        <Switch value={isTogglePressed} onPress={onTogglePress} />
        <Switch value={isTogglePressed} onPress={onTogglePress} />
      </View>
    </Screen>
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
