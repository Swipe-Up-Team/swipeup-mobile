import React from 'react'
import { ImageStyle } from 'react-native'
import { Icon, IconElement } from '@ui-kitten/components'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const CameraIcon = (style: ImageStyle): IconElement => <Icon {...style} name="camera" />

export const FileIcon = (style: ImageStyle): IconElement => <Icon {...style} name="file" />

export const ImageIcon = (style: ImageStyle): IconElement => <Icon {...style} name="image" />

export const MicIcon = (style: any): IconElement => <Icon {...style} name="mic" />

export const PaperPlaneIcon = (style: any): IconElement => <Icon {...style} name="paper-plane" />

export const PeopleIcon = (style: ImageStyle): IconElement => <Icon {...style} name="people" />

export const PinIcon = (style: ImageStyle): IconElement => <Icon {...style} name="pin" />

export const PlusIcon = (style: any): IconElement => <Icon {...style} name="plus" />

export const XIcon = ({ onPress, ...style }: any): IconElement => (
  <TouchableOpacity onPress={onPress}>
    <Icon {...style} name="close-outline" />
  </TouchableOpacity>
)
