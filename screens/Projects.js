import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Button, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { AccordionList, Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'
import axios from 'axios'

export const Projects = () => {
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [toogleAdd, setToogleAdd] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.BACKEND_URL}/pilot/project/list`,
    })
      .then(({ data }) => {
        console.log(data)
        setProjects(data)
      })
      .catch((error) => console.log(error))
  }, [])

  function handleSubmitProjects() {
    const data = {
      name
    }
    console.log(data)

    axios({
      method: 'POST',
      url: `${process.env.BACKEND_URL}/pilot/project/create`,
      data: data
    }).then(({ data }) => {
      setProjects( projects.concat(data) )
      setToogleAdd(!toogleAdd)
      console.log(data)
    }).catch((error) => {
      setError(error)
      setToogleAdd(!toogleAdd)
      console.log(error)
    })
  }

  function headAccordion(item){
    return(
      <View style={{width: '100%', flexDirection:'row', alignItems:'center', padding:10, backgroundColor:'#004C99', borderBottomWidth:1, borderTopWidth:1}}>
        <Text style={{color: 'white'}}>{item.name}</Text>
      </View>
    )
  }

  function bodyAccordion(item){
    return (
      <View style={{padding:10, backgroundColor:'white'}}>
        <Text style={{textAlign:'center'}}>Aaron  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
      </View>
    )
  }

  return (
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
            onChangeText={text => setName(text)}
            value={name}
          />
          <View style={{alignItems: "center"}}>
            <TouchableOpacity
              style={styles.containerNewProject}
              onPress={handleSubmitProjects} 
            >
              <Text style={styles.textProfile}>Crear</Text>
            </TouchableOpacity>
          </View>
        </CollapseBody>
      </Collapse>
      <AccordionList
        list={projects}
        header={headAccordion}
        body={bodyAccordion}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerBody: {
    backgroundColor: '#F5F5F5',
    height: 750
  },
  containerNewProject: {
    height: 40,
    width: 120,
    backgroundColor: "rgba(21,42,113,1)",
    margin: 20,
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