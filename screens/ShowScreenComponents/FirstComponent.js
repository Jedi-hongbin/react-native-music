import * as React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Container } from "../../constants/styled";
import CardComponent from "../../constants/CardComponent";
import { useTheme } from "@react-navigation/native";
import Layout from "../../constants/Layout";
const { width, height } = Layout.window;
export default function LinksScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <ScrollView>
        <Container
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "space-evenly",
            width,
            height,
            marginBottom: 30,
            position: "relative",
          }}
        >
          <View style={styles.left}>
            <CardComponent
              source={{
                uri:
                  "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1128894792,4085654315&fm=26&gp=0.jpg",
              }}
              bgc={colors.primary}
              width="100%"
              height="40%"
              linearC={colors.text.replace("fffae5", "000")}
              title="建筑"
              onPress={() => console.log("jj")}
            />
            <CardComponent
              source={{
                uri:
                  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1355698262,841134634&fm=26&gp=0.jpg",
              }}
              bgc={colors.primary}
              width="100%"
              height="40%"
              linearC={colors.text.replace("000", "f88")}
              title="动漫"
            />
          </View>
          <View style={styles.right}>
            <CardComponent
              source={{
                uri:
                  "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1580952989,3292098892&fm=26&gp=0.jpg",
              }}
              bgc={colors.primary}
              width="100%"
              linearC={colors.text.replace("000", "8ff")}
              title="艺术"
            />
            <CardComponent
              source={{
                uri:
                  "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2010774926,331584039&fm=26&gp=0.jpg",
              }}
              bgc={colors.primary}
              width="100%"
              title="动物"
            />
            <CardComponent
              bgc={colors.primary}
              width="100%"
              linearC={colors.text.replace("000", "58f")}
              title="风景"
            />
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  left: {
    width: "50%",
    height: "100%",
    padding: 1,
  },
  right: {
    width: "50%",
    height: "100%",
    padding: 1,
  },
});
