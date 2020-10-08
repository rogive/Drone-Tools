import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export const Registro = ({ route }) => {
  console.log(route)

  async function handleToken() {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
  }

  return (
    <View style={styles.container}>
      <Text>About</Text>
      <Button
        title="Token"
        onPress={handleToken}
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

