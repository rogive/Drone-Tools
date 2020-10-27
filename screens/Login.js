import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export const Registro = ({ route }) => {

  async function handleToken() {
    const token = await AsyncStorage.getItem('token')
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>DRONE TOOLS</Text>
      </View>
      <ImageBackground
        source={require("../src/data/pic(4).jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <TouchableOpacity style={[styles.containerButtonRegister]}>
          <Text 
            onPress={() => navigation.navigate('Registro')} 
            style={styles.textRegister}
          >Registrarse</Text>
        </TouchableOpacity>
        <View style={styles.containertextElevate}>
          <Text style={[styles.textElevate]}>Eleva tus proyectos a otro nivel</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(21,42,113,1)',
    flexDirection: 'column'
  },
  containerHeader: {
    flex: 1,
    backgroundColor: 'rgba(21,42,113,1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  imageBackground: {
    flex: 9,
    alignItems: "center"
  },
  containerButtonRegister: {
    height: 51,
    width: 176,
    backgroundColor: "rgba(21,42,113,1)",
    marginTop: 440,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  }
});

