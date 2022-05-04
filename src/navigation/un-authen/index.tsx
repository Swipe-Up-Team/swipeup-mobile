import React, { useEffect } from 'react'

// import { AppModule } from '@common'
// import { Login } from '@features/un-authentication/login/design';
// import { Register } from '@features/un-authentication/register/design'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { APP_SCREEN } from '../screen-types'
import { LoginScreen } from '@src/screens/Login'

const Stack = createStackNavigator()

export const UnAuthentication = () => {
  // effect
  useEffect(() => {
    // TODO: clean cache when logout
    // AppModule.clearCache()
  }, [])

  // render
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen name={APP_SCREEN.LOGIN} component={LoginScreen} />
      {/* <Stack.Screen
        name={APP_SCREEN.REGISTER}
        component={Register}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      /> */}
    </Stack.Navigator>
  )
}
