import * as React from 'react'
import { PanResponder, Animated } from 'react-native'
import styled from 'styled-components'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'
import { Title } from './styled'

const Slider = styled.View`
position: absolute;
width: 400px;
height: 50px;
background-color: #ccc;
top: ${props => props.top || '0px'};
left: ${props => props.left || '0px'};
border-radius: 50px;
display: flex;
justify-content: flex-start;
flex-direction: row;
align-items: center;
padding: 10px;
overflow: hidden;
`
const opacity = new Animated.Value(1)
let translateX = new Animated.Value(0)

const PanSlider = Animated.createAnimatedComponent(Slider)

export default function AnimatedSlider({ top, left, goBack }) {
  const _panResponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      Animated.spring(opacity, { toValue: 0.7 }).start()
    },
    onPanResponderMove: (evt, gestureState) => {
      translateX.setValue(gestureState.dx)
      if (gestureState.dx < -100) {
        goBack()
      }
    },
    onPanResponderRelease: () => {
      Animated.spring(opacity, { toValue: 1 }).start()
      Animated.spring(translateX, { toValue: 0 }).start()
    }
  })
  return (
    <PanSlider
      {..._panResponder.panHandlers}
      style={{
        opacity,
        transform: [{ translateX }]
      }}
      top={top}
      left={left}>
        <FontAwesome name='angle-left' size={30} color='#fffae5' />
        <Title style={{ color: '#fffae5', marginLeft: 10 }}>返回</Title>
    </PanSlider>
  )
}
