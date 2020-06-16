import React, { useState, useEffect } from 'react'
import { View, } from 'react-native'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import { useTheme } from '@react-navigation/native'
import {
  Avatar,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Layout from '../constants/Layout'

const CustomDrawerContainer = (props) => {
  const { colors, dark } = useTheme()

  return (
    <DrawerContentScrollView {...props}>
      <Avatar.Image size={Layout.window.width * 0.2} source={{ uri: 'https://profile.csdnimg.cn/9/9/9/2_printf_hello' }} style={{ marginLeft: '10%', marginRight: 'auto', marginBottom: 10 }} />
      <Paragraph style={{ color: colors.text, marginLeft: '10%', fontWeight: 'bold' }}>Hello Hongbin</Paragraph>
      <View style={{ color: colors.text, marginLeft: '10%', display: 'flex', flexDirection: 'row' }}>
        <Caption>32 </Caption>
        <Caption style={{ marginRight: 10 }}>关注</Caption>
        <Caption>2 </Caption>
        <Caption>粉丝</Caption>
      </View>
      <Drawer.Section>
        <DrawerItem
          label='主页'
          icon={({ focused, color, size }) => <MaterialCommunityIcons color={color} size={size} name={focused ? 'heart' : 'heart-outline'} />}
          onPress={()=>{
            props.navigation.navigate('Root')
          }}
        />
        <DrawerItem
          label='我要投稿'
          icon={({ color, size }) => <MaterialCommunityIcons color={color} size={size} name='file-upload' />}
        />
        <DrawerItem
          label='关于我们'
          icon={({ color, size }) => <MaterialCommunityIcons color={color} size={size} name='account-group-outline' />}
          onPress={() => {
            props.navigation.navigate('aboutUs')
          }}
        />
      </Drawer.Section>
      <TouchableRipple onPress={() => { props.toggleTheme() }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 12,
          paddingHorizontal: 16
        }}>
          <Paragraph style={{ color: colors.text }}>夜晚模式</Paragraph>
          <View pointerEvents="none">
            <Switch value={dark} />
          </View>
        </View>
      </TouchableRipple>
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContainer
