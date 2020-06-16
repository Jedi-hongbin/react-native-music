import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated, ScrollView } from "react-native";
import {
  Caption,
} from "react-native-paper";

const MusicDescription = ({ description }) => {
  const [openDescription, setOpenDescription] = useState(false);
  const innerHeight = new Animated.Value(0);
  const ScrollRef = useRef(null)
  const Height = innerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 600],
  });
  function isOpenDescription () {
    if (openDescription) {
      Animated.spring(innerHeight, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(innerHeight, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      ScrollRef.current && ScrollRef.current.scrollTo({ x: 0, y: 0, animated: true })
    }
  }
  useEffect(() => {
    isOpenDescription()
  }, [openDescription])
  return (
    <Animated.View
      style={{
        height: Height,
        overflow: "hidden",
        marginTop: 10,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        专辑介绍：
      </Text>
      <View
        style={{
          paddingLeft: 10,
          position: "relative",
        }}
      >
        <ScrollView ref={ScrollRef} nestedScrollEnabled scrollEnabled={openDescription}>
          <Caption>{description}</Caption>
        </ScrollView>
        <Text
          onPress={() => {
            setOpenDescription((openDescription) => !openDescription);
          }}
          style={{
            color: "#5af",
            marginLeft: "auto",
            position: "absolute",
            top: 0,
            right: 20,
          }}
        >
          {openDescription ? "关闭" : "展开"}
        </Text>
      </View>
    </Animated.View>
  );
};

export default MusicDescription;

const styles = StyleSheet.create({});
