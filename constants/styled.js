import * as React from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Title = styled.Text`
  font-size: ${(props) => props.size || "25px"};
  font-weight: ${(props) => props.weight || "bold"};
  text-align: center;
  text-transform: uppercase;
`;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.bgc || "transparent"};
`;

const Rect = styled.View`
  width: ${(props) => props.width || "200px"};
  height: ${(props) => props.height || "60px"};
  border-radius: ${(props) => props.radius || "5px"};
  overflow: hidden;
  margin-left: ${(props) => (props.center ? "auto" : "0px")};
  margin-right: auto;
  /* display: flex;
  justify-content: center;
  flex-flow: row wrap; */
`;

function HButton({
  width,
  height,
  center,
  title,
  titleColor,
  titleSize,
  onPress,
  iconName,
  iconColor,
  iconSize,
  LGColors,
}) {
  const colors = LGColors || ["pink", "#78f"];
  return (
    <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
      <Rect
        style={{ elevation: 5 }}
        center={center}
        width={width}
        height={height}
      >
        <LinearGradient style={styles.flex} colors={colors} start={[1, 1]}>
          <FontAwesome
            name={iconName || "home"}
            size={iconSize || 25}
            color={iconColor || "#000"}
            style={{ display: iconName ? "flex" : "none" }}
          />
          <Title
            size={titleSize}
            style={{
              color: titleColor || "#000",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            {title}
          </Title>
        </LinearGradient>
      </Rect>
    </TouchableWithoutFeedback>
  );
}

const RowView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => (props.nowrap ? "nowrap" : "wrap")};
`;

const ColumnView = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: ${(props) => (props.nowrap ? "nowrap" : "wrap")};
`;

export { Container, HButton, Title, RowView, ColumnView };
