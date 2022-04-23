import * as eva from '@eva-design/eva'
import { AppContainer } from '@src/navigation/app-navigation'
import { LoginScreen } from '@src/screens/Login'
import store from '@store/store'
import { ApplicationProvider } from '@ui-kitten/components'
import React, { Suspense } from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Suspense fallback={null}>
          <AppContainer />
          {/* <LoginScreen /> */}
        </Suspense>
      </ApplicationProvider>
    </Provider>
  )
}
