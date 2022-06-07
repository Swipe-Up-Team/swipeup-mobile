import TopHeader from './components/top-header'
import { ContentView } from './components'
import { RouteProp, useRoute } from '@react-navigation/native'
import { APP_SCREEN, AuthorizeParamsList } from '@src/navigation/screen-types'

export const ChatRoomScreen = () => {
  const route = useRoute<RouteProp<AuthorizeParamsList, APP_SCREEN.CHAT_ROOM>>()
  const { conversationId } = route.params

  return (
    <>
      <TopHeader />
      <ContentView conversationId={conversationId}/>
    </>
  )
}
