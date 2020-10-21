import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Button, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Entypo'
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
      url: `${process.env.BACKEND_LINK}/pilot/project/list`,
    })
      .then(({ data }) => {
        setProjects(data)
      })
      .catch((error) => console.log(error))
  }, [])

  function handleSubmitProject() {
    const data = {
      name
    }
    axios({
      method: 'POST',
      url: `${process.env.BACKEND_LINK}/pilot/project/create`,
      data: data
    }).then(({ data }) => {
      setProjects( projects.concat(data) )
      setToogleAdd(!toogleAdd)
      setName('')
    }).catch((error) => {
      setError(error)
      setToogleAdd(!toogleAdd)
      setName('')
      console.log(error)
    })
  }

  function handleDeleteProject(idProject) {
    axios({
      method: 'DELETE',
      url: `${process.env.BACKEND_LINK}/pilot/project/deleteandlist/${idProject}`
    }).then(({ data }) => {
      setProjects( data )
    }).catch((error) => {
      console.log(error)
    })
  }

  function headAccordion(item){
    return(
      <View style={styles.containerHeadAccordion}>
        <Text style={{color: 'white', padding:8}}>{item.name}</Text>
        <TouchableOpacity onPress={()=>{ handleDeleteProject(item.id) }}>
            <Icon name={'trash'} size={18} color={'white'} style={{marginRight:10, marginLeft:10}}/>
        </TouchableOpacity> 
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
          style={{borderBottomWidth:1,borderTopWidth:1, borderColor:'white'}}
          isCollapsed={toogleAdd}
          onToggle={(isCollapsed)=>setToogleAdd(isCollapsed)}
        >
          <CollapseHeader style={{width: '100%', flexDirection:'row', alignItems:'center', padding:10, backgroundColor:'#004C99'}}>
            <Text style={{color: 'white'}}>+ Crear un nuevo proyecto</Text>
          </CollapseHeader>
          <CollapseBody style={{alignItems: "center"}}>
            <TextInput
              placeholder="Nombre del proyecto"
              onChangeText={text => setName(text)}
              value={name}
              style={styles.textNewProject}
            />
            <View>
              <TouchableOpacity
                style={styles.containerNewProject}
                onPress={handleSubmitProject} 
              >
                <Text style={styles.textProfile}>Crear</Text>
              </TouchableOpacity>
            </View>
          </CollapseBody>
        </Collapse>
        <View style={{backgroundColor: 'white'}}>
          <AccordionList
            list={projects}
            header={headAccordion}
            body={bodyAccordion}
            keyExtractor={item => `${item.id}`}
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerBody: {
    backgroundColor: '#F5F5F5',
    height: 750
  },
  containerHeadAccordion: {
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor:'#004C99',
    borderColor: 'white',
    borderBottomWidth:1
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
  textNewProject: {
    height: 40,
    width: 280,
    backgroundColor: "white",
    marginTop: 25,
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