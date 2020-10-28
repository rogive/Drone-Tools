import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Picker, ScrollView } from 'react-native'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Categories from '../src/data/categories.json'
import Icon from 'react-native-vector-icons/Entypo'
import Drones from '../src/data/drones.json'
import axios from 'axios'

export const Flightlogs = ({ navigation, route}) => {
  const [flightlogs, ss] = useState([])
  const [projects, setProjects] = useState([])
  const [nameRegistry, setNameRegistry] = useState('')
  const [timeFlightLog, setTimeFlightlog] = useState('')
  const [takeoff, setTakeOff] = useState('')
  const [toogleAdd, setToogleAdd] = useState(false)
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedCategorie, setSelectedCategorie] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("DJI")
  const [currModels, setCurrModels] = useState(Drones.filter(e => e.id === 0)[0].models)
  const [selectedModel, setSelectedModel] = useState("Phantom 1")
  const [pilotId, setPilotId] = useState('')
  const [error, setError] = useState(null)
  handletoken()
  async function handletoken() {
    try {
      const token = await AsyncStorage.getItem('token')
      const PilotId = await AsyncStorage.getItem('pilotId')
      setPilotId(PilotId)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: `${Expo.Constants.manifest.extra.servidorb}`,
      url: `/pilot/project/listbypilot/${pilotId}`,
    }).then(({ data }) => {
      setProjects(data)
    }).catch((error) => console.log(error))
    axios({
      method: 'GET',
      baseURL: `${Expo.Constants.manifest.extra.servidorb}`,
      url: `/pilot/flightlog/listbypilot/${pilotId}`,
    }).then(({ data }) => {
      setFlightlogs(data)
    }).catch((error) => console.log(error))
  }, [pilotId])

  function handleSubmitFlightlog() {
    const data = {
      name: nameRegistry,
      project: selectedProject,
      categorie: selectedCategorie,
      brand: selectedBrand,
      model: selectedModel,
      flighttime: timeFlightLog,
      takeoff,
      PilotId: pilotId
    }
    console.log(data)
    axios({
      method: 'POST',
      baseURL: `${Expo.Constants.manifest.extra.servidorb}`,
      url: `/pilot/flightlog/create`,
      data: data
    }).then(({ data }) => {
      setFlightlogs( flightlogs.concat(data) )
      setToogleAdd(!toogleAdd)
    }).catch((error) => {
      setError(error)
      setToogleAdd(!toogleAdd)
      console.log(error)
    })
  }

  const mapProjects = (items) => {
    return items.map( project => {
      return(
        <Picker.Item label={project.name} value={project.name} key={project.id}/>
      )
    })
  }

  const mapCategories = (categories) => {
    return categories.map( categorie => {
      return(
        <Picker.Item label={categorie.id} value={categorie.id} key={categorie._id}/>
      )
    })
  }

  const mapDrones = (drones) => {
    return drones.map( drone => {
      return(
        <Picker.Item label={drone.brand} value={drone.brand} key={drone.id}/>
      )
    })
  }

  const mapModels = (models) => {
    return models.map( model => {
      return(
        <Picker.Item label={model.name} value={model.name} key={model.name}/>
      )
    })
  }
  function handleChangeBrand(itemBrand) {
    console.log(itemBrand)
    setSelectedBrand(itemBrand)
    setCurrModels(Drones.filter(e => e.brand === itemBrand)[0].models)
  }

  function handleDeleteFlightlog(idProject) {
    axios({
      method: 'DELETE',
      baseURL: `${Expo.Constants.manifest.extra.servidorb}`,
      url: `/pilot/flightlog/deleteandlist/${idProject}`
    }).then(({ data }) => {
      setFlightlogs( data )
    }).catch((error) => {
      console.log(error)
    })
  }

  function headAccordion(item){
    return(
      <View style={styles.containerHeadAccordion}>
        <Text style={{color: 'white', padding:8}}>{item.name}</Text>
        <TouchableOpacity onPress={()=>{ handleDeleteFlightlog(item.id) }}>
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
    <ScrollView style={{flexDirection: 'column'}}>
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
              placeholder="Nombre del registro"
              onChangeText={text => setNameRegistry(text)}
              value={nameRegistry}
              style={styles.inputText}
            />
            <View style={styles.pickerNewFlightlog}>
              <Picker
                selectedValue={selectedProject}
                style={{ height: 40, width: 280, color: '#A5A5A5'}}
                onValueChange={(itemValue, itemIndex) => setSelectedProject(itemValue)}
                itemStyle={{ fontSize: 10 }}
              >
                <Picker.Item label="Seleccione un proyecto" value="" />
                {mapProjects(projects)}
              </Picker>
            </View>
            <View style={styles.pickerNewFlightlog}>
              <Picker
                selectedValue={selectedCategorie}
                style={{ height: 40, width: 280, color: '#A5A5A5'}}
                onValueChange={(itemCategorie, index) => setSelectedCategorie(itemCategorie)}
                itemStyle={{ fontSize: 10 }}
              >
                <Picker.Item label="Tipo de Operación" value="" />
                {mapCategories(Categories)}
              </Picker>
            </View>
            <View style={styles.pickerNewFlightlog}>
              <Picker
                selectedValue={selectedBrand}
                style={{ height: 40, width: 280, color: '#A5A5A5'}}
                onValueChange={(itemBrand, index) => { handleChangeBrand(itemBrand)}}
                itemStyle={{ fontSize: 10 }}
              >
                {mapDrones(Drones)}
              </Picker>
            </View>
            <View style={styles.pickerNewFlightlog}>
              <Picker
                selectedValue={selectedModel}
                style={{ height: 40, width: 280, color: '#A5A5A5'}}
                onValueChange={(itemModel, index) => setSelectedModel(itemModel) }
                itemStyle={{ fontSize: 10 }}
              >
                {mapModels(currModels)}
              </Picker>
            </View>
            <TextInput
              placeholder="Horas de vuelo"
              onChangeText={text => setTimeFlightlog(text)}
              value={timeFlightLog}
              style={styles.inputText}
            />
            <TextInput
              placeholder="Despegues / Aterrizajes"
              onChangeText={text => setTakeOff(text)}
              value={takeoff}
              style={styles.inputText}
            />
            <View>
              <TouchableOpacity
                style={styles.containerNewFlightlog}
                onPress={handleSubmitFlightlog} 
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
  containerHeadAccordion: {
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor:'#004C99',
    borderColor: 'white',
    borderBottomWidth:1
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
  },
  containerNewFlightlog: {
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
  inputText: {
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
    paddingRight: 16,
    fontSize: 16,
    color: '#A5A5A5'
  },
  pickerNewFlightlog: {
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
    paddingLeft: 30,
    paddingRight: 15
  }
}); 