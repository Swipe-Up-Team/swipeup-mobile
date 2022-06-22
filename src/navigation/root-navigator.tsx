import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { AddPostScreen, ChatRoomScreen, GalleryChooserScreen, PostDetailScreen } from '@src/screens'
import { PostStatusOptionsScreen } from '@src/screens/post-status-options'
import React from 'react'
import { MainScreen } from './authen'
import { APP_SCREEN, RootStackParamList } from './screen-types'
import { UnAuthentication } from './un-authen'
import EditProfile from '@src/screens/edt-profile'
import FollowScreen from '@src/screens/profile/components/follow-screen'
import ProfileScreen from '@src/screens/profile/profile'
import { InfoBottomSheet } from '@src/screens/chat-room/components/bottom-sheet'

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
          <RootStack.Screen
            options={{
              ...TransitionPresets.ModalTransition,
              cardStyle: { backgroundColor: 'transparent' }
            }}
            name={APP_SCREEN.CHAT_USER_INFO_MODAL}
            component={InfoBottomSheet}
          />
          <RootStack.Screen name={APP_SCREEN.EDIT_PROFILE} component={EditProfile} />
          <RootStack.Screen name={APP_SCREEN.FOLLOWING} component={FollowScreen} />
          <RootStack.Screen name={APP_SCREEN.PROFILE} component={ProfileScreen} />
          <RootStack.Screen name={APP_SCREEN.POST_DETAILS} component={PostDetailScreen} />
        </>
      )}
    </RootStack.Navigator>
  )
}
