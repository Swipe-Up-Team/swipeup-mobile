/* eslint-disable react-native/no-inline-styles */
import { useSelector } from '@src/common'
import { User } from '@src/models'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import ExpoFastImage from 'expo-fast-image'
import { SCREEN_WIDTH } from '@src/constants'
import { Icon } from '@ui-kitten/components'

const styles = StyleSheet.create({
  recommend: {
    marginVertical: 20
  },
  recommendItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    height: SCREEN_WIDTH * 0.6,
    width: SCREEN_WIDTH * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  circleIcon: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    borderColor: '#ddd',
    borderWidth: 1
  },
  btnModifyInfo: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#318bfb',
    borderRadius: 2
  }
})

export default function ProfileRecommend() {
  const user = useSelector(state => state.user).user as User

  const recommendTasks = [
    {
      type: 1,
      name: 'Add Bio',
      done: user && user.bio !== '',
      description: 'Tell your followers a little bit about yourself.',
      icon: 'message-circle-outline',
      button: 'Add Bio',
      buttonDone: 'Edit Bio'
    },
    {
      type: 2,
      name: 'Add Profile Photo',
      done: user && user.avatar !== '',
      description: 'Choose a profile photo to represent yourself on Instagram.',
      icon: 'person-outline',
      button: 'Add Photo',
      buttonDone: 'Edit Photo'
    },
    {
      type: 3,
      name: 'Add Your Name',
      done: user && user.name !== '',
      description: "Add your full name so your friends know it's your. ",
      icon: 'clipboard-outline',
      button: 'Add Name',
      buttonDone: 'Edit Name'
    },
    {
      type: 4,
      name: 'Find People To Follow',
      done: user?.followingIDs && user.followingIDs.length > 0,
      description: 'Follow peple and interests you care about.',
      icon: 'person-add-outline',
      button: 'Find People',
      buttonDone: 'Find More'
    }
  ].sort((a, b) => (a.done ? 1 : 0) - (b.done ? 1 : 0))

  const onDoTask = (type: number) => {
    if (type === 1 || type === 2 || type === 3) {
      /**
       * @todo Add navigate
       */
      // navigate('EditProfile')
    } else {
      /**
       * @todo Add navigate
       */
      // navigate('DiscoverPeople')
    }
  }

  return (
    <View style={styles.recommend}>
      <View
        style={{
          marginHorizontal: 15
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500'
          }}
        >
          Complete your profile
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#666'
          }}
        >
          <Text
            style={{
              color: 'green'
            }}
          >
            {recommendTasks.filter(x => x.done).length} OF {recommendTasks.length}{' '}
          </Text>
          COMPELTE
        </Text>
      </View>
      <ScrollView bounces={false} horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            margin: 15
          }}
        >
          {recommendTasks.map((task, index) => (
            <View key={index} style={styles.recommendItem}>
              <View
                style={{
                  ...styles.circleIcon,
                  borderColor: task.done ? '#333' : '#ddd'
                }}
              >
                <Icon fill={task.done ? '#333' : '#ddd'} name={task.icon} width={24} height={24} />
                <View
                  style={{
                    position: 'absolute',
                    bottom: -5,
                    right: -5
                  }}
                >
                  <ExpoFastImage
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 24,
                      borderWidth: 2,
                      borderColor: '#fff'
                    }}
                    source={require('@assets/icon/done.png')}
                  />
                </View>
              </View>
              <Text
                style={{
                  margin: 5,
                  fontWeight: '600'
                }}
              >
                {task.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  width: '80%',
                  textAlign: 'center',
                  color: '#666'
                }}
              >
                {task.description}
              </Text>
              <TouchableOpacity
                onPress={onDoTask.bind(null, task.type)}
                style={{
                  ...styles.btnModifyInfo,
                  borderColor: '#ddd',
                  borderWidth: task.done ? 1 : 0,
                  backgroundColor: task.done ? '#fff' : '#318bfb'
                }}
              >
                <Text
                  style={{
                    color: task.done ? '#333' : '#fff',
                    fontWeight: '500'
                  }}
                >
                  {!task.done ? task.button : task.buttonDone}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
