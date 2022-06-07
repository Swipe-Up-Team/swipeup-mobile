import { Layout, Text } from '@ui-kitten/components'
import LottieView from 'lottie-react-native'
import React from 'react'
import { Pressable, View } from 'react-native'
import { DismissKeyboardView } from '@components/HOCs'
import { goBack } from '@src/navigation/navigation-service'
import styles from './styles'
import { SignupForm } from './components'
import { SignupFormValues } from './models'
import { userService } from '@src/services'
import { dispatch } from '@src/common'
import { onEndProcess, onStartProcess } from '@src/store/reducers/app-reducer'

export const SignupScreen = () => {
  const signupWithEmailAndPassword = async (data: SignupFormValues) => {
    dispatch(onStartProcess())
    const { email, password } = data
    await userService.createUserWithEmailAndPassword(email, password)
    dispatch(onEndProcess())
  }

  const navigateToLoginScreen = () => {
    goBack()
  }

  return (
    <DismissKeyboardView>
      <Layout style={styles.container}>
        <View style={styles.bannerContainer}>
          <LottieView
            style={styles.banner}
            source={require('@assets/lottie/login-banner.json')}
            autoPlay
            loop
          />
        </View>
        <SignupForm onSubmit={signupWithEmailAndPassword} />

        <View style={styles.footer}>
          <Text appearance="hint">Already have an account?</Text>
          <Pressable onPress={navigateToLoginScreen}>
            <Text status="primary"> Sign In</Text>
          </Pressable>
        </View>
      </Layout>
    </DismissKeyboardView>
  )
}
