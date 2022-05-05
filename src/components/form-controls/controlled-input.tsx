/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, InputProps, Text } from '@ui-kitten/components'
import React, { useMemo } from 'react'
import { useController } from 'react-hook-form'

interface ControlledInputProps extends InputProps {
  inputName: string
}

export function ControlledInput(props: ControlledInputProps) {
  const { label, status, inputName, defaultValue = '', ...rest } = props

  const {
    field: { onChange, onBlur, value },
    fieldState: { invalid, error }
  } = useController({
    name: inputName,
    defaultValue
  })

  const renderStatus = useMemo(() => {
    if (invalid) {
      return 'danger'
    }

    return status
  }, [invalid, status])

  return (
    <>
      <Input
        label={label}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        status={renderStatus}
        {...rest}
      />
      {/* <Text>{error?.message + '/' + error?.type}</Text> */}
    </>
  )
}
