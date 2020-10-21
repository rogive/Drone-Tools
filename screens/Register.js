import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'

export const Register = ({ navigation }) => {
  async function signInGmail() {
    try {
      const result = await Google.logInAsync({
        androidClientId: process.env.ANDROID_GMAIL_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        navigation.navigate('Lateral', {
          signedIn: true,
          name: result.user.givenName,
          lastName: result.user.familyName,
          photoUrl: result.user.photoUrl,
          email: result.user.email
        })
      } else {
        navigation.navigate('Main')
      }
    } catch (e) {
      console.log("error: ", e)
    }
  }

  async function signInFacebook() {
    try {
      await Facebook.initializeAsync({appId: process.env.ANDROID_FACEBOOK_CLIENT_ID});
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      })
      const {type, token} = result
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?fields=first_name,last_name,email,picture&access_token=${token}`);
        const user = (await response.json())
        navigation.navigate('Lateral', {
          signedIn: true,
          name: user.first_name,
          lastName: user.last_name,
          photoUrl: user.picture.data.url,
          email: user.email
        })
      } else {
        navigation.navigate('Main')
      }
    } catch (e) {
      console.log("error: ", e)
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>DRONE TOOLS</Text>
      </View>
      <ImageBackground
        source={require("../src/data/pic(1).png")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <TouchableOpacity style={[styles.containerButtonLogin]}>
          <Text 
            onPress={() => navigation.navigate('Lateral')} 
            style={styles.textLogin}
          >Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={styles.mainContainerTexto}>
          <View style={styles.secondaryContainerTexto}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flex: 1, borderBottomColor: 'rgba(21,42,113,1)', borderBottomWidth: 1}}/>
              <View style={{flex: 1, borderTopColor: 'rgba(21,42,113,1)', borderTopWidth: 1}}/>
            </View>
            <View style={{paddingLeft: 10, paddingRight: 10}}>
              <Text style={[styles.textO]}>o</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flex: 1, borderBottomColor: 'rgba(21,42,113,1)', borderBottomWidth: 1}}/>
              <View style={{flex: 1, borderTopColor: 'rgba(21,42,113,1)', borderTopWidth: 1}}/>
            </View>
          </View>
        </View>
        <View style={styles.containersigninplatforms}>
          <TouchableOpacity style={[styles.containerButtonRegisterFacebook]}>
            <View style={styles.containerImageSigninFacebook}>
              <View style={{flex: 3}}>
                <Image 
                  style={styles.imageFacebook}
                  source={require("../src/data/facebook-icon.png")}
                />
              </View>
              <View style={{flex: 6, alignItems:'center', justifyContent: 'center'}}>
                <Text 
                  onPress={() => { signInFacebook() }} 
                  style={styles.textRegisterFacebook}
                >Facebook</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.containerButtonRegisterGmail]}>
            <View style={styles.containerImageSigninGmail}>
              <View style={{flex: 3}}>
                <Image 
                  style={styles.imageGmail}
                  source={require("../src/data/gmail-icon.png")}
                />
              </View>
              <View style={{flex: 6, alignItems:'center', justifyContent: 'center'}}>
                <Text 
                  onPress={() => { signInGmail() }} 
                  style={styles.textRegisterGmail}
                >Google</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.containerButtonRegister]}>
          <Text 
            onPress={() => navigation.navigate('Registro')} 
            style={styles.textRegister}
          >¿Nuevo? Crear una cuenta</Text>
        </TouchableOpacity>
        <View style={styles.containerTextConditions}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={[styles.textConditions]}>Al elegir 'iniciar sesión' Facebook o Google, estas de acuerdo con las Condiciones y Política de Privacidad</Text>
          </View>
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
  mainContainerTexto: {
    height: 5,
    width: 280,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    minWidth: 88,
  },
  secondaryContainerTexto: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',

  },
  containerImageSigninFacebook: {
    flex: 1,
    flexDirection: 'row'
  },
  imageGmail: {
    width: 35,
    height: 35,
    left: 0
  },
  imageFacebook: {
    width: 35,
    height: 35,
    left: 0
  },
  imageBackground: {
    flex: 9,
    alignItems: "center",

  },
  containersigninplatforms: {
    height: 46,
    width: 280,
    marginTop: 15,
    justifyContent: "space-between",
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
  },
  containerButtonRegisterFacebook: {
    height: 46,
    width: 125,
    backgroundColor: "rgba(21,42,113,1)",
    justifyContent: "flex-start",
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
    paddingLeft: 2,
    paddingRight: 2
  },
  containerButtonRegisterGmail: {
    height: 46,
    width: 125,
    backgroundColor: "white",
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
    paddingLeft: 2,
    paddingRight: 2
  },
  containerButtonRegister: {
    height: 46,
    width: 280,
    backgroundColor: "white",
    borderColor: "rgba(21,42,113,1)",
    borderWidth: 1,
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
    height: 46,
    width: 280,
    backgroundColor: "rgba(21,42,113,1)",
    marginTop: 415,
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
  containerTextConditions: {
    height: 46,
    width: 280,
    marginTop: 5
  },
  textHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold'
  },
  textRegister: {
    color: "rgba(21,42,113,1)",
    fontSize: 14
  },
  textRegisterFacebook: {
    color: "#fff",
    fontSize: 14,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  textRegisterGmail: {
    color: "rgba(21,42,113,1)",
    fontSize: 14,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  textLogin: {
    color: "#fff",
    fontSize: 14
  },
  textO: {
    color: "rgba(21,42,113,1)",
    fontSize: 16,
    fontStyle: 'italic'
  },  
  textConditions: {
    color: "#fff",
    fontSize: 12,
    fontStyle: 'italic'
  }
}); 