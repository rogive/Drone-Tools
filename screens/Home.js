import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as Google from 'expo-google-app-auth'

export const Home = ({ navigation }) => {
  async function signInGmail() {
    try {
      const result = await Google.logInAsync({
        androidClientId: process.env.ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        //return result.accessToken;
        console.log(result.accessToken)
        navigation.navigate('Main', {
          signedIn: true,
          name: result.user.givenName,
          lastName: result.user.familyName,
          photoUrl: result.user.photoUrl,
          email: result.user.email
        })
      } else {
        navigation.navigate('Home')
      }
    } catch (e) {
      console.log("error: ", e)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>DRONE MANAGEMENT</Text>
      </View>
      <ImageBackground
        source={require("../src/data/pic(1).png")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <TouchableOpacity style={[styles.containerButtonRegisterGmail]}>
          <View style={styles.containerImageSigninGmail}>
            <View style={{}}>
              <Image 
                style={styles.imageGmail}
                source={require("../src/data/gmail-icon.png")}
              />
            </View>
            <View style={{alignItems:'center', justifyContent: 'center', width: 170}}>
              <Text 
                onPress={() => { signInGmail() }} 
                style={styles.textRegisterGmail}
              >Registrarse con Google</Text>
            </View>
          </View>
        </TouchableOpacity>
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
  containerImageSigninGmail: {
    flex: 1,
    flexDirection: 'row'
  },
  imageGmail: {
    width: 49,
    height: 49,
    left: 0
  },
  imageBackground: {
    flex: 9,
    alignItems: "center"
  },
  containerButtonRegisterGmail: {
    height: 51,
    width: 220,
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
    paddingLeft: 1,
    paddingRight: 16
  },
  containerButtonRegister: {
    height: 51,
    width: 220,
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
  containerButtonLogin: {
    height: 51,
    width: 220,
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
  textRegisterGmail: {
    color: "#fff",
    fontSize: 14,
    alignItems: 'center',
    fontWeight: 'bold'
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