/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { Layout, Text } from '@ui-kitten/components'
import * as Google from 'expo-auth-session/providers/google'
import LottieView from 'lottie-react-native'
import React, { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { DismissKeyboardView } from '@components/HOCs'
import { StyledDivider } from '@components/styled'
import { googleConfig } from '@src/config/firebase-config'
import { firebaseService } from '@src/services/user-services'
import { GoogleSignInButton, LoginForm } from './components'
import { LoginFormValues } from './models'
import styles from './styles'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { onEndProcess, onStartProcess } from '@src/store/reducers/app-reducer'
import { dispatch } from '@src/common'

export const LoginScreen = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(googleConfig)

  const loginWithEmailAndPassword = async (data: LoginFormValues) => {
    dispatch(onStartProcess())
    const { email, password } = data
    await firebaseService.logInWithEmailAndPassword(email, password)
    dispatch(onEndProcess())
  }

  const loginWithGoogle = () => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      firebaseService.logInWithGoogle(id_token)
    } else {
      console.log('error', response)
    }
  }

  const navigateToSignupScreen = () => {
    navigate(APP_SCREEN.SIGNUP)
  }

  useEffect(() => {
    loginWithGoogle()
  }, [response])

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
        <LoginForm onSubmit={loginWithEmailAndPassword} />

        <View style={styles.dividerContainer}>
          <StyledDivider text="OR" />
        </View>

        <View style={styles.googleLoginContainer}>
          <GoogleSignInButton onPress={() => promptAsync({ showInRecents: true })} />
        </View>

        <View style={styles.footer}>
          <Text appearance="hint">Don't have an account?</Text>
          <Pressable onPress={navigateToSignupScreen}>
            <Text status="primary"> Sign Up</Text>
          </Pressable>
        </View>
      </Layout>
    </DismissKeyboardView>
  )
}
