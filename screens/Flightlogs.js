import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Picker, ScrollView } from 'react-native'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'
import axios from 'axios'

export const Flightlogs = ({ navigation, route}) => {
  const [flightlogs, setFlightlogs] = useState([])
  const [projects, setProjects] = useState([])
  const [nameRegistry, setName] = useState('')
  const [nameClient, setNameClient] = useState('')
  const [timeFlightlog, setTimeFlightlog] = useState('')
  const [takeoff, setTakeoff] = useState('')
  const [toogleAdd, setToogleAdd] = useState(false)
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState(null)

  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: `${process.env.SERVIDORB}`,
      url: `/pilot/project/list`,
    }).then(({ data }) => {
      setProjects(data)
    }).catch((error) => console.log(error))
  }, [])

  function handleSubmitFlightlog() {
    const data = {
      name
    }
    axios({
      method: 'POST',
      baseURL: `${process.env.SERVIDORB}`,
      url: `/pilot/flightlog/create`,
      data: data
    }).then(({ data }) => {
      setFlightlogs( flightlogs.concat(data) )
      setToogleAdd(!toogleAdd)
      setName('')
    }).catch((error) => {
      setError(error)
      setToogleAdd(!toogleAdd)
      setName('')
      console.log(error)
    })
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
            <View style={styles.pickerNewFlightlog}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 40, width: 280, color: '#A5A5A5'}}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Seleccione un proyecto" value="" />
                <Picker.Item label="Proyecto 1" value="java" />
                <Picker.Item label="Proyecto 2" value="js" />
              </Picker>
            </View>
            <TextInput
              placeholder="Nombre del registro"
              onChangeText={text => setName(text)}
              value={nameRegistry}
              style={styles.inputNewFlightlog}
            />
            <TextInput
              placeholder="Empresa o Cliente"
              onChangeText={text => setName(text)}
              value={nameClient}
              style={styles.inputNewFlightlog}
            />
            <TextInput
              placeholder="Horas de vuelo"
              onChangeText={text => setName(text)}
              value={timeFlightlog}
              style={styles.inputNewFlightlog}
            />
            <TextInput
              placeholder="Despegues / Aterrizajes"
              onChangeText={text => setName(text)}
              value={takeoff}
              style={styles.inputNewFlightlog}
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
  inputNewFlightlog: {
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
    fontSize: 16
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