import React, { ReactNode } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface DismissKeyboardHOCProps {
  children: ReactNode
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: '100%',
    backgroundColor: '#fff'
  },
  keyboardAvoidingViewContainer: {
    position: 'relative'
  }
})

const DismissKeyboardHOC = (Comp: typeof View) => {
  return ({ children, ...props }: DismissKeyboardHOCProps) => (
    // <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingViewContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Comp style={{ flex: 1 }} {...props}>
            {children}
          </Comp>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
    // </SafeAreaView>
  )
}
export const DismissKeyboardView = DismissKeyboardHOC(View)
