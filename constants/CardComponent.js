import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

const CardComponent = ({
  bgc,
  width,
  height,
  source,
  linearC,
  title,
  onPress,
  styles,
  titleStyle,
}) => {
  const S = source || {
    uri:
      "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1188145280,1376711857&fm=26&gp=0.jpg",
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => onPress && onPress()}
    >
      <Card
        bgc={bgc}
        width={width}
        height={height}
        style={{ elevation: 10, ...(styles || {}) }}
      >
        <Image source={S} />
        <LinearGradient
          style={{
            width: "100%",
            height: "50%",
            position: "absolute",
            bottom: 2,
            borderRadius: 5,
          }}
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0)",
            linearC || "#aaf",
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fffae5",
              fontWeight: "bold",
              fontSize: 30,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              transform: [{ translateY: 30 }],
              ...(titleStyle || {}),
            }}
          >
            {title}
          </Text>
        </LinearGradient>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const Image = styled.Image`
  width: 99%;
  height: 99%;
  position: absolute;
  z-index: -1;
  border-radius: 8px;
`;

const Card = styled.View`
  width: ${(props) => props.width || "48%"};
  max-height: ${(props) => props.height || "30%"};
  min-height: ${(props) => props.height || "30%"};
  background-color: ${(props) => props.bgc || "#fff"};
  position: relative;
  border-radius: 4px;
  /* overflow: hidden; */
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.6);
`;

export default CardComponent;
