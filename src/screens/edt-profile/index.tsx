/* eslint-disable react-native/no-inline-styles */
import { useSelector } from '@src/common'
import { NavigationBar } from '@src/components'
import { firestore } from '@src/config'
import { DEFAULT_PHOTO_URI, SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '@src/constants'
import { User } from '@src/models'
import { goBack, navigate } from '@src/navigation/navigation-service'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert
} from 'react-native'
import { string } from 'yup'
import ExpoFastImage from 'expo-fast-image'
import { Datepicker, Icon, Input, Radio, RadioGroup } from '@ui-kitten/components'
import { useDispatch } from 'react-redux'
import { reloadUser } from '@src/store/reducers/user-reducer'
import { AppDispatch } from '@src/store/store'

const styles = StyleSheet.create({
  modalWraper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  changePhotoOptionItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    height: 44,
    justifyContent: 'center'
  },
  customNavigationBar: {
    position: 'relative',
    marginTop: 30
  },
  btnSave: {
    position: 'absolute',
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0
  },
  mainContent: {
    zIndex: 1,
    backgroundColor: '#fff',
    width: '100%'
  },
  wrapper: {
    padding: 15
  },
  chooseAvatar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoFormWrapper: {
    marginTop: 10
  },
  infoItem: {
    marginVertical: 10
  },
  popupScreen: {
    paddingTop: 30,
    height: SCREEN_HEIGHT - 44 - STATUS_BAR_HEIGHT,
    width: '100%',
    backgroundColor: '#fff'
  },
  emailInputWrapper: {
    width: SCREEN_WIDTH - 30,
    marginHorizontal: 15,
    height: 44,
    flexDirection: 'row',
    borderBottomColor: '#318bfb',
    borderBottomWidth: 1
  },
  inputWrapper: {
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#ddd',
    borderWidth: 1,
    width: SCREEN_WIDTH - 30,
    position: 'relative'
  },
  loadingIcon: {
    width: 36,
    height: 36
  },
  btnPhoneCode: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 80
  },
  phoneCodeTitleWrapper: {
    paddingVertical: 5,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    paddingHorizontal: 10
  },
  inputPhone: {
    fontSize: 16,
    width: '100%',
    height: 44,
    paddingRight: 44,
    paddingLeft: 90,
    backgroundColor: 'rgb(242,242,242)'
  }
})

