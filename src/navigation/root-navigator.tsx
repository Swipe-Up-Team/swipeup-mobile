import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { MainScreen } from './authen'
import { APP_SCREEN, RootStackParamList } from './screen-types'
import { UnAuthentication } from './un-authen'
import { AddPostScreen, ChatRoomScreen } from '@src/screens'

const RootStack = createStackNavigator<RootStackParamList>()

export const RootNavigation = ({ token }: { token?: string }) => {
  // render
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token === undefined ? (
        <RootStack.Screen
          options={{ animationTypeForReplace: 'pop', gestureEnabled: false }}
          name={APP_SCREEN.UN_AUTHORIZE}
          component={UnAuthentication}
        />
      ) : (
        <>
          <RootStack.Screen
            options={{ gestureEnabled: false }}
            name={APP_SCREEN.AUTHORIZE}
            component={MainScreen}
          />
          <RootStack.Screen name={APP_SCREEN.CHAT_ROOM} component={ChatRoomScreen} />
          <RootStack.Screen name={APP_SCREEN.ADD_POST} component={AddPostScreen} />
        </>
      )}
    </RootStack.Navigator>
  )
}
