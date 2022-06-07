import { useSelector } from "@src/common";
import { SCREEN_WIDTH } from "@src/constants";
import { Post, User } from "@src/models";
import { navigate } from "@src/navigation/navigation-service";
import { Icon } from "@ui-kitten/components";
import React, { useRef, useState } from "react";
import { Animated, Image, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import PopupImage from "./components/popupImage";
import ProfileExtraInfo from "./components/profileExtraInfo";
import ProfileGallery from "./components/profileGallery";
import ProfileHeader from "./components/profileHeader";
import ProfileInfo from "./components/profileInfo";
import ProfileRecommend from "./components/profileRecommend";

export default function ProfileScreen() {
    const [selectedPhoto, setSelectedPhoto] = useState<Post>({} as Post)
    const ref = useRef<{
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
    }>({
        showHeaderTab: false,
        headerHeight: 0,
        currentTab: 1,
        currentGalleryTab: 1,
        prePopupImage: { pX: 0, pY: 0, w: 0, h: 0 }
    })

    const _headerTabOpacity = React.useMemo(() => new Animated.Value(-1), []);
    const _tabLineOffsetX = React.useMemo(() => new Animated.Value(0), [])

    const _showPopupImage = (e: { pX: number, pY: number, w: number, h: number }, photo: Post) => {
        ref.current.prePopupImage = e
        setSelectedPhoto(photo)
    }
    const _hidePopupImage = () => {
        Animated.timing(_popupImageTop, {
            toValue: ref.current.prePopupImage.pY - 44 - 40,
            duration: 150,
            useNativeDriver: false
        }).start()
        Animated.timing(_popupImageLeft, {
            toValue: ref.current.prePopupImage.pX,
            duration: 150,
            useNativeDriver: false
        }).start()
        Animated.timing(_popupImageWidth, {
            toValue: ref.current.prePopupImage.w,
            duration: 150,
            useNativeDriver: false
        }).start()
        Animated.timing(_popupImageHeight, {
            toValue: ref.current.prePopupImage.h,
            duration: 150,
            useNativeDriver: false
        }).start(() => setSelectedPhoto({} as Post))

    }
    const _popupImageTop = new Animated.Value(0)
    const _popupImageLeft = new Animated.Value(0)
    const _popupImageWidth = new Animated.Value(0)
    const _popupImageHeight = new Animated.Value(0)

    const _popupImageLocation = {
        _popupImageTop,
        _popupImageLeft,
        _popupImageWidth,
        _popupImageHeight,
    }

    const scrollHRef = useRef<ScrollView>(null)
    const scrollVRef = useRef<ScrollView>(null)
    const scrollTabRef = useRef<ScrollView>(null)

    const _onScrollEndDragContainerScroll = ({ nativeEvent: {
        contentOffset: { x }
    } }: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (x > SCREEN_WIDTH / 4 && ref.current.currentTab === 1) {
            ref.current.currentTab = 2
            scrollHRef.current?.scrollTo({
                x: SCREEN_WIDTH / 2,
                y: 0,
                animated: true
            })
        } else if (x < SCREEN_WIDTH / 4 && ref.current.currentTab === 2) {
            ref.current.currentTab = 1
            scrollHRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
        } else if (x < SCREEN_WIDTH / 4 && ref.current.currentTab === 1) {
            scrollHRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
        } else if (x > SCREEN_WIDTH / 4 && ref.current.currentTab === 2) {
            scrollHRef.current?.scrollTo({
                x: SCREEN_WIDTH / 2,
                y: 0,
                animated: true
            })
        }
    }
    const _onBackToMainScreen = () => {
        if (ref.current.currentTab === 2) {
            scrollHRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
            ref.current.currentTab = 1
        }
    }

    const _onToggleGalleryTab = (tab: number) => {
        _onBackToMainScreen()
        if (ref.current.currentGalleryTab === 1 && tab === 2) {
            ref.current.currentGalleryTab = 2
            Animated.timing(_tabLineOffsetX, {
                toValue: SCREEN_WIDTH / 2,
                duration: 200,
                useNativeDriver: false
            }).start()
            scrollTabRef.current?.scrollTo({
                x: SCREEN_WIDTH,
                y: 0,
                animated: true
            })
        } else if (ref.current.currentGalleryTab === 2 && tab === 1) {
            ref.current.currentGalleryTab = 1
            Animated.timing(_tabLineOffsetX, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start()
            scrollTabRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
        }
    }

    const _onVerticalScrollViewScroll = ({ nativeEvent: { contentOffset: { y } } }: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (y > ref.current.headerHeight) {
            if (!ref.current.showHeaderTab) {
                _headerTabOpacity.setValue(1)
                ref.current.showHeaderTab = true
            }
        } else {
            if (ref.current.showHeaderTab) {
                _headerTabOpacity.setValue(-1)
                ref.current.showHeaderTab = false
            }
        }
    }

    const _onSetHeaderHeight = ({ nativeEvent: { layout: { height } } }: LayoutChangeEvent) => {
        ref.current.headerHeight = height
    }

    const _onScrollEndDragGalleryTabScroll = ({ nativeEvent: {
        contentOffset: { x }
    } }: NativeSyntheticEvent<NativeScrollEvent>) => {
        _onBackToMainScreen()
        if (x > SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 1) {
            ref.current.currentGalleryTab = 2
            scrollTabRef.current?.scrollTo({
                x: SCREEN_WIDTH,
                y: 0,
                animated: true
            })
            Animated.timing(_tabLineOffsetX, {
                toValue: SCREEN_WIDTH / 2,
                duration: 200,
                useNativeDriver: false
            }).start()
        } else if (x < SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 2) {
            ref.current.currentGalleryTab = 1
            scrollTabRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
            Animated.timing(_tabLineOffsetX, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start()
        } else if (x < SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 1) {
            scrollTabRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
            Animated.timing(_tabLineOffsetX, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start()
        } else if (x > SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 2) {
            scrollTabRef.current?.scrollTo({
                x: SCREEN_WIDTH,
                y: 0,
                animated: true
            })
            Animated.timing(_tabLineOffsetX, {
                toValue: SCREEN_WIDTH / 2,
                duration: 200,
                useNativeDriver: false
            }).start()
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <PopupImage selectedPhoto={selectedPhoto} refProps={ref} _popupImageLocation={_popupImageLocation} />
            <ScrollView
                onScrollEndDrag={_onScrollEndDragContainerScroll}
                ref={scrollHRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}>
                <View style={styles.profileContainer}>
                    <ScrollView
                        ref={scrollVRef}
                        onScroll={_onVerticalScrollViewScroll}
                        scrollEventThrottle={20}
                        style={{
                            width: '100%'
                        }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={_onBackToMainScreen}>
                            <View onLayout={_onSetHeaderHeight}>
                                <ProfileExtraInfo curRef={ref} scrollVRef={scrollVRef} />
                                <ProfileInfo />
                                <TouchableOpacity
                                    // onPress={() => navigate('EditProfile')}
                                    activeOpacity={0.6}
                                    style={styles.btnEditProfile}>
                                    <Text style={{
                                        fontWeight: '500'
                                    }}>Edit Profile</Text>
                                </TouchableOpacity>
                            </View>
                            <ProfileGallery
                                _tabLineOffsetX={_tabLineOffsetX}
                                scrollTabRef={scrollTabRef}
                                _onToggleGalleryTab={_onToggleGalleryTab}
                                _onScrollEndDragGalleryTabScroll={_onScrollEndDragGalleryTabScroll}
                                _hidePopupImage={_hidePopupImage}
                                _showPopupImage={_showPopupImage}
                                photos={[]}
                            />
                            <ProfileRecommend />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export interface PopupImageLocation {
    _popupImageTop: Animated.Value,
    _popupImageLeft: Animated.Value,
    _popupImageWidth: Animated.Value,
    _popupImageHeight: Animated.Value,
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(250,250,250)',
        width: '100%',
        height: '100%'
    },
    profileContainer: {
        width: SCREEN_WIDTH,
        paddingTop: 24,
    },
    btnEditProfile: {
        marginVertical: 10,
        width: SCREEN_WIDTH - 30,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 3,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
})