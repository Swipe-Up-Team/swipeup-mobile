import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LoginScreen } from './src/screens/Login'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={styles.container}>
        {/* <Text>Open up App.tsx to start working on your app!</Text> */}
        <StatusBar style="auto" />
        {/* <Home /> */}
        <LoginScreen />
      </View>
    </ApplicationProvider>
  )
}
