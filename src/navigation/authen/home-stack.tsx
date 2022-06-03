import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { APP_SCREEN } from '../screen-types'
import { HomeScreen } from '@src/screens/home'
import PostDetailScreen from '@src/screens/post-detail'

const Stack = createStackNavigator()

export const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true
    }}
  >
    <Stack.Screen name={APP_SCREEN.HOME} component={HomeScreen} />
    <Stack.Screen name={APP_SCREEN.POST_DETAILS} component={PostDetailScreen} />
    {/* <Stack.Screen name="Hashtag" component={Hashtag} />
    <Stack.Screen name="ProfileX" component={ProfileX} />
    <Stack.Screen name="ProfileXFollow" component={ProfileXFollow} />
    <Stack.Screen name="Saved" component={Saved} />
    <Stack.Screen name="SavedCollection" component={SavedCollection} />
    <Stack.Screen name="EditSavedCollection" component={EditSavedCollection} />
    <Stack.Screen name="AddSavedCollection" component={AddSavedCollection} />
    <Stack.Screen name="AddToSavedCollection" component={AddToSavedCollection} /> */}
  </Stack.Navigator>
)
