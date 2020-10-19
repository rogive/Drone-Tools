import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Button, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'
import axios from 'axios'

export const Projects = () => {
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [toogleAdd, setToogleAdd] = useState(false)
  const [error, setError] = useState(null)

/*   useEffect(() => {
    axios({
      method: 'GET',
      baseURL: 'http://localhost:8000',
      url: '/pilot/project/list',
    })
      .then(({ data }) => {
        setPosts(data)
        console.log(data)
      })
      .catch((error) => console.log(error))
  }) */
  
  function handleSubmitProjects() {
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
            <Text style={{color: 'white'}}>+ Crear un nuevo proyecto</Text>
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
              onPress={handleSubmitProjects}
            />
          </CollapseBody>
        </Collapse>
        <Collapse style={{borderBottomWidth:1,borderTopWidth:1}}>
          <CollapseHeader style={{width: '100%',flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#004C99'}}>
              <Text style={{color: 'white'}}>Aerotech Supervision Torre</Text>
          </CollapseHeader>
          <CollapseBody>
              <Text>Aaron  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={{borderBottomWidth:1,borderTopWidth:1}}>
          <CollapseHeader style={{width: '100%',flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#004C99'}}>
              <Text style={{color: 'white'}}>APD Capacitacion Octubre</Text>
          </CollapseHeader>
          <CollapseBody>
              <Text>Aaron  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
          </CollapseBody>
        </Collapse>
      </View>
  </ScrollView>
/*     <View style={styles.container}>
      <View style={styles.containerBody}>
        <TouchableOpacity style={[styles.containerProfile]}>
          <Text 
            onPress={() => console.log("Boton presionado")} 
            style={styles.textProfile}
          >Ivan</Text>
        </TouchableOpacity>
      </View>
    </View> */
  )
}

const styles = StyleSheet.create({
  containerBody: {

  }
}); 