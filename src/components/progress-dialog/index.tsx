import React, { createRef, forwardRef, memo, useImperativeHandle, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import isEqual from 'react-fast-compare'

import { useDisableBackHandler, useDismissKeyboard } from '@src/common'
import { useTheme } from '@src/themes'

import { styles } from './styles'

import { Spinner as KTSpinner } from '@ui-kitten/components'

const Spinner = memo(() => {
  // state
  const theme = useTheme()
  // render
  // return <ActivityIndicator color={theme.colors.background} size={'large'} />
  return <KTSpinner status="control" size={'medium'} />
}, isEqual)

const ProgressDialogComponent = forwardRef((_, ref) => {
  // state
  const [visible, setVisible] = useState(false)

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true)
      },
      hide: () => {
        setVisible(false)
      }
    }),
    []
  )

  useDisableBackHandler(visible)

  useDismissKeyboard(visible)

  // render
  return visible ? (
    <>
      <View style={[styles.container]}>
        <Spinner />
      </View>
    </>
  ) : null
})

export const progressDialogRef = createRef<ProgressDialogRef>()
export const ProgressDialog = memo(
  () => <ProgressDialogComponent ref={progressDialogRef} />,
  isEqual
)
export const showLoading = () => {
  progressDialogRef.current?.show()
}

export const hideLoading = () => {
  progressDialogRef.current?.hide()
}
export interface ProgressDialogRef {
  show(): void
  hide(): void
}
