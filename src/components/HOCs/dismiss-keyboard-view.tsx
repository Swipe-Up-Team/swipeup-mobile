import React, { Component, ReactNode } from 'react'
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native'

interface DismissKeyboardHOCProps {
  children: ReactNode
}
const DismissKeyboardHOC = (Comp: typeof View) => {
  return ({ children, ...props }: DismissKeyboardHOCProps) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  )
}
export const DismissKeyboardView = DismissKeyboardHOC(View)
