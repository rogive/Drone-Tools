import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Button, ScrollView } from 'react-native'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'

export const Flightlogs = ({ navigation, route}) => {
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [toogleAdd, setToogleAdd] = useState(false)
  const [error, setError] = useState(null)

  function handleSubmitFlightlogs() {
    const data = {
      name
    }
    console.log(data)

    axios({
      method: 'POST',
      baseURL: 'http://localhost:8000',
      //baseURL: `${process.env.BACKEND_URL}`,
      url: '/pilot/project/create',
      data: data
    }).then(({ data }) => {
      setProjects( projects.concat(data) )
      setShowAdd(!toogleAdd)
      console.log(data)
    }).catch((error) => {
      setError(error)
      setToogleAdd(!toogleAdd)
      console.log(error)
    })
  }

  return (
    <ScrollView style={{flexDirection: 'column'}}>
      <View style={{ backgroundColor: '#F5F5F5', height: 750}}>
      <Collapse 
          style={{borderBottomWidth:1,borderTopWidth:1}}
          isCollapsed={toogleAdd}
          onToggle={(isCollapsed)=>setToogleAdd(isCollapsed)}
        >
          <CollapseHeader style={{width: '100%', flexDirection:'row', alignItems:'center', padding:10, backgroundColor:'#004C99'}}>
            <Text style={{color: 'white'}}>+ Crear una nueva bitácora de vuelo</Text>
          </CollapseHeader>
          <CollapseBody>
            <Text> NUEVO PROYECTO </Text>
            <TextInput
              placeholder="Nombre del proyecto"
              onChangeText={text => {
                console.log(text)
                setName(text)
              }}
              value={name}
            />
            <Button
              title="Crear"
              onPress={handleSubmitFlightlogs}
            />
          </CollapseBody>
        </Collapse>
        <Collapse
          style={{borderBottomWidth:1,borderTopWidth:1}}
        >
          <CollapseHeader style={{width: '100%',flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#004C99'}}>
              <Text style={{color: 'white'}}>AEROTECH</Text>
          </CollapseHeader>
          <CollapseBody>
              <Text>Aaron  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
          </CollapseBody>
        </Collapse>
        <Collapse 
          style={{borderBottomWidth:1,borderTopWidth:1}}
        >
          <CollapseHeader style={{width: '100%',flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#004C99'}}>
              <Text style={{color: 'white'}}>CLUB DE PROFESIONALES DE DRONES</Text>
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