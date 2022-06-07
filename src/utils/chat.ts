import { CONVERSATION_MAX_CHARACTERS } from "@src/constants"

export const formatTime = (time: number) => {
  const date = new Date(time)
  const originHour = date.getHours()
  const originMinute = date.getMinutes()

  const suffix = originHour >= 12 ? 'PM' : 'AM'
  const hours = originHour >= 12 ? originHour - 12 : originHour
  const minutes = originMinute < 10 ? `0${originMinute}` : originMinute

  const formattedTime = `${hours}:${minutes} ${suffix}`
  return formattedTime
}

export const shortenConversationText = (text: string) => {
  if (text.length > CONVERSATION_MAX_CHARACTERS) {
    return `${text.substring(0, CONVERSATION_MAX_CHARACTERS)}...`
  }
  return text
}