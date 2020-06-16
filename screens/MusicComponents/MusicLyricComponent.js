import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, PanResponder, View, Animated, TouchableWithoutFeedback, Platform, Easing, Slider,Text } from 'react-native'
import Layout from '../../constants/Layout'
import styled from 'styled-components';
import { BlurView } from 'expo-blur'
import { connect } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import soundObject from '../AudioSound'
import { MaterialCommunityIcons } from "@expo/vector-icons";
// https://api.imjad.cn/cloudmusic/?type=lyric&id=1454447163
const isIos = Platform.OS === 'ios' ? true : false
const { width, height } = Layout.window
let rotate = new Animated.Value(0)
const MusicLyricComponent = ({ hidden, show, navigation, nextMusic, upMusic, toggleMusicState, musicInfo }) => {
  const { colors } = useTheme()
  const [isPlay, setIsPlay] = useState(false)
  let lyricRollHeightTemp = new Animated.Value(0)
  let lyricRollHeight = Animated.add(10, lyricRollHeightTemp)
  // let lyricRollHeight = new Animated.Value(0)
  const { musicId, musicName, musicPicUrl } = musicInfo
  const [lyrics, setLyrics] = useState([])
  const [times, setTimes] = useState([])
  const [showLyric, setShowLyric] = useState(false)
  const [slideValue, setSlideValue] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rollTop, setRollTop] = useState(0)
  const [rollCheck, setRollCheck] = useState(true)
  const [durationTime,setDurationTime] = useState(0)
  const url = `https://api.imjad.cn/cloudmusic/?type=lyric&id=${musicId}`
  useEffect(() => {
    setConfigState()
  }, [musicInfo])
  async function setConfigState() {
    // console.log(musicInfo)
    const state = await soundObject.getStatusAsync()
    setDurationTime(state.durationMillis)
    if (state.isPlaying) {
      setIsPlay(true)
    } else {
      setIsPlay(false)
    }
    fetchLyric()
  }
  useEffect(() => {
    soundObject.setOnPlaybackStatusUpdate(({ didJustFinish, durationMillis, positionMillis, isPlaying, volume }) => {
      if (didJustFinish) {
        nextMusic(true)
      }
      if (isPlaying) {
        setIsPlay(true)
      } else {
        setIsPlay(false)
      }
      setSlideValue(positionMillis / durationMillis)
      setCurrentTime(positionMillis)
    })
    return () => {
      soundObject.setOnPlaybackStatusUpdate(({ didJustFinish }) => {
        if (didJustFinish) {
          nextMusic(true)
        }
      })
    }
  }, [musicInfo])

  function lyricRollListener(positionMillis) {
    let timesIndex = times.findIndex(time => positionMillis - time <= 100)
    // console.log(currentIndex)
    setCurrentIndex(timesIndex - 1)
  }
  useEffect(() => {
    Animated.timing(lyricRollHeightTemp, { toValue: currentIndex * -40, duration: 300, useNativeDriver: false, easing: Easing.linear }).start()
    lyricRollHeightTemp.setValue(currentIndex * -40)
    if (rollCheck) {
      if (rollTop !== 0) {
        setRollTop(0)
      }
    }
  }, [currentIndex])
  useEffect(() => {
    lyricRollListener(currentTime)
  }, [slideValue])

  useEffect(() => {
    if (isPlay) {
      RotateAnimated.start()
    } else {
      RotateAnimated.stop()
    }
  }, [isPlay])

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  const RotateAnimated = Animated.loop(Animated.timing(rotate, {
    toValue: 1,
    duration: 10000,
    easing: Easing.linear,
    useNativeDriver: false
  }))

  useEffect(() => {
    if (showLyric) {
      fetchLyric()
    }
    if (isPlay) {
      RotateAnimated.start()
    } else {
      RotateAnimated.stop()
    }
  }, [showLyric])
  function fetchLyric() {
    fetch(url)
      .then(res => res.json())
      .then(res => parseLyric(res.lrc.lyric))
      .catch(err => console.log(err))
  }
  let time = [];
  let word = [];
  function parseLyric(lyric) {
    let one = lyric.split('\n')
    one.forEach((lyr, index) => {
      let three = lyr.split(']')
      if (three[1] == '' || three[1] == undefined) {
        return true
      }
      word.push(three[1]) //歌词获取完毕
      //获取每句歌词对应的时间
      let two = three[0].match(/\[(\d+:\d+.\d+)/)[1]
      let m = parseInt(two.split(':')[0]) * 60 * 1000 //分钟
      let s = parseInt(two.split(':')[1].split('.')[0] * 1000) //秒
      let ss = parseInt(two.split(':')[1].split('.')[1]) //毫秒
      let T = m + s + ss
      time.push(T) //歌词对应时间转换获取完毕
    })
    // console.log(time)
    setTimes(time)
    // console.log(word)
    setLyrics(word)
    console.log('解析歌词')
  }
  useEffect(() => {
    setTimeout(hidden, 100)
    return () => show()
  }, [])
  let dyTemp = 0
  //手势动画
  const _panResponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      if (gestureState.dx === 0 && gestureState.dy === 0) {
        return false
      } else {
        return true
      }
    },
    onPanResponderGrant: () => {
      dyTemp = currentIndex;
      setRollCheck(false)
    },
    onPanResponderMove: (evt, gestureState) => {
      setRollTop(x => x + gestureState.dy)
    },
    onPanResponderRelease: (evt, gestureState) => {
      setTimeout(() => {
        setRollCheck(true)
      },1000)
    }
  })

  return (
    <AnimatedContainer>
      <BackGroundImage source={{ uri: musicPicUrl }} />
      <BlurView tint='dark' intensity={100} style={[StyleSheet.absoluteFill]}>
        <HederText style={{ color: colors.text.replace('000', 'fffae5') }}>{musicName}</HederText>
        <View style={{ width: '100%', height: '60%', overflow: 'hidden' }}>
          {showLyric ? (
            <TouchableWithoutFeedback onPress={() => setShowLyric(false)}>
              <AnimatedLyricContainer>
                  <Animated.View
                    {..._panResponder.panHandlers}
                    style={{
                      position: 'absolute',
                      top: rollTop,
                      width: '70%',
                      marginTop: 200,
                      transform: [{ translateY: lyricRollHeightTemp }]
                    }}>
                    {lyrics.map((lyric, index) => <LyricRow
                      onPress={() => {soundObject.setPositionAsync(times[index])}}
                      style={[
                        { color: colors.text.replace('000', 'ccc') },
                        currentIndex === index ? styles.Highlight : {}
                      ]}
                      key={index}>
                      {lyric}
                    </LyricRow>)}
                  </Animated.View>
              </AnimatedLyricContainer>
            </TouchableWithoutFeedback>
          ) : (
              <TouchableWithoutFeedback onPress={() => setShowLyric(true)}>
                <AnimatedCenterImageBorder style={{
                  transform: [{ rotate: rotateInterpolate }]
                }}>
                  <CenterImage onPress={() => setShowLyric(true)} source={{ uri: musicPicUrl }} />
                </AnimatedCenterImageBorder>
              </TouchableWithoutFeedback>
            )}
        </View>
        <Footer>
          <Slider
            value={slideValue || 0}
            onValueChange={(value) => {
              // console.log(value)
              // console.log(durationTime)
              soundObject.setPositionAsync(value * durationTime)
            }}
            style={{ width: '90%' }}
            minimumTrackTintColor={isIos ? '#fffae5' : '#fff'}
            maximumTrackTintColor='#eee'
          />
          <Text>shijian</Text>
          <View style={styles.control}>
            <TouchableWithoutFeedback onPress={async () => {
              await upMusic(true)
              upMusic(false)
            }}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={40}
                color={colors.text.replace("000", "fffae5")}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={async () => {
              await toggleMusicState(true)
              await toggleMusicState(false)
            }}>
              <MaterialCommunityIcons
                name={isPlay ? "pause" : "play"}
                size={50}
                color={colors.text.replace("000", "fffae5")}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={async () => {
              await nextMusic(true)
              nextMusic(false)
            }}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={40}
                color={colors.text.replace("000", "fffae5")}
              />
            </TouchableWithoutFeedback>
          </View>
        </Footer>
        <Mask />
      </BlurView>
    </AnimatedContainer >
  )
}

