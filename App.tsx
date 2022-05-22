import * as eva from '@eva-design/eva'
import { AppContainer } from '@src/navigation/app-navigation'
import store, { persistor } from '@store/store'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import * as WebBrowser from 'expo-web-browser'
import React, { Suspense } from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { default as customTheme } from '@themes/custom-theme.json'
import { customMapping } from '@src/themes/mapping'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { PersistGate } from 'redux-persist/integration/react'

WebBrowser.maybeCompleteAuthSession()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          customMapping={customMapping}
          theme={{ ...eva.light, ...customTheme }}
        >
          <Suspense fallback={null}>
            <AppContainer />
          </Suspense>
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  )
}
