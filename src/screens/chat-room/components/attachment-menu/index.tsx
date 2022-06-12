import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  Button,
  Divider,
  Icon,
  IconElement,
  IndexPath,
  Layout,
  List,
  Menu,
  MenuItem,
  MenuItemElement
} from '@ui-kitten/components'
import { CameraIcon, FileIcon, ImageIcon, PeopleIcon, PinIcon } from '@components/icons'

export interface AttachmentsMenuProps {
  onSelectPhoto: () => void
  onSelectFile: () => void
  onSelectLocation: () => void
  onSelectContact: () => void
  onCameraPress: () => void
  onAttachmentSelect: (index: number) => void
  onDismiss: () => void
}

export type AttachmentsMenuElement = React.ReactElement<AttachmentsMenuProps>

const menu = [
  { title: 'Photo or Video', accessory: <ImageIcon /> },
  { title: 'File', accessory: <FileIcon /> },
  { title: 'Location', accessory: <PinIcon /> },
  { title: 'Contact', accessory: <PeopleIcon /> }
]

export const AttachmentsMenu = (props: AttachmentsMenuProps): React.ReactElement => {
  const onAttachmentsMenuItemSelect = (index: IndexPath): void => {
    switch (index.row) {
      case 0: {
        props.onSelectPhoto()
        return
      }
      case 1: {
        props.onSelectFile()
        return
      }
      case 2: {
        props.onSelectLocation()
        return
      }
      case 3: {
        props.onSelectContact()
        return
      }
    }
  }

  const renderMenuData = (): MenuItemElement => (
    <>
      {menu.map((el, index) => (
        <MenuItem key={index} title={el.title} accessoryLeft={el.accessory} />
      ))}
    </>
  )

  const renderActionAttachment = (): React.ReactElement => (
    <Button
      style={styles.attachmentsAction}
      appearance="outline"
      accessoryLeft={<CameraIcon />}
      onPress={props.onCameraPress}
    />
  )

  const renderAttachment = (info: ListRenderItemInfo<ImageSourcePropType>): React.ReactElement => (
    <TouchableOpacity onPress={() => props.onAttachmentSelect(info.index)}>
      <Image style={styles.attachmentItem} source={info.item} />
    </TouchableOpacity>
  )

  return (
    <Layout level="1">
      <Divider style={styles.divider} />
      <Menu scrollEnabled={false} onSelect={onAttachmentsMenuItemSelect}>
        {renderMenuData()}
      </Menu>
      <Button appearance="ghost" size="giant" onPress={props.onDismiss}>
        CANCEL
      </Button>
    </Layout>
  )
}

const styles = StyleSheet.create({
  divider: {
    marginBottom: 8
  },
  attachmentsContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginBottom: 8,
    maxHeight: 72,
    backgroundColor: 'transparent'
  },
  attachmentsAction: {
    aspectRatio: 1.0,
    height: '100%',
    marginHorizontal: 8
  },
  attachmentItem: {
    width: 72,
    height: 72,
    marginHorizontal: 8,
    borderRadius: 4
  }
})
