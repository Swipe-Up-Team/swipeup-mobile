import { Text } from '@ui-kitten/components'
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 16
  }
})
export type PostDescriptionType = {
  toggleNumberOfLines: () => void
}
export interface PostDescriptionProps {
  desc: string
  showFull: boolean
}
export const PostDescription = forwardRef(({ desc, showFull }: PostDescriptionProps, ref) => {
  const [textShown, setTextShown] = useState(false)
  const [lengthMore, setLengthMore] = useState(false)

  useImperativeHandle(ref, () => ({
    toggleNumberOfLines() {
      setTextShown(!textShown)
    }
  }))

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 3)
  }, [])

  const toggleNumberOfLines = () => {
    setTextShown(!textShown)
  }

  if (showFull) {
    return (
      <View style={styles.mainContainer}>
        <Text status="basic" style={styles.text}>
          {desc}
        </Text>
      </View>
    )
  } else
    return (
      <View style={styles.mainContainer}>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 3}
          style={styles.text}
          status="basic"
        >
          {desc}
        </Text>
        {lengthMore ? (
          <Text
            status="basic"
            onPress={toggleNumberOfLines}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ marginVertical: textShown ? 0 : 5, color: 'grey', fontWeight: '400' }}
          >
            {textShown ? '' : '...See more'}
          </Text>
        ) : null}
      </View>
    )
})
