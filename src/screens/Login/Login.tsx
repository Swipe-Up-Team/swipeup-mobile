import { Button, Input } from '@ui-kitten/components'
import LottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'
import { StyledDivider } from '@components/styled'
import { DismissKeyboardView } from '@components/HOCs'
import GoogleSignInButton from './components/google-sign-in-button'
import styles from './styles'
import { firebaseService } from '@src/services/firebase-services'
import * as Google from 'expo-auth-session/providers/google'
import { googleConfig } from '@src/config/firebase-config'

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
      console.log('error', response?.type)
    }
  }
 
  useEffect(() => {
    loginWithGoogle()
  }, [response])

  return (
    <DismissKeyboardView>
      <SafeAreaView style={styles.container}>
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
            <Text style={styles.inputLabel}>Your email</Text>
            <Input
              style={styles.loginInput}
              value={username}
              size="large"
              onChangeText={nextValue => setUsername(nextValue)}
              blurOnSubmit
            />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <Input
              style={styles.loginInput}
              value={password}
              size="large"
              onChangeText={nextValue => setPassword(nextValue)}
              blurOnSubmit
            />
          </View>
          <View>
            <Button size="large" style={styles.loginBtn} onPress={loginWithEmailAndPassword}>
              Sign In
            </Button>
          </View>

          <View style={{ marginVertical: 10 }}>
            <StyledDivider />
          </View>

          <View>
            <GoogleSignInButton onPress={() => promptAsync({ showInRecents: true })} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Text>Don't have an account?</Text>
            <Pressable>
              <Text style={{ color: '#5243AA', fontWeight: '500' }}> Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboardView>
  )
}
