import React, { Component } from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import MaterialButtonViolet from "../src/components/MaterialButtonViolet";
import MaterialButtonViolet1 from "../src/components/MaterialButtonViolet1";
import MaterialHeader1 from "../src/components/MaterialHeader1";

export const Home = ({ navigation }) => {
  async function handleLogin() {
    const token = 'soyuntokenfeliz'
    await AsyncStorage.setItem('token', token)
  }
  const image = { uri: "https://www.smartcitiesworld.net/AcuCustom/Sitename/DAM/010/opinion-nov2017-transport-dronescartoon_Cropped.jpg" };
  return (
    <View style={styles.container}>
      <View style={styles.imageStack}>
        <ImageBackground
          source={require("../src/data/pic(4).png")}
          resizeMode="contain"
          style={styles.image}
          imageStyle={styles.image_imageStyle}
        >
          <MaterialButtonViolet
            style={styles.materialButtonViolet}
          ></MaterialButtonViolet>
          <MaterialButtonViolet1
            style={styles.materialButtonViolet1}
          ></MaterialButtonViolet1>
        </ImageBackground>
        <MaterialHeader1 style={styles.materialHeader1}></MaterialHeader1>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    top: 19,
    left: 0,
    width: 438,
    height: 689,
    position: "absolute"
  },
  image_imageStyle: {},
  materialButtonViolet: {
    height: 51,
    width: 176,
    backgroundColor: "rgba(21,42,113,1)",
    marginTop: 444,
    marginLeft: 133
  },
  materialButtonViolet1: {
    height: 51,
    width: 176,
    backgroundColor: "rgba(21,42,113,1)",
    marginTop: 20,
    marginLeft: 133
  },
  materialHeader1: {
    height: 59,
    width: 360,
    position: "absolute",
    left: 46,
    top: 0
  },
  imageStack: {
    width: 438,
    height: 708,
    marginLeft: -46
  }
});

export default Home;
