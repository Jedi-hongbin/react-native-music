import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native'
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  const { colors } = useTheme()
  return (
    <Ionicons
      name={props.name}
      size={props.size ||30}
      style={{ marginBottom: -3, ...props.selfStyle }}
      color={props.focused ? colors.text : Colors.tabIconDefault}
    />
  );
}
