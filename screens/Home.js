import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'


export const Home = ({ navigation }) => {

  async function handleLogin() {
    const token = 'soyuntokenfeliz'
    await AsyncStorage.setItem('token', token)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button
        title="Registrar"
        onPress={() => navigation.navigate('Registro', {
          loquesea: 'asdfJ'
        })}
      />
      <Button
        title="Ingresar"
        onPress={handleLogin}
      />
      <Button
        title="Olvidé mi contraseña"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});