import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { Card } from 'react-native-paper'

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#fffae5',
    primary: '#666'
  }
}

const MyDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000',
    primary: '#55f',
    background: '#fff'
  }
}
export { MyDarkTheme, MyDefaultTheme }
// colors（object）：React导航组件使用的各种颜色：
// primary（string）：用于为各种元素着色的应用程序的原色。通常，您需要为此使用品牌颜色。
// background（string）：各种背景的颜色，例如屏幕的背景颜色。
// card（string）：类似卡片元素的背景颜色，例如标题，标签栏等。
// text（string）：各种元素的文字颜色。
// border（string）：边框的颜色，例如标题边框，标签栏边框等。
