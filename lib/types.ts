export enum Users {
  User = 'user',
  Interlocutor = 'interlocutor',
}

export interface Message {
  sender: Users;
  content: string;
  id: number;
  date: Date;
}

export interface ActiveMessage {
  id: number | null;
  top: number;
  left: number;
}