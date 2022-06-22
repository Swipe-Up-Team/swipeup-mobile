import { Icon, IconElement } from '@ui-kitten/components'
import React from 'react'
import { ImageStyle } from 'react-native'

export const PersonAddIcon = (props: ImageStyle): IconElement => (
  <Icon {...props} name="person-add-outline" width={20} height={20} />
)

export const PersonDoneIcon = (props: ImageStyle): IconElement => (
  <Icon {...props} name="person-done-outline" width={20} height={20} />
)

export const PersonGroupIcon = (props: ImageStyle): IconElement => (
  <Icon {...props} name="people-outline" width={24} height={24} fill={'#ffaf4c'} />
)

export const MessageProfileIcon = (props: ImageStyle): IconElement => (
  <Icon {...props} name="message-square-outline" width={20} height={20} />
)
