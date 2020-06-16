import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MusicEnterComponent from './MusicComponents/MusicEnterComponent' 
import MusicListComponent from './MusicComponents/MusicListComponent' 
import MusicLyricComponent from './MusicComponents/MusicLyricComponent' 
const Stack = createStackNavigator();

export default function Music() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="musicEnter"
        component={MusicEnterComponent}
        options={{
          header: () => {},
        }}
      />
      <Stack.Screen
        name="musicList"
        component={MusicListComponent}
        options={{
          header: () => {},
        }}
      />
      <Stack.Screen
        name="musicLyric"
        component={MusicLyricComponent}
        options={{
          header: () => {},
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
