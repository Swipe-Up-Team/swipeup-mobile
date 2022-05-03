import React, { ReactNode } from 'react'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'

interface DismissKeyboardHOCProps {
  children: ReactNode
}
const DismissKeyboardHOC = (Comp: typeof View) => {
  return ({ children, ...props }: DismissKeyboardHOCProps) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Comp style={{ flex: 1 }} {...props}>
          {children}
        </Comp>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
export const DismissKeyboardView = DismissKeyboardHOC(View)
