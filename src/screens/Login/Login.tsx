import LottieView from 'lottie-react-native'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import styles from './styles'

export const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerContainer}>
        <LottieView
          style={styles.banner}
          source={require('../../../assets/lottie/login-banner.json')}
          autoPlay
          loop
        />
      </View>

      <View style={styles.loginSection}>
        <Text style={styles.loginText}>Login</Text>
        <View></View>
      </View>
    </SafeAreaView>
  )
}
