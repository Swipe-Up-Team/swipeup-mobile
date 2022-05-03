import GoogleIcon from '@assets/icon/google'
import React from 'react'

import { Button } from '@ui-kitten/components'

export function GoogleSignInButton({ onPress }: { onPress: () => void }) {
  return (
    <Button status="basic" accessoryLeft={<GoogleIcon />} onPress={onPress} size="large">
      Sign in with Google
    </Button>
  )
}
