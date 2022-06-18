import { CONVERSATION_MAX_CHARACTERS } from '@src/constants'

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

export const formatDate = (time: number) => {
  const date = new Date(time)
  const originDay = date.getDate()
  const originMonth = date.getMonth() + 1
  const originYear = date.getFullYear()

  const day = originDay < 10 ? `0${originDay}` : originDay
  const month = originMonth < 10 ? `0${originMonth}` : originMonth

  const formattedDate = `${day}/${month}/${originYear}`
  return formattedDate
}

export const shortenConversationText = (text: string) => {
  if (text.length > CONVERSATION_MAX_CHARACTERS) {
    return `${text.substring(0, CONVERSATION_MAX_CHARACTERS)}...`
  }
  return text
}
