/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { APP_SCREEN } from '@navigation/screen-types'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeIcon, MessageIcon, SearchIcon, BellIcon, UserIcon } from '@src/components/icons'
import { Home } from '@src/screens/home'
import { useTheme } from '@ui-kitten/components'
import React, { useRef } from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'

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

  return (
    <>
      <Main.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: { ...styles.rootContainer }
        }}
      >
        <Main.Screen
          name={APP_SCREEN.HOME}
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <HomeIcon stroke={focused ? PRIMARY_COLOR : GRAY_COLOR} width={24} height={24} />
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
          component={Home}
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
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <MessageIcon stroke={focused ? PRIMARY_COLOR : GRAY_COLOR} width={24} height={24} />
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
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <BellIcon stroke={focused ? PRIMARY_COLOR : GRAY_COLOR} width={24} height={24} />
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
          name={APP_SCREEN.MENU}
          component={Home}
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

      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: PRIMARY_COLOR,
          position: 'absolute',
          bottom: 60,
          zIndex: 999,
          left: 10,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }]
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#fff',
    height: 60
  },
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBarImage: {
    width: 25,
    height: 25
  },
  tabBarText: {
    fontSize: 12,
    fontWeight: '500'
  }
})
