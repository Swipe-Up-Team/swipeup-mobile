import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'

// import { hideLoading, PortalHost, ProgressDialog, showLoading } from '@components'
// import { ImageTransition } from '@library/components/light-box/image-transition';
import { NavigationContainer } from '@react-navigation/native'

import { navigationRef } from './navigation-service'
import { RootNavigation } from './root-navigator'
import { onLoadApp, onLoadAppEnd } from '@src/store/app-reducer'
import { MyAppTheme } from '@src/themes'
import { useSelector } from '@src/hooks'
import { dispatch, RXStore } from '@src/common/redux'

export const AppContainer = () => {
  // state
  const { token, loadingApp, theme } = useSelector(x => x.app)

  // effect
  useEffect(() => {
    dispatch(onLoadApp())
    dispatch(onLoadAppEnd())
  }, [])

  // TODO: show/hide loading dialog
  // useEffect(() => {
  //   if (showDialog) {
  //     showLoading()
  //   } else {
  //     hideLoading()
  //   }
  // }, [showDialog])

  // TODO: apply theme
  // useEffect(() => {
  //   if (theme === 'dark') {
  //     AppModule.setIQKeyboardOption({
  //       keyboardAppearance: 'dark'
  //     })
  //   } else {
  //     AppModule.setIQKeyboardOption({
  //       keyboardAppearance: 'light'
  //     })
  //   }
  // }, [theme])

  // render
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
      <>
        <StatusBar translucent backgroundColor={'transparent'} barStyle="dark-content" />
        {!loadingApp && (
          <>
            {/* <PortalHost name={'AppModal'} /> */}
            <RootNavigation token={token} />
            {/* <ProgressDialog /> */}
            {/* <SnackBar /> */}
            {/* <ImageTransition /> */}
          </>
        )}
        <RXStore />
      </>
    </NavigationContainer>
  )
}
