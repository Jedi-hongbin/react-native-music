import * as React from "react";
import { useTheme } from "@react-navigation/native";
import FirstComponent from "./ShowScreenComponents/FirstComponent";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function LinksScreen() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen name="first" component={FirstComponent} options={{
        header: () => {}
      }} />
    </Stack.Navigator>
  );
}
