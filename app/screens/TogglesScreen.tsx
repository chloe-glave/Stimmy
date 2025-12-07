import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
// import { useNavigation } from "@react-navigation/native"
import { $styles } from "@/theme/styles"

interface TogglesScreenProps extends AppStackScreenProps<"Toggles"> {}

export const TogglesScreen: FC<TogglesScreenProps> = () => {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen
      style={$root}
      preset="scroll"
      contentContainerStyle={$styles.flex1}
      safeAreaEdges={["top", "bottom", "left", "right"]}
    >
      <Text text="toggles" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
