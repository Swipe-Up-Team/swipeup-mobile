/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { goBack } from '@src/navigation/navigation-service'
import { Divider, Icon, Tab, TabView } from '@ui-kitten/components'
import styles from './styles'
import { RouteProp, useRoute } from '@react-navigation/native'
import { APP_SCREEN, AuthorizeParamsList } from '@src/navigation/screen-types'
import { userService } from '@src/services'
import { TabTitle } from '@src/screens/chat/components'
import { TabUserView } from './tab-view'
import { User } from '@src/models'

const FollowScreen = ({ navigation }: any) => {
  const route = useRoute<RouteProp<AuthorizeParamsList, APP_SCREEN.FOLLOWING>>()
  const currentUser = route.params?.user

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [allFollowingUser, setallFollowingUser] = useState<User[]>([])
  const [allFollowerUser, setallFollowerUser] = useState<User[]>([])

  const getAllFollowingUsers = async () => {
    const data = await userService.getAllFollowingUser(currentUser.followingIDs!)
    setallFollowingUser(data || [])
  }

  const getAllFollowerUsers = async () => {
    const data = await userService.getAllFollowerUser(currentUser.id)
    setallFollowerUser(data || [])
  }

  useEffect(() => {
    getAllFollowingUsers()
    getAllFollowerUsers()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack} style={styles.btnGoBack}>
          <Icon name="arrow-back" width={22} height={22} fill="#000" />
        </TouchableOpacity>
        <Text style={styles.nameText}>{currentUser.name}</Text>
      </View>
      <Divider />
      <TabView
        indicatorStyle={styles.indicator}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <Tab title={<TabTitle text="Following" />}>
          <TabUserView listUser={allFollowingUser} navigation={navigation} />
        </Tab>
        <Tab title={<TabTitle text="Follower" />}>
          <TabUserView listUser={allFollowerUser} navigation={navigation} />
        </Tab>
      </TabView>
    </SafeAreaView>
  )
}

export default FollowScreen
