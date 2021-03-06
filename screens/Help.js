import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

export const Help = ({route, navigation}) => {
  const [signedIn, setSignedIn] = useState(false)
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('https://st2.depositphotos.com/3265223/11545/v/950/depositphotos_115458896-stock-illustration-drone-icon-aerial-photography-drone.jpg')

  const Tab = createMaterialTopTabNavigator()

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>DRONE TOOLS</Text>
      </View>
      <View style={styles.containerBody}>
        <TouchableOpacity style={[styles.containerHelp]}>
          <Text 
            onPress={() => navigation.openDrawer()} 
            style={styles.textHelp}
          >Screen en construcción</Text>
        </TouchableOpacity>
      </View>
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
    height: 40,
    backgroundColor: 'rgba(21,42,113,1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  containerBody: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  textHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold'
  },
}); 