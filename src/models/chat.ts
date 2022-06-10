export interface Message {
  id?: string
  senderId: string
  message: string
  image: string
  createdAt: number
}

export interface Conversation {
  id: string;
  userIds: string;
  messages: Message[] | any;
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