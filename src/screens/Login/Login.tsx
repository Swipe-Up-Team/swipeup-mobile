import { Button, Input } from '@ui-kitten/components'
import LottieView from 'lottie-react-native'
import React from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'
import { StyledDivider } from '@components/styled'
import { DismissKeyboardView } from '@components/HOCs'
import GoogleSignInButton from './components/google-sign-in-button'
import styles from './styles'

export const LoginScreen = () => {
  const [value, setValue] = React.useState('')

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
              value={value}
              size="large"
              onChangeText={nextValue => setValue(nextValue)}
              blurOnSubmit
            />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <Input
              style={styles.loginInput}
              value={value}
              size="large"
              onChangeText={nextValue => setValue(nextValue)}
              blurOnSubmit
            />
          </View>
          <View>
            <Button size="large" style={styles.loginBtn}>
              Sign In
            </Button>
          </View>

          <View style={{ marginVertical: 10 }}>
            <StyledDivider />
          </View>

          <View>
            <GoogleSignInButton onPress={() => {}} />
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
