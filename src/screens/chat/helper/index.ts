import { Conversation, CONVERSATION_TYPE, User } from '@src/models'
import { shortenConversationText } from '@src/utils'

export const getConversationName = (conversation: Conversation, listFriend: User[]) => {
  if (!conversation || !listFriend) return ''

  if (conversation.type === CONVERSATION_TYPE.DIRECT && listFriend.length !== 0) {
    return shortenConversationText(listFriend[0].name!)
  } else if (conversation.type === CONVERSATION_TYPE.GROUP && listFriend.length !== 0) {
    const listNames = listFriend.map(fr => fr.name).join(', ')
    return shortenConversationText(`[Group]: ${listNames}`)
  }

  return ''
}
