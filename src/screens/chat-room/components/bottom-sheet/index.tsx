import React from 'react'
import { BottomSheet, MoreIcon, PersonGroupIcon, ShareIcon } from '@src/components'
import { View, Text } from 'react-native'
import { Avatar, Button } from '@ui-kitten/components'
import styles from './styles'
import { ActionBtn } from './action-button'
import { DEFAULT_PHOTO_URI } from '@src/constants'
import { RouteProp, useRoute } from '@react-navigation/native'
import { APP_SCREEN, AuthorizeParamsList } from '@src/navigation/screen-types'

export const InfoBottomSheet = ({ navigation }: any) => {
  const route = useRoute<RouteProp<AuthorizeParamsList, APP_SCREEN.CHAT_USER_INFO_MODAL>>()
  const user = route.params?.user

  const navigateToProfile = () => {
    navigation.push(APP_SCREEN.PROFILE, { userId: user.id })
  }

  return (
    <BottomSheet>
      <View style={styles.container}>
        <Avatar
          style={styles.avatarImage}
          width={100}
          height={100}
          shape="rounded"
          source={{ uri: user.avatar || DEFAULT_PHOTO_URI, cache: 'force-cache' }}
        />
        <Text style={styles.nameText}>{user.name}</Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <View style={styles.actionBtnContainer}>
          <ActionBtn icon={<PersonGroupIcon />} backgroundColor={'#fffae6'} description={'Group'} />
          <ActionBtn icon={<ShareIcon />} backgroundColor={'#deebff'} description={'Share'} />
          <ActionBtn icon={<MoreIcon />} backgroundColor={'#f4f5f7'} description={'More'} />
        </View>
        <Button
          style={styles.profileBtn}
          status={'basic'}
          appearance="outline"
          onPress={navigateToProfile}
        >
          <Text>View Profile</Text>
        </Button>
      </View>
    </BottomSheet>
  )
}
