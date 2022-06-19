import { AuthorizeParamsList } from '@src/navigation/screen-types'

export type Notification = {
  id: string
  userId: string
  activityType: number
  sourceId: string
  parentId: string
  parentType: number
  seen: number
  createdAt: number
}
export interface NotificationPayload<K extends keyof AuthorizeParamsList> {
  to: string
  sound: 'default'
  title: string
  body: string
  data: {
    navigation?: {
      route: K
      params: AuthorizeParamsList[K]
    }
  }
}
