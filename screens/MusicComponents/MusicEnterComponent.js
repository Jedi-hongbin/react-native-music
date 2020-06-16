import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, PanResponder, Animated } from "react-native";
import { Title } from "../../constants/styled";
import Layout from "../../constants/Layout";
import CardComponent from "../../constants/CardComponent";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components";
//https://api.imjad.cn/cloudmusic/?type=album&id=39483040

const data = [
  {
    name: "毛不易-平凡的一天",
    picSrc:
      "https://p2.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg",
    id: 39483040,
  },
  {
    name: "隔壁老樊-初秋和你",
    picSrc:
      "http://p1.music.126.net/o5-Fz1hiCCoa1x41JL27lA==/109951164457945952.jpg?param=277y277",
    id: 82853031,
  },
  {
    name: "李荣浩-麻雀",
    picSrc:
      "http://p2.music.126.net/TzlSVBiNtpRD2b7MT2Hi-w==/109951164527590793.jpg?param=177y177",
    id: 83878976,
  },
  {
    name: "薛之谦-尘",
    picSrc:
      "http://p2.music.126.net/DHUrNjC-1d6Snpcfg20Umw==/109951164583315133.jpg?param=177y177",
    id: 80003734,
  },
  {
    name: "李荣浩-作曲家",
    picSrc:
      "http://p1.music.126.net/E9Uxc_7nJs4k1Az7o1iP8Q==/5843904301809856.jpg?param=177y177",
    id: 2771296,
  },
];

const MusicEnterComponent = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  function toggleIndex(index) {
    return index < data.length - 1 ? index + 1 : 0;
  }
  useEffect(() => {
    Animated.spring(ScaleF, { toValue: 1, useNativeDriver: false }).start();
  }, [index]);
  const Theme = useTheme();
  const translateXYF = new Animated.ValueXY(0);
  const ScaleF = new Animated.Value(0.95);
  const translateYS = new Animated.Value(40);
  const ScaleS = new Animated.Value(0.8);
  const translateYT = new Animated.Value(0);
  const ScaleT = new Animated.Value(0.7);

  const maxMoveHeight = Layout.window.height * 0.2;
  const toHeight = Layout.window.height - 50;
  const _panResponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      if(gestureState.dx === 0 && gestureState.dy === 0) {
        return false
      } else {
        return true
      }
    },
    onPanResponderGrant: (evt, gestureState) => {
      Animated.spring(ScaleF, { toValue: 0.9 }).start();
      Animated.spring(translateYS, { toValue: 0 }).start();
      Animated.spring(ScaleS, { toValue: 0.9 }).start();
      Animated.spring(translateYT, { toValue: 30 }).start();
      Animated.spring(ScaleT, { toValue: 0.8 }).start();
    },
    onPanResponderMove: Animated.event(
      [null, { dx: translateXYF.x, dy: translateXYF.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > maxMoveHeight) {
        Animated.timing(translateXYF, {
          toValue: { x: 0, y: 800 },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(translateXYF, {
            toValue: { x: 0, y: 0 },
            duration: 0,
            useNativeDriver: false,
          }).start();
          setIndex((index) => toggleIndex(index));
          // 注意index变化后数据发生变动，页面重新渲染，状态回变回原来的值
        });
      } else {
        Animated.spring(translateXYF, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        Animated.spring(ScaleF, { toValue: 1 }).start();
        Animated.spring(translateYS, { toValue: 40 }).start();
        Animated.spring(ScaleS, { toValue: 0.8 }).start();
        Animated.spring(translateYT, { toValue: 0 }).start();
        Animated.spring(ScaleT, { toValue: 0.7 }).start();
      }
    },
  });

  return (
    <Container>
      <Title style={{ color: Theme.colors.text.replace("000", "59f") }}>
        album List
      </Title>
      <AnimatedCard
        {..._panResponder.panHandlers}
        style={{
          zIndex: 1,
          transform: [
            { translateX: translateXYF.x },
            { translateY: translateXYF.y },
            { scale: ScaleF },
          ],
        }}
      >
        <CardComponent
          source={{ uri: data[index].picSrc }}
          bgc={Theme.colors.primary}
          width="80%"
          height="60%"
          linearC={Theme.colors.text === "#000" ? "#fffae5" : "#000"}
          title={data[index].name}
          onPress={() => navigation.navigate("musicList",{ id: data[index].id })}
          styles={{
            borderRadius: 10,
            margin: 10,
            backgroundColor: Theme.colors.text === "#000" ? "#fffae5" : "#ccc",
          }}
          titleStyle={{
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
            textShadowColor: "#000",
            transform: [],
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: Theme.colors.text === "#000" ? "#fffae5" : "#ccc",
            paddingTop: 5,
            paddingBottom: 15,
          }}
        />
      </AnimatedCard>
      <AnimatedCard
        style={{
          zIndex: 0,
          transform: [{ translateY: translateYS }, { scale: ScaleS }],
        }}
      >
        <CardComponent
          source={{ uri: data[toggleIndex(index)].picSrc }}
          bgc={Theme.colors.primary}
          width="80%"
          height="60%"
          linearC="#fffae5"
          title={data[toggleIndex(index)].name}
          onPress={() => console.log("jj")}
          styles={{
            borderRadius: 10,
            backgroundColor: Theme.colors.text === "#000" ? "#fffae5" : "#ccc",
          }}
          titleStyle={{
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
            textShadowColor: "#000",
            transform: [],
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: Theme.colors.text === "#000" ? "#fffae5" : "#ccc",
            paddingTop: 5,
            paddingBottom: 15,
          }}
        />
      </AnimatedCard>
      <AnimatedCard
        style={{
          zIndex: -1,
          transform: [{ translateY: translateYT }, { scale: ScaleT }],
        }}
      >
        <CardComponent
          source={{ uri: data[toggleIndex(index + 1)].picSrc }}
          bgc={Theme.colors.primary}
          width="80%"
          height="60%"
          linearC="#fffae5"
          title={data[toggleIndex(index + 1)].name}
          onPress={() => console.log("jj")}
          styles={{
            borderRadius: 10,
            backgroundColor: Theme.colors.text === "#000" ? "#fffae5" : "#ccc",
          }}
          titleStyle={{
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
            textShadowColor: "#000",
            transform: [],
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: Theme.colors.text === "#000" ? "#fffae5" : "#ccc",
            paddingTop: 5,
            paddingBottom: 15,
          }}
        />
      </AnimatedCard>
    </Container>
  );
};

export default MusicEnterComponent;

const PanCard = styled.View`
  width: ${Layout.window.width}px;
  height: ${Layout.window.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  padding-bottom: 10%;
`;
const AnimatedCard = Animated.createAnimatedComponent(PanCard);
const Container = styled.View`
  width: ${Layout.window.width}px;
  height: ${Layout.window.height}px;
  padding: 10px;
  display: flex;
  align-items: center;
`;
