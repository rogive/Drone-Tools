import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native'

export const Checklists = ({ navigation, route}) => {
  const [signedIn, setSignedIn] = useState(false)
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('https://st2.depositphotos.com/3265223/11545/v/950/depositphotos_115458896-stock-illustration-drone-icon-aerial-photography-drone.jpg')

  return (
    <View style={styles.container}>
      <View style={styles.containerBody}>
        <TouchableOpacity style={[styles.containerProfile]}>
          <Text 
            onPress={() => console.log("Boton presionado")} 
            style={styles.textProfile}
          >Ivan</Text>
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
  containerBody: {
    flex: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  containerProfile: {
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
  textProfile: {
    color: "#fff",
    fontSize: 14
  }
}); 