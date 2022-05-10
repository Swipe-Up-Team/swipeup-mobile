import { Layout, Text } from '@ui-kitten/components'
import LottieView from 'lottie-react-native'
import React, { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { DismissKeyboardView } from '@components/HOCs'
import { goBack } from '@src/navigation/navigation-service'
import styles from './styles'
import { SignupForm } from './components'
import { SignupFormValues } from './models'

export const SignupScreen = () => {
  const signupWithEmailAndPassword = (data: SignupFormValues) => {
    //TODO: implement this when BE is ready
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
