import { Button } from '@ui-kitten/components'
import React, { useCallback, useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { EmailIcon, LockIcon } from '@src/components/icons'
import { ControlledInput } from '@src/components/form-controls'
import styles from './styles'
import { LoginFormValues } from '../../models'
import EyeIcon from '@src/components/form-controls/password-input'

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [secureText, setSecureText] = useState(true)

  const validate = useMemo<yup.SchemaOf<LoginFormValues>>(
    () =>
      yup.object().shape({
        email: yup.string().email().max(255).required('Email is required').label('Email'),
        password: yup.string().min(6).max(255).required('Password is required').label('Password')
      }),
    []
  )

  const formMethod = useForm<LoginFormValues>({
    resolver: yupResolver(validate)
  })

  const onSubmitKey = useCallback(() => {
    formMethod.handleSubmit(onSubmit)()
  }, [formMethod, onSubmit])

  const handleEmailSubmitPress = () => {
    formMethod.setFocus('password')
  }

  const changeSecureText = () => {
    setSecureText(!secureText)
  }

  return (
    <FormProvider {...formMethod}>
      <View style={styles.loginSection}>
        <Text style={styles.loginText}>Login</Text>
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
            accessoryRight={<EyeIcon isSecure={secureText} onChange={changeSecureText} />}
            secureTextEntry={secureText}
            onSubmitEditing={onSubmitKey}
          />
        </View>

        <View>
          <Button size="large" style={styles.loginBtn} onPress={onSubmitKey}>
            Sign In
          </Button>
        </View>
      </View>
    </FormProvider>
  )
}
