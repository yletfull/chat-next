import {Users} from "@/lib/types";

export const defaultMessages = [
  { sender: Users.User, content: 'Привет, как дела?', id: 0, date: new Date() },
  { sender: Users.Interlocutor, content: 'Привет! Хорошо, спасибо. А у тебя?', id: 1, date: new Date()},
  { sender: Users.User, content: 'Тоже отлично, спасибо!', id: 2, date: new Date() },
]

export default {
  defaultMessages
}