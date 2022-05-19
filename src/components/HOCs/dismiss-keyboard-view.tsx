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

interface DismissKeyboardHOCProps {
  children: ReactNode
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  }
})

const DismissKeyboardHOC = (Comp: typeof View) => {
  return ({ children, ...props }: DismissKeyboardHOCProps) => (
    <KeyboardAvoidingView
      style={styles.container}
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
  )
}
export const DismissKeyboardView = DismissKeyboardHOC(View)
