import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerItemList} from '@react-navigation/drawer'
import {Home} from './Home'
import {Profile} from './Profile'
import {Documents} from './Documents'
import {Statistics} from './Statistics'
import {Help} from './Help'

export const Lateral = ({route}) => {
  const [signedIn, setSignedIn] = useState(false)
  const [name, setName] = useState('Juan')
  const [lastname, setLastName] = useState('Perez')
  const [photoUrl, setPhotoUrl] = useState('https://st2.depositphotos.com/3265223/11545/v/950/depositphotos_115458896-stock-illustration-drone-icon-aerial-photography-drone.jpg')

  const CustomDrawer = (props) => (
    <View>
      <View
        style={{
          backgroundColor: 'rgba(21,42,113,1)',
          height: 153
        }}
      >
        <ImageBackground
          source={require("../src/data/pic(5).jpg")}
          resizeMode="cover"
          style={{ flex: 1, alignItems: "center", flexDirection: "column-reverse"}}
        >
          <View style={{flex: 1, flexDirection: "row", alignItems: "center", paddingTop: 20}}>
            <Image 
              style={{ width: 60, height: 60, borderRadius: 30}}
              source={{uri: photoUrl}}
            />
            <Text style={{ color: 'white', fontSize: 26, marginLeft: 10}}>
              {name + " " + lastname}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <DrawerItemList {...props} />
    </View>
  )

  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Inicio" component={Home} />
      <Drawer.Screen name="Perfil" component={Profile} />
      <Drawer.Screen name="Documentos" component={Documents} />
      <Drawer.Screen name="Estadistica" component={Statistics} />
      <Drawer.Screen name="Ayuda" component={Help} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(21,42,113,1)',
    flexDirection: 'column'
  }
}); 