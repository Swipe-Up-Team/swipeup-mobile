/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, InputProps, Text } from '@ui-kitten/components'
import React, { useMemo } from 'react'
import { useController } from 'react-hook-form'

interface ControlledInputProps extends InputProps {
  inputName: string
}

export function ControlledInput(props: ControlledInputProps) {
  const { label, placeholder, status, inputName, defaultValue = '', ...rest } = props

  const {
    field: { onChange, onBlur, value, ref },
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
    <Input
      ref={ref}
      label={label}
      placeholder={placeholder}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      status={renderStatus}
      caption={error ? error.message : undefined}
      {...rest}
    />
  )
}
