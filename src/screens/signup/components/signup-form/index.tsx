import { Button, Icon, IconProps } from '@ui-kitten/components'
import React, { useCallback, useMemo, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import EmailIcon from '@assets/icon/email'
import LockIcon from '@assets/icon/lock'
import { ControlledInput } from '@src/components/form-controls'
import styles from './styles'
import { SignupFormValues } from '../../models'

interface SignupFormProps {
  onSubmit: (data: SignupFormValues) => void
}

export function SignupForm({onSubmit}: SignupFormProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const validate = useMemo<yup.SchemaOf<SignupFormValues>>(
    () =>
      yup.object().shape({
        email: yup.string().email().max(255).required('Email is required').label('Email'),
        password: yup.string().min(6).max(255).required('Password is required').label('Password'),
        confirmPassword: yup
          .string()
          .min(6)
          .max(255)
          .required('Password is required')
          .label('Password')
      }),
    []
  )

  const formMethod = useForm<SignupFormValues>({
    resolver: yupResolver(validate)
  })

  const onSubmitKey = useCallback(() => {
    formMethod.handleSubmit(onSubmit)()
  }, [formMethod, onSubmit])

  const renderEyeIcon = (props: IconProps) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSecureTextEntry(!secureTextEntry)
      }}
    >
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  )

  const handleEmailSubmitPress = () => {
    formMethod.setFocus('password')
  }

  const handlePasswordSubmitPress = () => {
    formMethod.setFocus('confirmPassword')
  }

  return (
    <FormProvider {...formMethod}>
      <View style={styles.loginSection}>
        <Text style={styles.loginText}>Signup</Text>
        <View style={styles.inputsContainer}>
          <ControlledInput
            label="Email"
            placeholder="mymail@domain.abc"
            inputName="email"
            size="large"
            accessoryLeft={<EmailIcon />}
            style={styles.loginInput}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={handleEmailSubmitPress}
          />
        </View>
        <View style={styles.inputsContainer}>
          <ControlledInput
            label="Password"
            placeholder="••••••••••"
            inputName="password"
            size="large"
            accessoryLeft={<LockIcon />}
            style={styles.loginInput}
            accessoryRight={renderEyeIcon}
            onSubmitEditing={handlePasswordSubmitPress}
          />
        </View>
        <View style={styles.inputsContainer}>
          <ControlledInput
            label="Confirm Password"
            placeholder="••••••••••"
            inputName="confirmPassword"
            size="large"
            accessoryLeft={<LockIcon />}
            style={styles.loginInput}
            accessoryRight={renderEyeIcon}
            onSubmitEditing={onSubmitKey}
          />
        </View>

        <View>
          <Button size="large" style={styles.loginBtn} onPress={onSubmitKey}>
            Sign Up
          </Button>
        </View>
      </View>
    </FormProvider>
  )
}
