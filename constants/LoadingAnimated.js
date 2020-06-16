import React, { useEffect } from "react";
import { StyleSheet, View, Platform, Animated } from "react-native";
import LottieView from "lottie-react-native";
import Layout from "./Layout";
import { BlurView } from "expo-blur";
import { ActivityIndicator } from "react-native-paper";

const AnimatedView = Animated.createAnimatedComponent(View);

const LoadingAnimated = ({ isLoading }) => {
  let animatedRef = null;
  let top = new Animated.Value(0);
  function onAnimated() {
    animatedRef?.play();
    Animated.spring(top,{
      toValue: isLoading ? 0 : 800
    }).start()
  }
  useEffect(() => {
    onAnimated();
  }, [isLoading]);
  return (
    <AnimatedView
      style={{
        width: Layout.window.width,
        height: Layout.window.height,
        position: "absolute",
        top,
        left: 0,
      }}
    >
      <BlurView intensity={85} style={[StyleSheet.absoluteFill]}>
        {Platform.OS === "ios" ? (
          <LottieView
            source={require("../assets/images/loading-paperplane.json")}
            ref={(animated) => {
              animatedRef = animated;
            }}
            autoPlay={false}
            // loop
            style={{
              marginBottom: 80,
            }}
          />
        ) : (
          <ActivityIndicator
            style={{
              marginTop: "auto",
              marginBottom: "auto",
            }}
            animating={true}
            size={70}
            color="#78f"
          />
        )}
      </BlurView>
    </AnimatedView>
  );
};

export default LoadingAnimated;

const styles = StyleSheet.create({});
