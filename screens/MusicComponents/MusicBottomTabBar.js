import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import styled from "styled-components";
import AsyncStorage from "@react-native-community/async-storage";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
// import { Audio } from "expo-av";
import MusicLyricComponent from "./MusicLyricComponent";
import { connect } from "react-redux";

// const soundObject = new Audio.Sound(); // 必须写组件外边否则unloadAsync失效，不明所以
import soundObject from "../AudioSound";
import { cos } from "react-native-reanimated";

const MusicBottomTabBar = ({
  navigation,
  musicId,
  musicIndex,
  setMusicState,
  isPrevPlay,
  needAudio,
  setNeed,
  toggleUpMusic,
  toggleDownMusic,
  toggleMusicState,
  musicInfo
}) => {
  // console.log(`第${musicIndex}首，id是${musicId}`)
  const url = `https://api.imjad.cn/cloudmusic/?type=detail&id=${musicId}`;
  const musicUrl = `https://api.imjad.cn/cloudmusic/?type=song&id=${musicId}`;
  const [mp3Url, setMp3Url] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [musicName, setMusicName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isToggleMusic, setIsToggleMusic] = useState(false);
  const [prevMusicId, setPrevMusicId] = useState(-1);
  const [musicDurationTime, setMusicDurationTime] = useState(0);
  const translateY = new Animated.Value(0);
  useEffect(() => {
    getFetch();
  }, [musicId]);

  useEffect(() => {
    helloAudio();
  }, [mp3Url]);

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 80,
    }).start();
  }, []);

  async function helloAudio() {
    if (mp3Url == "") return;
    
    setPrevMusicId(musicId);
    await AsyncStorage.setItem('prevMusicUrl',mp3Url)
    // console.log(mp3Url)
    try {
      if (!needAudio && isPrevPlay === "true") {
        setNeed(true);
        return;
      }
      if (!needAudio && isPrevPlay === "false") {
        if (musicId === -1) {
          playAudio();
        } else {
          pauseAudio();
        }
        setMusicState();
        setNeed(true);
        return;
      }
      
      unloadAudio();
      await soundObject.loadAsync({ uri: mp3Url });
      await soundObject.playAsync();
      soundObject.setOnPlaybackStatusUpdate((state) => {
        if (state.didJustFinish) {
          // 如果播放完毕 切换下一曲
          nextMusic();
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  async function sendMusicInfo () {
    let state = await soundObject.getStatusAsync()
    setMusicDurationTime(state.durationMillis)
    musicInfo({musicId: musicId,musicName: musicName,musicPicUrl: picUrl,musicDurationTime: musicDurationTime})
    console.log({musicId: musicId,musicName: musicName,musicPicUrl: picUrl,musicDurationTime: musicDurationTime})
  }

  useEffect(() => {
    if (toggleUpMusic) {
      upMusic();
    }
  }, [toggleUpMusic]);
  useEffect(() => {
    if (toggleDownMusic) {
      nextMusic();
    }
  }, [toggleDownMusic]);
  useEffect(() => {
    if (toggleMusicState) {
      musicStateToggle();
    }
  }, [toggleMusicState]);

  // 把切换歌曲的方法抽离出来方便路由界面调用
  function nextMusic() {
    setIsToggleMusic(true);
    setMusicState("down");
  }

  function upMusic() {
    setIsToggleMusic(true);
    setMusicState("up");
  }

  function musicStateToggle() {
    if (musicId === -1) {
      playAudio();
    } else {
      pauseAudio();
    }
    setMusicState();
  }

  useEffect(() => {
    if (isPrevPlay === "true") {
      // console.log('音乐播放')
    } else if (isPrevPlay === "false") {
      //  console.log('音乐暂停')
    } else if (isPrevPlay === -1) {
      //  console.log('不操作')
    }
    return () => musicAction();
  }, []);
  async function musicAction() {
    const state = await soundObject.getStatusAsync();
    if (state.isLoaded) {
      // 有播放过音乐，音乐离开页面时是否播放
      await AsyncStorage.setItem("musicState", state.isPlaying.toString());      
    } else {
      // console.log('没有加载歌曲')
      await AsyncStorage.setItem("musicState", "");
    }
  }
  async function pauseAudio() {
    await soundObject.pauseAsync();
  }

  async function playAudio() {
    await soundObject.playAsync();
  }

  async function unloadAudio() {
    await soundObject.unloadAsync();
  }
  async function getFetch() {
    if (musicId === -1 && musicIndex === -1) return;
    Animated.spring(translateY, {
      toValue: 0,
    }).start();
    const state = await soundObject.getStatusAsync();
    if (musicId === -1) {
      // 点击了播放中的音乐 -- 暂停
      pauseAudio();
    } else {
      if (state.isLoaded && !isToggleMusic && prevMusicId === musicId) {
        // 暂停的音乐再次点击 -- 接着播放
        playAudio();
      } else {
        // 上一曲下一曲和点击新的歌曲
        // console.log('fetch')
        setIsLoading((action) => !action);
        setIsToggleMusic(false);
        fetch(musicUrl)
          .then((res) => res.json())
          .then((res) => {
            setMp3Url((url) => (url = res.data[0].url));
            // console.log(res.data[0].url)
          })
          .catch((err) => console.log(err));
        fetch(url)
          .then((res) => res.json())
          .then(async(res) => {
            let state = await soundObject.getStatusAsync()
            setMusicDurationTime(state.durationMillis)
            musicInfo({musicId: res.songs[0].id,musicName: res.songs[0].name,musicPicUrl: res.songs[0].al.picUrl})
            // console.log({musicId: res.songs[0].id,musicName: res.songs[0].name,musicPicUrl: res.songs[0].al.picUrl,musicDurationTime: musicDurationTime})
            setPicUrl((url) => (url = res.songs[0].al.picUrl));
            setMusicName((name) => (name = res.songs[0].name));
            setIsLoading((action) => !action);
          })
          .catch((err) => console.log(err));
      }
    }
  }

  const { colors } = useTheme();
  return (
    <AnimatedContainer
      style={{
        elevation: 10,
        transform: [
          {
            translateY,
          },
        ],
      }}
      bgc="#000"
    >
      <MusicPic
        source={{
          uri:
            picUrl ||
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1487216154,3804113326&fm=26&gp=0.jpg",
        }}
      />
      {isLoading ? (
        <ActivityIndicator animating={true} size={20} color="#fffae5" />
      ) : (
        <Text
          style={[
            styles.musicName,
            {
              color: colors.text.replace("000", "fffae5"),
            },
          ]}
          onPress={() =>
            navigation.push("musicLyric")
          }
        >
          {musicName}
        </Text>
      )}
      <View style={styles.control}>
        <TouchableWithoutFeedback onPress={() => upMusic()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={colors.text.replace("000", "fffae5")}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => musicStateToggle()}>
          <MaterialCommunityIcons
            name={musicId !== -1 ? "pause" : "play"}
            size={24}
            color={colors.text.replace("000", "fffae5")}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => nextMusic()}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={colors.text.replace("000", "fffae5")}
          />
        </TouchableWithoutFeedback>
      </View>
    </AnimatedContainer>
  );
};

function MapStateToProps(state) {
  return {
    toggleUpMusic: state.toggleUpMusic,
    toggleDownMusic: state.toggleDownMusic,
    toggleMusicState: state.toggleMusicState,
  };
}

function MapDispatchToProps (dispatch) {
  return {
    musicInfo : (info) => dispatch({
      type: 'MUSIC_INFO',
      info
    })
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(MusicBottomTabBar);

const MusicPic = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
  transform: translate(10px, -10px);
`;

const Container = styled.View`
  width: 100%;
  height: 80px;
  background-color: ${(props) => props.bgc || "#57f"};
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9;
  box-shadow: -5px 0 5px #000;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const styles = StyleSheet.create({
  control: {
    position: "absolute",
    width: "30%",
    right: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    top: 10,
  },
  musicName: {
    lineHeight: 80,
    fontSize: 20,
    width: "70%",
    position: "absolute",
    textAlign: "left",
    paddingLeft: 80,
    lineHeight: 40,
    overflow: "hidden",
  },
});
