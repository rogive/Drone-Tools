import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>DRONE MANAGEMENT</Text>
      </View>
      <ImageBackground
        source={require("../src/data/pic(4).png")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <TouchableOpacity style={[styles.containerButtonRegister]}>
          <Text 
            onPress={() => navigation.navigate('Registro')} 
            style={styles.textRegister}
          >Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.containerButtonLogin]}>
          <Text 
            onPress={() => navigation.navigate('Registro')} 
            style={styles.textRegister}
          >Iniciar Sesión</Text>
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
  },
  containerButtonLogin: {
    height: 51,
    width: 176,
    backgroundColor: "rgba(21,42,113,1)",
    marginTop: 20,
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
  },
  containertextElevate: {
    marginTop: 20,
    backgroundColor: 'rgba(52, 52, 52, 0)'
  },
  textHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold'
  },
  textRegister: {
    color: "#fff",
    fontSize: 14
  },
  textLogin: {
    color: "#fff",
    fontSize: 14
  },
  textElevate: {
    color: "#fff",
    fontSize: 16,
    fontStyle: 'italic'
  }
}); 