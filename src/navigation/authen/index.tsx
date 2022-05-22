/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { ReactNode, useRef } from 'react'
import { APP_SCREEN } from '@navigation/screen-types'
import { Home } from '@src/screens/home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@ui-kitten/components'

function getWidth() {
  let width = Dimensions.get('window').width
  // width = width - 80
  return width / 3
}

const Main = createBottomTabNavigator()

export const MainScreen = () => {
  const theme = useTheme()
  const PRIMARY_COLOR = theme['color-primary-default']
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
              <TabBarItem
                focused={focused}
                label="Home"
                icon={
                  <Ionicons
                    name={focused ? 'home' : 'home-outline'}
                    size={24}
                    color={focused ? PRIMARY_COLOR : '#999'}
                  />
                }
              />
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
          name={APP_SCREEN.NOTIFICATIONS}
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                label="Notifications"
                icon={
                  <Ionicons
                    name={focused ? 'notifications-sharp' : 'notifications-outline'}
                    size={24}
                    color={focused ? PRIMARY_COLOR : '#999'}
                  />
                }
              />
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
          name={APP_SCREEN.MENU}
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                label="Menu"
                icon={
                  <Ionicons
                    name={focused ? 'menu-sharp' : 'menu-outline'}
                    size={24}
                    color={focused ? PRIMARY_COLOR : '#999'}
                  />
                }
              />
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
      </Main.Navigator>

      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: PRIMARY_COLOR,
          position: 'absolute',
          bottom: 70,
          zIndex: 999,
          // Horizontal Padding = 20...
          left: 10,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }]
        }}
      />
    </>
  )
}

interface TabBarItemProps {
  focused: boolean
  label: string
  icon: ReactNode
}

const TabBarItem = ({ focused, label, icon }: TabBarItemProps) => (
  <View style={styles.tabBarItemContainer}>
    {icon}
    {/* <Ionicons name={iconName} size={24} color="black" /> */}
    {/* <Image
      source={imageSource}
      resizeMode="contain"
      style={[
        styles.tabBarImage,
        {tintColor: focused ? PRIMARY_COLOR : TEXT_COLOR},
      ]}
    /> */}
    <Text style={[styles.tabBarText, { color: focused ? '#3D3092' : '#999' }]}>{label}</Text>
  </View>
)

const styles = StyleSheet.create({
  rootContainer: {
    // position: 'absolute',
    // bottom: 10,
    // left: 10,
    // right: 10,
    backgroundColor: '#fff',
    // borderRadius: 15,
    height: 70
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
