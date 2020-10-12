import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground,Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as Google from 'expo-google-app-auth'

export const Main = ({ navigation, route}) => {
  const [signedIn, setSignedIn] = useState(false)
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('https://st2.depositphotos.com/3265223/11545/v/950/depositphotos_115458896-stock-illustration-drone-icon-aerial-photography-drone.jpg')
  //360 780


  useEffect( () => {
    setSignedIn(route.params.signedIn)
    setName(route.params.name)
    setPhotoUrl(route.params.photoUrl)
    console.log(signedIn)
    console.log(name)
    console.log(photoUrl)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>DRONE MANAGEMENT</Text>
      </View>
      <ImageBackground
        source={require("../src/data/pic(3).jpeg")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Image 
          style={styles.containerImageProfile}
          source={{uri: photoUrl}}
        />
        <TouchableOpacity style={[styles.containerButtonRegister]}>
          <Text 
            onPress={() => console.log("Boton presionado")} 
            style={styles.textProfile}
          >{name}</Text>
        </TouchableOpacity>
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
  containerImageProfile: {
    marginTop: 200,
    width: 50,
    height: 50
  },
  containerButtonRegister: {
    height: 51,
    width: 176,
    backgroundColor: "rgba(21,42,113,1)",
    marginTop: 50,
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
  },
  textProfile: {
    color: "#fff",
    fontSize: 14
  }
}); 