function MapStateToProps(state) {
  return {
    musicContinue: state.ShowHeader,
    toggleUpMusic: state.toggleUpMusic,
    toggleDownMusic: state.toggleDownMusic,
    toggleMusicState: state.toggleMusicState,
    musicInfo: state.musicInfo
  };
}

function MapDispatchToProps(dispatch) {
  return {
    hidden: () => dispatch({
      type: 'HIDDEN_HEADER'
    }),
    show: () => dispatch({
      type: 'SHOW_HEADER'
    }),
    nextMusic: (action) => dispatch({
      type: 'DOWN_MUSIC',
      action
    }),
    upMusic: (action) => dispatch({
      type: 'UP_MUSIC',
      action
    }),
    toggleMusicState: (action) => dispatch({
      type: 'TOGGLE_MUSIC',
      action
    })
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(MusicLyricComponent)

const Mask = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  background-color: rgba(30,30,30,0.4);
  display: ${isIos ? 'none' : 'flex'};
  z-index: -1
`

const LyricRow = styled.Text`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 15px;
  text-align: center;
  color: #ccc;
`

const LyricContainer = styled.View`
  min-height: ${height * 0.7}px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100%;
  z-index: 2
`
const AnimatedLyricContainer = Animated.createAnimatedComponent(LyricContainer)

const Footer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${height * 0.23}px;
  min-height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  z-index:2
`

const CenterImageBorder = styled.View`
  width: 300px;
  height: 300px;
  border-radius: 300px;
  padding: 10px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${isIos ? height * 0.11 : height * 0.15}px auto;
`
const AnimatedCenterImageBorder = Animated.createAnimatedComponent(CenterImageBorder)

const CenterImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 200px;
`

const HederText = styled.Text`
  font-size: 20px;
  text-align: center;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  text-shadow: 0px 0px 1px #000;
  margin-top: 30px;
  margin-bottom: 10px;
  color: #fffae5;
  z-index: 2;
`

const BackGroundImage = styled.Image`
  width: ${Layout.window.width}px;
  height: ${Layout.window.height + 100}px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1
`

const Container = styled.View`
  width: ${Layout.window.width}px;
  height: ${Layout.window.height + 100}px;
  position: relative;
  overflow: hidden;
`
const AnimatedContainer = Animated.createAnimatedComponent(Container)
const styles = StyleSheet.create({
  control: {
    width: '100%',
    height: '40%',
    display: 'flex',
    paddingHorizontal: '10%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  Highlight: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16
  }
})
