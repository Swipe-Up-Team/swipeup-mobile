import React from 'react'
import { APP_SCREEN } from '@navigation/screen-types'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '@src/screens/home'

const Main = createStackNavigator()

export const MainScreen = () => (
  <Main.Navigator>
    <Main.Screen name={APP_SCREEN.HOME} component={Home} />
  </Main.Navigator>
)
