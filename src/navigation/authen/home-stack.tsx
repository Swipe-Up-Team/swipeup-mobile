import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen } from '@src/screens'
import { APP_SCREEN } from '../screen-types'

const Stack = createStackNavigator()

export const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true
    }}
  >
    <Stack.Screen name={APP_SCREEN.HOME} component={HomeScreen} />
    {/* <Stack.Screen name={APP_SCREEN.POST_DETAILS} component={PostDetailScreen} /> */}
  </Stack.Navigator>
)
