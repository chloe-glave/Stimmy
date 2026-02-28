import { TextStyle, ViewStyle } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

import Config from "@/config"
import { isRTL } from "@/i18n"
import { DemoDebugScreen } from "@/screens/DemoDebugScreen"
import { DemoShowroomScreen } from "@/screens/DemoShowroomScreen/DemoShowroomScreen"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { TogglesScreen } from "@/screens/TogglesScreen"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { AppStackParamList, NavigationProps } from "./navigationTypes"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

// Documentation: https://reactnavigation.org/docs/drawer-based-navigation/
const Drawer = createDrawerNavigator<AppStackParamList>()

/**
 * Drawer navigator for authenticated users
 * This replaces the Stack navigator and provides drawer-based navigation
 */
const DrawerStack = () => {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerType: "back",
        drawerPosition: isRTL ? "right" : "left",
        drawerStyle: themed($drawerStyle),
        overlayColor: colors.palette.overlay50,
        headerStyle: themed($headerStyle),
        headerTintColor: colors.text,
        headerTitleStyle: themed($headerTitleStyle),
      }}
      initialRouteName="Toggles"
    >
      <Drawer.Screen name="Toggles" component={TogglesScreen} />
      <Drawer.Screen name="DemoShowroom" component={DemoShowroomScreen} />
      <Drawer.Screen name="DemoDebug" component={DemoDebugScreen} />
    </Drawer.Navigator>
  )
}

const $drawerStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  width: 280,
})

const $headerStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
})

const $headerTitleStyle: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontFamily: typography.primary.medium,
  fontSize: 18,
  color: colors.text,
})

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <DrawerStack />
      </ErrorBoundary>
    </NavigationContainer>
  )
}
