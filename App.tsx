import * as eva from '@eva-design/eva'
import { AppContainer } from '@src/navigation/app-navigation'
import store from '@store/store'
import { ApplicationProvider } from '@ui-kitten/components'
import * as WebBrowser from 'expo-web-browser'
import React, { Suspense } from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { default as customTheme } from '@themes/custom-theme.json'
import { customMapping } from '@src/themes/mapping'

WebBrowser.maybeCompleteAuthSession()

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider
        {...eva}
        customMapping={customMapping}
        theme={{ ...eva.light, ...customTheme }}
      >
        <Suspense fallback={null}>
          <AppContainer />
          {/* <LoginScreen /> */}
        </Suspense>
      </ApplicationProvider>
    </Provider>
  )
}
