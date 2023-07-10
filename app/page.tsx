import Image from 'next/image'
import Chat from '@/pages/chats/[chat-id]/index'

export default function Home() {
  return (
    <main className="flex h-screen p-24">
      <Chat />
    </main>
  )
}
