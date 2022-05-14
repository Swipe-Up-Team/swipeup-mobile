import { View } from 'react-native'

interface WithLoadingProps {
  loading: boolean
}

export const withLoading =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P & WithLoadingProps> =>
  ({ loading, ...props }: WithLoadingProps) =>
    loading ? <View>Loading...</View> : <Component {...(props as P)} />
