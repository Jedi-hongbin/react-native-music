import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components';

export default function User() {
  return (
    <View>
      <Shadow></Shadow>
    </View>
  )
}

const Shadow = styled.View`
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  box-shadow: 10px 10px 1px #000
`