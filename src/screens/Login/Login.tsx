/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import LottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import * as Google from 'expo-auth-session/providers/google'
import Constants from 'expo-constants'

import { StyledDivider } from '@components/styled'
import { DismissKeyboardView } from '@components/HOCs'
import { GoogleSignInButton } from './components'
import styles from './styles'
import { firebaseService } from '@src/services/firebase-services'
import { googleConfig } from '@src/config/firebase-config'
import EmailIcon from '@assets/icon/email'
import LockIcon from '@assets/icon/lock'

export const LoginScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(googleConfig)

  const loginWithEmailAndPassword = () => {
    firebaseService.logInWithEmailAndPassword(username, password)
  }

  const loginWithGoogle = () => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      firebaseService.logInWithGoogle(id_token)
    } else {
      console.log('error', response)
    }
  }

  useEffect(() => {
    loginWithGoogle()

    console.log('Constants.manifest?.releaseChannel: ', Constants.manifest?.releaseChannel)
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

        <View style={styles.loginSection}>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.inputsContainer}>
            <Input
              label="Your email"
              style={styles.loginInput}
              value={username}
              size="large"
              accessoryLeft={<EmailIcon />}
              onChangeText={nextValue => setUsername(nextValue)}
              blurOnSubmit
            />
          </View>
          <View style={styles.inputsContainer}>
            <Input
              label="Password"
              style={styles.loginInput}
              value={password}
              size="large"
              accessoryLeft={<LockIcon />}
              onChangeText={nextValue => setPassword(nextValue)}
              blurOnSubmit
            />
          </View>

          <View>
            <Button size="large" style={styles.loginBtn} onPress={loginWithEmailAndPassword}>
              Sign In
            </Button>
          </View>

          <View style={styles.dividerContainer}>
            <StyledDivider text="OR" />
          </View>

          <View>
            <GoogleSignInButton onPress={() => promptAsync({ showInRecents: true })} />
          </View>

          <View style={styles.footer}>
            <Text appearance="hint">Don't have an account?</Text>
            <Pressable>
              <Text status="primary"> Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </Layout>
    </DismissKeyboardView>
  )
}
