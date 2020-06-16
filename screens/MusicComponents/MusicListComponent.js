import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Layout from "../../constants/Layout";
import styled from "styled-components";
import LoadingAnimated from "../../constants/LoadingAnimated";
import MusicListHeader from "./MusicListHeader";
import MusicDescription from "./MusicDescription";
import MusicSongList from "./MusicSongList";
import MusicBottomTabBar from "./MusicBottomTabBar";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import soundObject from '../AudioSound'
// import moment from "moment";
import { Title, Paragraph, useTheme } from "react-native-paper";

const MusicListComponent = ({
  navigation,
  route,
  showTabBar,
  hiddenTabBar,
}) => {
  const PaperTheme = useTheme();
  const ListRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState({});
  const [currentId, setCurrentId] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrevPlay, setIsPrevPlay] = useState(-1);
  const [prevMusicIndex, setPrevMusicIndex] = useState(-1);
  const [needAudio, setNeedAudio] = useState(true);
  function setNeed (need) {
    setNeedAudio(need)
  }
  function SelectedMusicId(id, index) {
    setCurrentId(id);
    setCurrentIndex(index);
    // ListRef?.current?.reset()  获取子组件种的方法，用ref获取
  }
  useEffect(() => {
    hiddenTabBar();
    isFirstEnter();
    return () => {
      storeAlbum(id);
      showTabBar();
    }; //组件卸载后tabBar显示
  }, []);
  async function isFirstEnter() {
    let isFirst = await AsyncStorage.getItem("album");
    if (isFirst) {
      if (isFirst === route.params.id.toString()) {
        console.log("不是第一次进入此专辑");
        let prevMusicIndex = await AsyncStorage.getItem("musicIndex");
        if (prevMusicIndex === -1) {
          getFetch();
        } else {
          let prevMusicUrl = await AsyncStorage.getItem('prevMusicUrl')
          let soundState = await soundObject.getStatusAsync()
          // console.log(soundState)
          // console.log(prevMusicUrl)
          if (prevMusicUrl){
            console.log(prevMusicUrl)
            if (soundState.isLoaded){
            }else {
              await soundObject.loadAsync({uri: prevMusicUrl})
              // await soundObject.unloadAsync()
              // let a = await soundObject.getStatusAsync()
              // console.log(a)
            }
          }
          // console.log("上次播放的是第" + prevMusicIndex + "首");
          setPrevMusicIndex(Number(prevMusicIndex))
          let musicIsPlaying = await AsyncStorage.getItem("musicState");
          // console.log(`音乐是否正在播放${musicIsPlaying}`);
          setNeed(false)
          setIsPrevPlay(musicIsPlaying);
          getFetch();
        }
      } else {
        console.log("第一次进入此专辑");
        getFetch();
      }
    }
  }
  const storeAlbum = async (value) => {
    try {
      await AsyncStorage.setItem("album", value.toString());
    } catch (e) {
      // saving error
    }
  };
  const id = route.params.id;
  const url = `https://api.imjad.cn/cloudmusic/?type=album&id=${id}`;
  function getFetch() {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setAlbum((album) => (album = res.album));
        setSongs((songs) => (songs = res.songs));
        setIsLoading((isLoading) => !isLoading);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      {isLoading ? (
        <>
          <LoadingAnimated isLoading={isLoading} />
        </>
      ) : (
        <View style={{ position: "relative" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View
              style={{
                paddingLeft: 15,
                paddingTop: 5,
                // zIndex: 1,
                width: 50,
              }}
            >
              <Ionicons
                name="md-return-left"
                size={24}
                color={PaperTheme.colors.text}
              />
            </View>
          </TouchableWithoutFeedback>
          <Paragraph
            style={{
              position: "absolute",
              padding: 5,
              textAlign: "center",
              width: "100%",
              zIndex: -1,
            }}
          >
            <Entypo name="price-tag" size={24} color={PaperTheme.colors.text} />
            <Title>{album?.name}</Title>
          </Paragraph>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  width: Layout.window.width,
                  minHeight: Layout.window.height,
                  padding: 10,
                }}
              >
                <MusicListHeader
                  name={album.name}
                  singerName={album.artist?.name}
                  picUrl={album.picUrl}
                  publicTime={album.publicTime}
                  company={album.company}
                  shareCount={album.info?.shareCount ?? "--"}
                  commentCount={album.info?.commentCount ?? "--"}
                />
                <MusicDescription description={album?.description} />
                <MusicSongList
                  ref={ListRef}
                  SelectedMusicId={SelectedMusicId}
                  songs={songs}
                  prevMusicIndex={prevMusicIndex}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
          <MusicBottomTabBar
            setMusicState={ListRef?.current?.reset}
            musicId={currentId}
            musicIndex={currentIndex}
            isPrevPlay={isPrevPlay}
            needAudio={needAudio}
            setNeed={setNeed}
            navigation={navigation}
          />
        </View>
      )}
    </>
  );
};

const Image = styled.Image`
  width: ${(props) => props.width || "150px"};
  height: ${(props) => props.height || "150px"};
  border-radius: 4px;
`;

function MapStateToProps(state) {
  return { tabBarVisible: state.tabBarVisible };
}

function MapDispatchToProps(dispatch) {
  return {
    showTabBar: () =>
      dispatch({
        type: "SHOW",
      }),
    hiddenTabBar: () =>
      dispatch({
        type: "HIDDEN",
      }),
  };
}
export default connect(MapStateToProps, MapDispatchToProps)(MusicListComponent);

const styles = StyleSheet.create({
  textCenter: {
    textAlign: "center",
    width: "100%",
  },
});
