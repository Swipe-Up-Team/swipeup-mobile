import { GoogleIcon } from '@src/components/icons'
import React from 'react'

import { Button } from '@ui-kitten/components'

export function GoogleSignInButton({ onPress }: { onPress: () => void }) {
  return (
    <Button
      status="basic"
      accessoryLeft={<GoogleIcon />}
      onPress={onPress}
      size="large"
      style={{ width: '100%' }}
    >
      Sign in with Google
    </Button>
  )
}
