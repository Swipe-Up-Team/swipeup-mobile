import { useSelector } from "@src/common";
import { SCREEN_WIDTH } from "@src/constants";
import { User } from "@src/models";
import { Icon } from "@ui-kitten/components";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ExpoFastImage from "expo-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    ref: React.MutableRefObject<{
        currentTab: number,
        currentGalleryTab: number,
        headerHeight: number,
        showHeaderTab: boolean,
        prePopupImage: {
            pX: number,
            pY: number,
            w: number,
            h: number
        }
    }>,
    scrollVRef: React.RefObject<ScrollView>,
}

export default function ProfileExtraInfo({ ref, scrollVRef }: Props) {
    const user = useSelector(state => state.user).user as User

    const _scrollToPosts = () => {
        scrollVRef.current?.scrollTo({
            x: 0,
            y: ref.current.headerHeight,
            animated: true
        })
    }


    return (
        <View style={styles.infoWrapper}>

            <TouchableOpacity
                // onPress={() => navigate('StoryTaker')}
                style={styles.avatarWrapper}>
                <ExpoFastImage style={styles.mainAvatar}
                    source={{ uri: user?.avatar || "https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png" }} />
                <View style={styles.plusIcon}>
                    <Icon width={16} height={16} fill="#fff" name='plus' />
                </View>
            </TouchableOpacity>
            <View style={styles.extraInfoWrapper}>
                <TouchableOpacity
                    onPress={_scrollToPosts}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "500"
                    }}>{100}</Text>
                    <Text>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        /**
                         * @todo Add navigate
                         */
                        // navigate('Follow', { type: 1 })
                    }}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "500"
                    }}>100</Text>
                    <Text>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        /**
                         * @todo Add navigate
                         */
                        // navigate('Follow', { type: 2 })
                    }}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "500"
                    }}>{user?.followingIDs?.length}</Text>
                    <Text>Following</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    avatarWrapper: {
        position: 'relative'
    },
    mainAvatar: {
        height: 80,
        width: 80,
        borderRadius: 80
    },
    plusIcon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 99,
        backgroundColor: '#318bfb',
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderWidth: 2,
        borderColor: '#fff'
    },
    extraInfoWrapper: {
        flexDirection: 'row',
        width: SCREEN_WIDTH - 30 - 80,
        justifyContent: 'space-evenly',
        padding: 20,
    },
})