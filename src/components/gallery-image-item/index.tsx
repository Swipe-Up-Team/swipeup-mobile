import { Post } from '@src/models'
import { navigate } from '@src/navigation/navigation-service'
import React, { useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'
import ExpoFastImage from "expo-fast-image"
import { Icon } from '@ui-kitten/components'

export interface GalleryImageItem {
    photo: Post,
    index: number,
    _showPopupImage: (e: { pX: number, pY: number, w: number, h: number }, photo: Post) => void,
    _hidePopupImage: () => void,
}
const index = ({ index, _showPopupImage, _hidePopupImage, photo }: GalleryImageItem) => {
    const [containerWidth, setContainerWidth] = useState<number>(0)
    const containerRef = useRef<TouchableOpacity>(null)
    const _onLongPressHandler = () => {
        containerRef.current?.measure((x, y, w, h, pX, pY) => {
            _showPopupImage({ pX, pY, w, h }, photo)
        })
    }
    const _onPressOutHandler = () => {
        _hidePopupImage()
    }
    return (
        <TouchableOpacity
            onPress={() => {
                // navigate('PostDetail', {
                //     postId: photo.uid
                // })
            }}
            ref={containerRef}
            delayLongPress={150}
            onLongPress={_onLongPressHandler}
            onPressOut={_onPressOutHandler}
            activeOpacity={0.8}
            style={{
                ...styles.photoWrapper,
                marginRight: (index + 1) % 3 === 0 ? 0 : 5,
            }} key={index}>
            {photo && <ExpoFastImage source={{
                uri: photo.content.images && photo.content.images[0]
            }} style={styles.photo} />}
            {photo.content.images && photo.content.images.length > 1 &&
                <View style={styles.multipleIcon}>
                    <Icon name="layers" width={24} height={24} color="#fff" />
                </View>
            }
        </TouchableOpacity>
    )
}

export default React.memo(index)

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        marginHorizontal: 2,
        borderRadius: 8,
    },
    photoWrapper: {
        position: 'relative',
        width: SCREEN_WIDTH / 3 - 10 / 3,
        height: SCREEN_WIDTH / 3 - 10 / 3,
        marginBottom: 5,
    },
    photo: {
        width: '100%',
        height: '100%'
    },
    multipleIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    }
})
