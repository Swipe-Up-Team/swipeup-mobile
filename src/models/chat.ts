/* eslint-disable @typescript-eslint/naming-convention */
export enum CONVERSATION_TYPE {
  DIRECT = 'direct',
  GROUP = 'group'
}

export enum MESSAGE_TYPE {
  MESSAGE = 'message',
  IMAGE = 'image'
}

export interface Message {
  id?: string
  type: MESSAGE_TYPE
  senderId: string
  message: string
  image: string
  createdAt: number
}

export interface Conversation {
  id: string
  userIds: string
  typingIds: string
  messages: Message[] | any
  type: CONVERSATION_TYPE
  // title: string | null;
  // description: string | null;
  // background: string | null;
  // emoji: string | null;
  // sending: boolean;
  // error: string;
  // active: boolean;
  // page: number;
  // total: number,
  // scrollHeight: number | null,
  // loaded: boolean;
}
