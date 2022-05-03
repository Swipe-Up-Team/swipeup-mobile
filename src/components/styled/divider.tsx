import { Divider, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  dividerContainer: { flexDirection: 'row', alignItems: 'center' },
  divider: { flex: 1 },
  dividerText: { marginHorizontal: 12 }
})

interface StyledDividerProps {
  text?: string
}

export function StyledDivider({ text }: StyledDividerProps) {
  if (!text) return <Divider style={styles.divider} />

  return (
    <View style={styles.dividerContainer}>
      <Divider style={styles.divider} />
      <Text appearance="hint" style={styles.dividerText}>
        {text}
      </Text>
      <Divider style={styles.divider} />
    </View>
  )
}
