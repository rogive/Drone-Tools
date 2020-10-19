import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from 'react-native'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'

export const FlightPermits = ({ navigation, route}) => {
  const [signedIn, setSignedIn] = useState(false)
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('https://st2.depositphotos.com/3265223/11545/v/950/depositphotos_115458896-stock-illustration-drone-icon-aerial-photography-drone.jpg')

  return (
    <ScrollView style={{flexDirection: 'column'}}>
      <View style={{ backgroundColor: '#F5F5F5', height: 750}}>
        <Collapse style={{borderBottomWidth:1,borderTopWidth:1}}>
          <CollapseHeader style={{width: '100%',flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#004C99'}}>
              <Text style={{color: 'white'}}>+ Crear un nuevo permiso de vuelo</Text>
          </CollapseHeader>
          <CollapseBody>
              <Text> Registro </Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={{borderBottomWidth:1,borderTopWidth:1}}>
          <CollapseHeader style={{width: '100%',flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#004C99'}}>
              <Text style={{color: 'white'}}>Chia Inspeccion Torres</Text>
          </CollapseHeader>
          <CollapseBody>
              <Text>Aaron  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={{borderBottomWidth:1,borderTopWidth:1}}>
          <CollapseHeader style={{width: '100%',flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#004C99'}}>
              <Text style={{color: 'white'}}>Soacha Supervision Rio</Text>
          </CollapseHeader>
          <CollapseBody>
              <Text>Aaron  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
          </CollapseBody>
        </Collapse>
      </View>
    </ScrollView>
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
    marginTop: 25,
    height: 750
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