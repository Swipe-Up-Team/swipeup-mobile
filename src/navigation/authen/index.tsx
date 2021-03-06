/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useTheme } from '@ui-kitten/components'
import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { APP_SCREEN } from '@navigation/screen-types'
import {
  BellFillIcon,
  BellIcon,
  HomeFillIcon,
  HomeIcon,
  MessageFillIcon,
  MessageIcon,
  SearchIcon,
  UserIcon
} from '@src/components/icons'
import { ChatScreen } from '@src/screens/chat'
import { HomeStack } from './home-stack'
import styles from './styles'
import { NotificationsScreen } from '@src/screens'
import ProfileScreen from '@src/screens/profile/profile'
import { SearchScreen } from '@src/screens/search'
import { userService } from '@src/services'
import { dispatch, useSelector } from '@src/common'
import { onSetFollowingUsers } from '@src/store/reducers/user-reducer'

function getWidth() {
  let width = Dimensions.get('window').width
  // width = width - 80
  return width / 5
}

const Main = createBottomTabNavigator()

export const MainScreen = () => {
  const theme = useTheme()
  const PRIMARY_COLOR = theme['color-primary-default']
  const GRAY_COLOR = theme['color-basic-500']
  const tabOffsetValue = useRef(new Animated.Value(0)).current

  const user = useSelector(x => x.user).user

  const getAllFollowingUsers = async () => {
    const list = await userService.getAllFollowingUser(user?.followingIDs || [])
    dispatch(onSetFollowingUsers(list || []))
  }

  useEffect(() => {
    getAllFollowingUsers()
  }, [user])

  return (
    <>
      <Main.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: styles.rootContainer
        }}
      >
        <Main.Screen
          name={APP_SCREEN.HOME_STACK}
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                {focused ? (
                  <HomeFillIcon fill={PRIMARY_COLOR} width={24} height={24} />
                ) : (
                  <HomeIcon stroke={GRAY_COLOR} width={24} height={24} />
                )}
              </View>
            )
          }}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true
              }).start()
            }
          })}
        />
        <Main.Screen
          name={APP_SCREEN.SEARCH}
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <SearchIcon stroke={focused ? PRIMARY_COLOR : GRAY_COLOR} width={24} height={24} />
              </View>
            )
          }}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true
              }).start()
            }
          })}
        />
        <Main.Screen
          name={APP_SCREEN.CHAT}
          component={ChatScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                {focused ? (
                  <MessageFillIcon fill={PRIMARY_COLOR} width={24} height={24} />
                ) : (
                  <MessageIcon stroke={GRAY_COLOR} width={24} height={24} />
                )}
              </View>
            )
          }}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true
              }).start()
            }
          })}
        />
        <Main.Screen
          name={APP_SCREEN.NOTIFICATIONS}
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                {focused ? (
                  <BellFillIcon fill={PRIMARY_COLOR} width={24} height={24} />
                ) : (
                  <BellIcon stroke={GRAY_COLOR} width={24} height={24} />
                )}
              </View>
            )
          }}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true
              }).start()
            }
          })}
        />
        <Main.Screen
          name={APP_SCREEN.PROFILE}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <UserIcon stroke={focused ? PRIMARY_COLOR : GRAY_COLOR} width={24} height={24} />
              </View>
            )
          }}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true
              }).start()
            }
          })}
        />
      </Main.Navigator>

      {/* <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: PRIMARY_COLOR,
          position: 'absolute',
          bottom: 58,
          zIndex: 999,
          left: 10,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }]
        }}
      /> */}
    </>
  )
}
