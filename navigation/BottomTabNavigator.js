import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from '@react-navigation/native'
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ShowScreen from "../screens/ShowScreen";
import User from "../screens/User";
import Music from "../screens/Music";
import { connect } from 'react-redux'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

function BottomTabNavigator({ navigation, route, tabBarVisible }) {
  const { colors } = useTheme()
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor : colors.text,
        keyboardHidesTabBar: true
      }}
      initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={focused ? "md-happy" : "md-home"}
              selfStyle={
                focused
                  ? {
                      transform: [{ translateY: -5 }, { scale: 1.5 },{ rotate: '10deg' }]
                    }
                  : {}
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={ShowScreen}
        options={{
          title: "Show",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={focused ? "md-images" : "md-image"}
              selfStyle={
                focused
                  ? {
                      transform: [{ translateY: -5 }, { scale: 1.5 }, { rotate: '10deg' }],
                    }
                  : {}
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Music"
        component={Music}
        options={{
          title: "Music",
          tabBarVisible: tabBarVisible,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={focused ? "md-musical-notes" : "ios-musical-notes"}
              selfStyle={
                focused
                  ? {
                      transform: [{ translateY: -5 }, { scale: 1.5 }, { rotate: '10deg' }],
                    }
                  : {}
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="User"
        component={User}
        options={{
          title: "User",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={focused ? "ios-contact" : "md-contact"}
              selfStyle={
                focused
                  ? {
                      transform: [{ translateY: -5 }, { scale: 1.5 }, { rotate: '10deg' }],
                    }
                  : {}
              }
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
function MapStateToProps (state) {
  return {tabBarVisible: state.tabBarVisible}
}

export default connect(MapStateToProps)(BottomTabNavigator)

// function getHeaderTitle(route) {
//   const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

//   switch (routeName) {
//     case 'Home':
//       return 'Welcome';
//     case 'Links':
//       return 'Look Look';
//   }
// }
