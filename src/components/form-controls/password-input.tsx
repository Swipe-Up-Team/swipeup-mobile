import { Icon, IconProps } from '@ui-kitten/components'
import { TouchableWithoutFeedback } from 'react-native'

interface PasswordFieldProps {
  type: string
  isSecure: boolean
  onChange: () => void
}

type Props = IconProps & PasswordFieldProps

const EyeIcon = ({ isSecure, onChange, ...props }: Props) => (
  <TouchableWithoutFeedback onPress={onChange}>
    <Icon {...props} name={isSecure ? 'eye-off' : 'eye'} />
  </TouchableWithoutFeedback>
)

export default EyeIcon
