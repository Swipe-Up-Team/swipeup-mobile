import { useSelector } from "@src/common";
import { SCREEN_WIDTH } from "@src/constants";
import { User } from "@src/models";
import { Icon } from "@ui-kitten/components";
import React from "react";
import { Animated, ScrollView, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    _headerTabOpacity: Animated.Value,
    _tabLineOffsetX: Animated.Value
    refProps: React.MutableRefObject<{
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
    scrollHRef: React.RefObject<ScrollView>,
    _onToggleGalleryTab: (tab: number) => void,
}

export default function ProfileHeader({ _headerTabOpacity, _tabLineOffsetX, refProps, scrollHRef, _onToggleGalleryTab }: Props) {
    const user = useSelector(state => state.user).user as User;

    const _onShowOptions = () => {

        if (refProps.current.currentTab === 1) {
            scrollHRef?.current?.scrollTo({
                x: SCREEN_WIDTH / 2,
                y: 0,
                animated: true
            })
            refProps.current.currentTab = 2
        } else {
            scrollHRef?.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
            refProps.current.currentTab = 1
        }
    }

    return (
        <Animated.View style={{
            ...styles.profileHeader,
            zIndex: _headerTabOpacity
        }}>
            <TouchableOpacity
                style={styles.btnSwitchAccount}>
                <Text style={{
                    fontWeight: '500',
                    fontSize: 18,
                    color: "black",
                }}>{user?.email}</Text>
                <Icon name="chevron-down" width={16} height={16} fill="#000" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={_onShowOptions}
                style={styles.btnOptions}>
                <Icon name="menu" width={24} height={24} fill="#000" />
            </TouchableOpacity>
            <Animated.View style={{
                ...styles.galleryTabWrapper,
                position: 'absolute',
                left: 0,
                top: '100%',
                backgroundColor: 'rgb(250,250,250)',
                opacity: _headerTabOpacity,
            }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={_onToggleGalleryTab.bind(null, 1)}
                    style={styles.galleryTab}>
                    <Icon name="grid" width={24} height={24} fill="#333" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={_onToggleGalleryTab.bind(null, 2)}
                    style={styles.galleryTab}>
                    <Icon name="image-outline" width={24} height={24} fill="#333" />
                </TouchableOpacity>
                <Animated.View style={{
                    ...styles.tabLine,
                    left: _tabLineOffsetX
                }} />
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    profileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        width: '100%'
    },
    btnSwitchAccount: {
        flexDirection: 'row',
        height: 44,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    btnOptions: {
        height: 44,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    galleryTabWrapper: {
        flexDirection: 'row',
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5,
        borderTopColor: '#ddd',
        borderTopWidth: 0.5
    },
    galleryTab: {
        width: SCREEN_WIDTH * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    tabLine: {
        bottom: -1,
        height: 2,
        backgroundColor: '#000',
        position: 'absolute',
        width: SCREEN_WIDTH / 2
    },
})