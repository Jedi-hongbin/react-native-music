import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { Subheading, TouchableRipple } from "react-native-paper";
import AsyncStorage from '@react-native-community/async-storage'

const MusicSongList = forwardRef((props, ref) => {
  const musicList = useRef(null);
  const { songs, SelectedMusicId, prevMusicIndex } = props;
  const { colors } = useTheme();
  const [MusicId, setId] = useState(-1);
  const [MusicIndex, setIndex] = useState(-1);
  let listLength = songs?.length || 0;
  function selectMusic(id, index) {
    if (id !== MusicId) {
      setId((MusicId) => (MusicId = id));
    } else {
      setId((MusicId) => (MusicId = -1));
    }
    setIndex(index);
  }
  useEffect(() => {
    if (prevMusicIndex === -1) {
      // console.log('一切正常，没有需要操作的')
    }else {
      // console.log(`要操作第${prevMusicIndex}首`)
      selectMusic(songs[prevMusicIndex].id,prevMusicIndex)
    }
  },[])
  function reset(action) {
    // 播放暂停控制
    if (action == undefined) {
      if (MusicId === -1 && MusicIndex === -1) {
        setId((id) => (id = songs[0].id));
      } else if (MusicId === -1 && MusicIndex !== -1) {
        setId((id) => (id = songs[MusicIndex].id));
      } else {
        setId((id) => (id = -1));
      }
    } else if (action === "up") { // 上一曲
      if (MusicIndex === 0) {
        setId((id) => (id = songs[listLength - 1].id))
        setIndex(index => index = listLength - 1)
      }else {
        setId((id) => (id = songs[MusicIndex -1].id)) // 先触发id改变然后页面渲染
        setIndex(index => index - 1) // 先触发index改变页面不重绘id对应的index还是旧的
      }
    } else if (action === "down") { // 下一曲
      if (MusicIndex === listLength - 1) {
        setId((id) => (id = songs[0].id))
        setIndex(index => index = 0)
      }else {
        setId((id) => (id = songs[MusicIndex + 1].id))
        setIndex(index => index + 1)
      }
    }
  }
  useEffect(() => {
    SelectedMusicId(MusicId, MusicIndex);
    asyncData(MusicIndex)
  }, [MusicId]);
  async function asyncData (value) {
    try {
      await AsyncStorage.setItem('musicIndex',value.toString())
    } catch (error) {}
  }
  useImperativeHandle(
    ref,
    () => ({
      // musicList: musicList.current,
      reset,
    }),
    [MusicId]
  );
  return (
    <View
      ref={musicList}
      style={{
        marginBottom: 100,
        zIndex: 1
      }}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        本专辑共{songs.length}首歌曲
      </Text>
      {songs.map((song, index) => (
        <TouchableRipple
          key={index}
          style={styles.wrap}
          onPress={() => {
            selectMusic(song?.id, index);
          }}
        >
          <ListView
            bgc={colors.primary.replace("55f", "fffae5")}
          >
            <Subheading style={styles.index}>{index + 1}</Subheading>
            <TouchableWithoutFeedback
              onPress={() => selectMusic(song?.id, index)}
            >
              <View
                style={{
                  position: "absolute",
                  left: 55,
                }}
              >
                <AntDesign
                  name={MusicId === song?.id ? "pause" : "playcircleo"}
                  size={24}
                  color={colors.text}
                />
              </View>
            </TouchableWithoutFeedback>
            <Subheading
              style={{
                maxWidth: "50%",
                overflow: "scroll",
              }}
            >
              {song?.name}
            </Subheading>
            <Subheading style={styles.ar_name}>{song?.ar[0]?.name}</Subheading>
          </ListView>
        </TouchableRipple>
      ))}
    </View>
  );
});

const ListView = styled.View`
  height: 100%;
  background-color: ${(props) => props.bgc || "#fff"};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 2px 1px #000
`;

export default MusicSongList;

const styles = StyleSheet.create({
  ar_name: {
    position: "absolute",
    right: 0
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  index: {
    position: "absolute",
    left: 0,
    top: -2,
    height: "100%",
    width: 50,
    backgroundColor: "#000",
    textAlign: "center",
    lineHeight: 50,
    color: "#fffae5",
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 3,
    overflow: 'hidden'
  },
  wrap: {
    maxHeight: 50,
    marginTop: 10
  },
});