const EditProfile = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(state => state.user).user as User
  const [fullname, setFullname] = useState<string>(user?.name || '')
  const [bio, setBio] = useState<string>(user?.bio || '')
  const [phone, setPhone] = useState<string>(user?.phone || '')
  const [gender, setGender] = useState<0 | 1 | 2>(user?.gender || 0)
  const [birthDay, setBirthday] = useState<Date>(
    new Date(
      (user.birthDay?.month || 1) +
        '/' +
        (user.birthDay?.date || 1) +
        '/' +
        (user.birthDay?.year || 1999)
    )
  )
  const [showModal, setShowModal] = useState<boolean>(false)
  const topOffsetMainContent = React.useMemo(() => new Animated.Value(1), [])
  const [updating, setUpdating] = useState<boolean>(false)
  const loadingDeg = React.useMemo(() => new Animated.Value(0), [])
  const userRef = useRef(doc(firestore, 'users', user.id))
  /**
   * 1: general information
   * 2: phone
   * 3: gender
   * 4: birthDay
   */
  const [inputFor, setInputFor] = useState<1 | 2 | 3 | 4>(1)
  useEffect(() => {
    return () => {
      loadingDeg.stopAnimation()
      setUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setFullname(user?.name || '')
    setBio(user?.bio || '')
    setPhone(user?.phone || '')
    setGender(user?.gender || 0)
    setBirthday(
      new Date(
        (user.birthDay?.month || 1) +
          '/' +
          (user.birthDay?.date || 1) +
          '/' +
          (user.birthDay?.year || 1999)
      )
    )
  }, [user])
  const onAnimateMainContent = () => {
    Animated.timing(topOffsetMainContent, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true
    }).start()
  }
  const confirmGoBack = () => {
    if (inputFor !== 1) {
      setInputFor(1)
      setPhone(user?.phone || '')
      setGender(user?.gender || 0)
      setBirthday(
        new Date(
          (user.birthDay?.month || 1) +
            '/' +
            (user.birthDay?.date || 1) +
            '/' +
            (user.birthDay?.year || 1999)
        )
      )
    } else {
      goBack()
    }
  }

  const onDone = async () => {
    setUpdating(true)
    switch (inputFor) {
      case 1:
        await updateDoc(userRef.current, {
          name: fullname,
          bio
        })
        await dispatch(reloadUser(user.id)).then(() => {
          goBack()
        })
        break
      case 2:
        if (phone === user?.phone) {
          setInputFor(1)
        } else {
          const phoneValidation = string()
            .min(6)
            .matches(/[0-9]{6,}/)
          phoneValidation
            .validate(phone)
            .then(validatedPhone => {
              var phoneQuery = query(
                collection(firestore, 'users'),
                where('phone', '==', validatedPhone)
              )
              getDocs(phoneQuery).then(rs => {
                if (rs.size > 0) {
                  Alert.alert('Phone number is used', 'Another people used this phone number!')
                } else {
                  updateDoc(userRef.current, {
                    phone: validatedPhone
                  })
                  dispatch(reloadUser(user.id)).then(() => setInputFor(1))
                }
              })
            })
            .catch(() => {
              Alert.alert('Phone number is not valid!', 'You need input a vaild phone number')
            })
        }
        break
      case 3:
        updateDoc(userRef.current, {
          gender
        })
        dispatch(reloadUser(user.id)).then(() => setInputFor(1))
        break
      case 4:
        updateDoc(userRef.current, {
          birthDay: {
            date: birthDay.getDate(),
            month: birthDay.getMonth() + 1,
            year: birthDay.getFullYear()
          }
        })
        dispatch(reloadUser(user.id)).then(() => setInputFor(1))
        break
    }
    setUpdating(false)
  }
  const animateLoading = () => {
    Animated.timing(loadingDeg, {
      toValue: 1,
      useNativeDriver: true,
      duration: 300
    }).start(() => {
      if (updating) {
        loadingDeg.setValue(0)
        animateLoading()
      }
    })
  }
  const removeProfilePhoto = async () => {
    await updateDoc(userRef.current, {
      avatar: DEFAULT_PHOTO_URI
    })
    goBack()
  }
  return (
    <SafeAreaView>
      <View style={styles.customNavigationBar}>
        <NavigationBar
          title={
            inputFor === 1
              ? 'Edit Profile'
              : inputFor === 2
              ? 'Phone Number'
              : inputFor === 3
              ? 'Gender'
              : 'Birthday'
          }
          callback={confirmGoBack}
        />
        <TouchableOpacity disabled={updating} onPress={onDone} style={styles.btnSave}>
          {!updating ? (
            <Image
              style={{
                width: 20,
                height: 20
              }}
              source={require('@assets/icon/correct.png')}
            />
          ) : (
            <Animated.Image
              onLayout={animateLoading}
              style={{
                width: 20,
                height: 20,
                transform: [
                  {
                    rotate: loadingDeg.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg']
                    })
                  }
                ]
              }}
              source={require('@assets/icon/waiting.png')}
            />
          )}
        </TouchableOpacity>
      </View>
      {showModal && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowModal(false)}
          style={styles.modalWraper}
        >
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%'
            }}
          >
            <View style={{ backgroundColor: '#000' }}>
              <View
                style={{
                  ...styles.changePhotoOptionItem,
                  borderBottomColor: '#ddd',
                  borderBottomWidth: 1
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600'
                  }}
                >
                  Change Profile Photo
                </Text>
              </View>
              <TouchableOpacity
                // onPress={() => navigate('GalleryChooser', { isChooseProfilePhoto: true })}
                activeOpacity={0.9}
                style={styles.changePhotoOptionItem}
              >
                <Text
                  style={{
                    fontSize: 16
                  }}
                >
                  New Profile Photo
                </Text>
              </TouchableOpacity>
              {user?.avatar !== DEFAULT_PHOTO_URI && (
                <TouchableOpacity
                  onPress={removeProfilePhoto}
                  activeOpacity={0.9}
                  style={styles.changePhotoOptionItem}
                >
                  <Text
                    style={{
                      fontSize: 16
                    }}
                  >
                    Remove Profile Photo
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44
        }}
      >
        {inputFor === 1 && (
          <Animated.ScrollView
            style={{
              ...styles.mainContent,
              height: '100%',
              transform: [
                {
                  translateY: topOffsetMainContent.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44]
                  })
                }
              ]
            }}
            onLayout={onAnimateMainContent}
          >
            <View style={styles.wrapper}>
              <View style={styles.chooseAvatar}>
                <ExpoFastImage
                  style={{
                    width: 92,
                    height: 92,
                    borderRadius: 92
                  }}
                  source={{
                    uri: user?.avatar
                  }}
                />
                <TouchableOpacity onPress={() => setShowModal(true)} activeOpacity={0.8}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginVertical: 10,
                      color: '#318bfb'
                    }}
                  >
                    Change Profile Photo
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Input
                  style={{
                    marginVertical: 10
                  }}
                  label="Fullname"
                  value={fullname}
                  onChangeText={nextValue => setFullname(nextValue)}
                />
                <Input
                  style={{
                    marginVertical: 10
                  }}
                  label="Bio"
                  value={bio}
                  onChangeText={nextValue => setBio(nextValue)}
                />
              </View>
              <View style={styles.infoFormWrapper}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 16
                  }}
                >
                  Profile Information
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    color: '#666',
                    marginTop: 15
                  }}
                >
                  E-mail Address
                </Text>
                <View
                  style={{
                    marginTop: 2,
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd'
                  }}
                >
                  <Text>{user?.email}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setInputFor(2)}
                  activeOpacity={0.8}
                  style={styles.infoItem}
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#666'
                    }}
                  >
                    Phone number
                  </Text>
                  <View
                    style={{
                      marginTop: 2,
                      paddingBottom: 5,
                      borderBottomWidth: 1,
                      borderBottomColor: '#ddd'
                    }}
                  >
                    <Text>{user?.phone}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setInputFor(3)}
                  activeOpacity={0.8}
                  style={styles.infoItem}
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#666'
                    }}
                  >
                    Gender
                  </Text>
                  <View
                    style={{
                      marginTop: 2,
                      paddingBottom: 5,
                      borderBottomWidth: 1,
                      borderBottomColor: '#ddd'
                    }}
                  >
                    <Text>
                      {user?.gender === 0
                        ? 'Female'
                        : user?.gender === 1
                        ? 'Male'
                        : 'Prefer Not to Say'}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setInputFor(4)}
                  activeOpacity={0.8}
                  style={styles.infoItem}
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#666'
                    }}
                  >
                    Birthday
                  </Text>
                  <View
                    style={{
                      marginTop: 2,
                      paddingBottom: 5,
                      borderBottomWidth: 1,
                      borderBottomColor: '#ddd'
                    }}
                  >
                    <Text>
                      {(user.birthDay?.date || 1) +
                        '/' +
                        (user.birthDay?.month || 1) +
                        '/' +
                        (user.birthDay?.year || 1999)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.ScrollView>
        )}
        {inputFor === 2 && (
          <View style={styles.popupScreen}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  marginVertical: 20
                }}
              >
                Enter Your Phone Number
              </Text>
              <View
                style={{
                  ...styles.inputWrapper
                }}
              >
                <TouchableOpacity style={styles.btnPhoneCode}>
                  <View style={styles.phoneCodeTitleWrapper}>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: '#318BFB'
                      }}
                    >
                      VN +84
                    </Text>
                  </View>
                </TouchableOpacity>
                <TextInput
                  onChangeText={setPhone}
                  autoFocus={true}
                  placeholder="Phone"
                  keyboardType="number-pad"
                  returnKeyType="done"
                  style={styles.inputPhone}
                  value={phone}
                />
              </View>
            </View>
          </View>
        )}
        {inputFor === 3 && (
          <View style={styles.popupScreen}>
            <RadioGroup
              style={{ margin: 10 }}
              selectedIndex={gender}
              onChange={index => setGender(index as 0 | 1 | 2)}
            >
              <Radio>Female</Radio>
              <Radio>Male</Radio>
              <Radio>Prefer Not to Say</Radio>
            </RadioGroup>
          </View>
        )}
        {inputFor === 4 && (
          <View style={styles.popupScreen}>
            {console.log(
              birthDay.getFullYear() + '/' + birthDay.getMonth() + '/' + birthDay.getDate()
            )}
            <Datepicker
              label={'Birthday'}
              placeholder={'Pick day'}
              min={new Date(1999, 0, 1)}
              max={new Date(Date.now())}
              date={birthDay}
              onSelect={selectDate => setBirthday(selectDate)}
              accessoryRight={<Icon name="calendar" />}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default EditProfile
