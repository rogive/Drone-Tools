import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'

export const Main = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
      <ImageBackground
        source={require("../src/data/pic(1).png")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={{flex: 1, flexDirection: "column-reverse", alignItems: 'center'}}>
          <View style={styles.containerTextConditions}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={[styles.textConditions]}>Al elegir 'iniciar sesión' Facebook o Google, estas de acuerdo con las Condiciones y Política de Privacidad</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.containerButtonRegister]}
            onPress={() => navigation.navigate('Register')} 
          >
            <Text style={styles.textRegister}
            >¿Nuevo? Crear una cuenta</Text>
          </TouchableOpacity>
          <View style={styles.containersigninplatforms}>
            <TouchableOpacity
              style={styles.containerButtonRegisterFacebook}
              onPress={() => { signInFacebook() }}
            >
              <View style={styles.containerImageSigninFacebook}>
                <View style={{flex: 3}}>
                  <Image 
                    style={styles.imageFacebook}
                    source={require("../src/data/facebook-icon.png")}
                  />
                </View>
                <View style={{flex: 6, alignItems:'center', justifyContent: 'center'}}>
                  <Text style={styles.textRegisterFacebook}
                  >Facebook</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.containerButtonRegisterGmail]} 
              onPress={() => { signInGmail() }} 
            >
              <View style={styles.containerImageSigninGmail}>
                <View style={{flex: 3}}>
                  <Image 
                    style={styles.imageGmail}
                    source={require("../src/data/gmail-icon.png")}
                  />
                </View>
                <View style={{flex: 6, alignItems:'center', justifyContent: 'center'}}>
                  <Text 
                    style={styles.textRegisterGmail}
                  >Google</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
          <TouchableOpacity 
            style={[styles.containerButtonLogin]} 
            onPress={() => navigation.navigate('Lateral')}
          >
            <Text style={styles.textLogin}
            >Iniciar Sesión</Text>
          </TouchableOpacity>
          <TextInput
            placeholder=" Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
            style={{backgroundColor: 'white', height: 40, width: 280, marginBottom: 10}}
          />
          <TextInput
            placeholder=" Email"
            onChangeText={text => setEmail(text)}
            value={email}
            secureTextEntry
            style={{backgroundColor: 'white', height: 40, width: 280, marginBottom: 10}}
          />
          <View style={{height: 30, width: 280, marginBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{flex: 1, color: "rgba(21,42,113,1)", fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', alignItems: 'center', justifyContent: 'center'}}
            >Iniciar Sesión</Text>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}
            >DRONE TOOLS</Text>
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
  containerTitle: {
    height: 70,
    width: 220,
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 20,
    marginBottom: 220,
    backgroundColor: 'white',
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
  textTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    color: "rgba(21,42,113,1)",
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'Verdana'
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
    marginBottom: 10,
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
    flexDirection: "column-reverse"
  },
  containersigninplatforms: {
    height: 40,
    width: 280,
    marginBottom: 10,
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
    height: 40,
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
    height: 40,
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
    height: 40,
    width: 280,
    backgroundColor: "white",
    borderColor: "rgba(21,42,113,1)",
    borderWidth: 1,
    marginBottom: 10,
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
    height: 40,
    width: 280,
    backgroundColor: "rgba(21,42,113,1)",
    marginBottom: 10,
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
    height: 40,
    width: 280,
    marginBottom: 2,
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
    flex: 1,
    color: "#fff",
    fontSize: 12,
    fontStyle: 'italic',
    alignItems: 'center',
    justifyContent: 'center'
  }
}); 