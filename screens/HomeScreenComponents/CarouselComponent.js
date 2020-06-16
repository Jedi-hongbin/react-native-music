import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Carousel } from "@ant-design/react-native";
import { useTheme } from '@react-navigation/native'

const defaultData = [
  require("../../assets/images/4.jpg"),
  require("../../assets/images/5.jpg"),
];
function CarouselComponent({ data }) {
  const { dark } = useTheme()
  data = data || defaultData;
  return (
    <View>
      <Carousel
        dotStyle={{
          width: 10,
          height: 2,
        }}
        dotActiveStyle={{
          backgroundColor: "#fff",
        }}
        style={styles.wrapper}
        selectedIndex={0}
        autoplay
        infinite
      >
        {data.map((e, i) => (
          <View key={i} style={styles.containerHorizontal}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                marginHorizontal: "auto",
                borderRadius: 10,
              }}
              source={e}
              resizeMode="cover"
            />
          </View>
        ))}
      </Carousel>
      <View style={[styles.mask,{ display: dark ? 'flex' : 'none',position: dark ? 'absolute' : 'relative' }]} />
    </View>
  );
}

export default CarouselComponent;

const styles = StyleSheet.create({
  mask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute'
  },
  wrapper: {
    borderRadius: 10,
    // overflow: "hidden",
    elevation: 2
  },
  containerHorizontal: {
    height: 150,
    borderRadius: 10,
    width: "100%",
    // overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});
