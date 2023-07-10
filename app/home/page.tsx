'use client'
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

enum Users {
  User = 'user',
  Interlocutor = 'interlocutor',
}

interface Message {
  sender: Users;
  content: string;
  id: number;
}

interface ActiveMessage {
  id: number | null;
  top: number;
  left: number;
}

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: Users.User, content: 'Привет, как дела?', id: 0 },
    { sender: Users.Interlocutor, content: 'Привет! Хорошо, спасибо. А у тебя?', id: 1 },
    { sender: Users.User, content: 'Тоже отлично, спасибо!', id: 2 },
  ]);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [activeMessage, setActiveMessage] = useState<ActiveMessage | null>(null);

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  const handleSubmit = () => {
    setMessages((prev) => [
      ...prev,
      {
        sender: Users.User,
        content: message,
        id: prev[prev.length - 1].id + 1,
      },
    ]);
    setMessage('');
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.preventDefault();
    const top = e.clientY;
    const left = e.clientX;
    setActiveMessage({ id, top, left });
  };

  const handleDeleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
    setActiveMessage(null);
  };

  const handleCopyMessage = (id: number) => {
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      navigator.clipboard.writeText(message.content);
      setActiveMessage(null);
    }
  };

  return (
    <div className="w-full h-full flex-col justify-between">
      <div className="mb-32 flex flex-col w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${message.sender === 'user' ? 'self-end' : 'self-start'} w-full max-w-[30ch] mb-4 transition-opacity duration-500 ${
              shouldAnimate ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={(e) => handleContextMenu(e, message.id)}
          >
            <div
              className={`rounded-lg border border-transparent px-5 py-4 transition-colors ${
                message.sender === 'user' ? 'bg-gray-100 text-right' : 'bg-gray-200 text-left'
              } hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
            >
              <p className="m-0 text-sm opacity-70">{message.content}</p>
            </div>
          </div>
        ))}

        {activeMessage && (
          <div
            className="fixed bg-white p-2 rounded-lg shadow flex-col flex justify-start"
            style={{ top: activeMessage.top, left: activeMessage.left }}
          >
            <button onClick={() => handleDeleteMessage(activeMessage.id!)}>Удалить</button>
            <button onClick={() => handleCopyMessage(activeMessage.id!)}>Копировать</button>
          </div>
        )}
      </div>

      <div className="relative w-full h-48">
        <textarea
          type="text"
          placeholder="Введите текст"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 dark:bg-neutral-800/30 m-0 text-sm opacity-50 outline-none bg-transparent"
        />

        <button
          onClick={handleSubmit}
          className="absolute bottom-2 right-2 bg-transparent border-none outline-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 48 48"
            stroke="currentColor"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 48 48"
              stroke="currentColor"
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
            >
              <path xmlns="http://www.w3.org/2000/svg" className="cls-1 hover:fill-gray-400"
                    d="M40.83,8.48c1.14,0,2,1,1.54,2.86l-5.58,26.3c-.39,1.87-1.52,2.32-3.08,1.45L20.4,29.26a.4.4,0,0,1,0-.65L35.77,14.73c.7-.62-.15-.92-1.07-.36L15.41,26.54a.46.46,0,0,1-.4.05L6.82,24C5,23.47,5,22.22,7.23,21.33L40,8.69a2.16,2.16,0,0,1,.83-.21Z"/>
            </svg>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Chat;


