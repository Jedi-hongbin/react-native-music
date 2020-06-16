import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import Layout from '../constants/Layout'
import CarouselComponent from './HomeScreenComponents/CarouselComponent'
import SearchbarComponent from './HomeScreenComponents/SearchbarComponent'
function HomeScreen(props) {
  return (
    <SafeAreaView style={{
      width: Layout.window.width,
      height: Layout.window.height,
      paddingHorizontal: 5
    }}>
      <View>
        <SearchbarComponent />
        <CarouselComponent data={CarouselData} />
      </View>
    </SafeAreaView>
  );
}

const CarouselData = [
  {uri:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1188145280,1376711857&fm=26&gp=0.jpg'},
  {uri:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4023546432,1206431687&fm=26&gp=0.jpg'},
  {uri:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2998484080,1217806697&fm=26&gp=0.jpg'},
  {uri:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3506915733,3194213640&fm=26&gp=0.jpg'},
];

export default HomeScreen;

const styles = StyleSheet.create({
  
});
