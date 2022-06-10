import React from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { MainScreen } from './authen'
import { APP_SCREEN, RootStackParamList } from './screen-types'
import { UnAuthentication } from './un-authen'
import { AddPostScreen, ChatRoomScreen, GalleryChooserScreen } from '@src/screens'
import { PostStatusOptionsScreen } from '@src/screens/post-status-options'
import EditProfile from '@src/screens/edt-profile'

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
          <RootStack.Screen
            options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
            name={APP_SCREEN.ADD_POST}
            component={AddPostScreen}
          />
          <RootStack.Screen
            options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
            name={APP_SCREEN.GALLERY_CHOOSER}
            component={GalleryChooserScreen}
          />
          <RootStack.Screen
            options={{
              ...TransitionPresets.ModalTransition,
              cardStyle: { backgroundColor: 'transparent' }
            }}
            name={APP_SCREEN.POST_STATUS_OPTIONS_MODAL}
            component={PostStatusOptionsScreen}
          />
          <RootStack.Screen name={APP_SCREEN.EDIT_PROFILE} component={EditProfile} />
        </>
      )}
    </RootStack.Navigator>
  )
}
