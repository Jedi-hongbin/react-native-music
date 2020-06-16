import React, { useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import { Container, Title, HButton } from '../constants/styled'
import * as Linking from 'expo-linking'
import { Image } from 'react-native'
import Layout from '../constants/Layout'
import AnimatedSlider from '../constants/AnimatedSlider'
import { connect } from 'react-redux'

function AboutUs({ openByDefault, openDrawer, closeDrawer, navigation }) {
  const { colors } = useTheme()
  closeDrawer()
  const goBack = () => {
    openDrawer()
    navigation.navigate('Root')
  }
  return (
    <Container style={{
      justifyContent: 'space-around',
      padding: '20%',
      position: 'relative'
    }}>
      <Title weight='700' style={{ color: colors.text}}>你可以通过以下几种方式联系我们</Title>
      <HButton
        LGColors={['#55f', '#afa']}
        title=' 官网'
        titleColor='#fffae5'
        iconName='hand-paper-o'
        iconColor='#fffae5'
        center
        onPress={() => { Linking.openURL('http://hongbin.xyz') }}
        />
      <HButton
        LGColors={['#faa', '#a2a']}
        title=' 客服电话'
        titleColor='#fffae5'
        iconName='hand-peace-o'
        iconColor='#fffae5'
        center
        onPress={() => { Linking.openURL('tel:17614251298') }}
        />
      <HButton
        title=' 短信提交'
        titleColor='#fffae5'
        iconName='hand-pointer-o'
        iconColor='#fffae5'
        center
        onPress={() => { Linking.openURL('sms:17614251298') }}
        />
      <HButton
        LGColors={['#aaf', '#f0a']}
        title=' 电子邮件'
        titleColor='#fffae5'
        iconName='hand-rock-o'
        iconColor='#fffae5'
        center
        onPress={() => { Linking.openURL('mailto: 2218176087@qq.com') }}
        />
        <Image source={require('../assets/images/v.png')} style={{
          position: 'absolute',
          width: Layout.window.width,
          height: Layout.window.height + 60,
          top: 0,
          zIndex: -1,
        }}/>
        <AnimatedSlider
          goBack={goBack}
          top={`${Layout.window.height - 100}px`}
          left='120%'/>
    </Container>
  )
}

function MapStateToProps (state) {
  return state
}

function MapDispatchToProps (dispatch) {
  return {
    openDrawer: () => dispatch({
      type: 'OPEN_DRAWER'
    }),
    closeDrawer: () => dispatch({
      type: 'CLOSE_DRAWER'
    })
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(AboutUs)