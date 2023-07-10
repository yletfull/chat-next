'use client'
import React, {useEffect, useState} from 'react';
import {ActiveMessage, Message} from "@/lib/types";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import dayjs from "dayjs";

interface Props {
  messages: Message[];
  onDeleteMessage: (id: number) => void;
}

function MessagesView(props: Props) {
  const {
    messages = [],
    onDeleteMessage,
  } = props;

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [activeMessage, setActiveMessage] = useState<ActiveMessage | null>(null);

  const handleClickOutside = () => activeMessage !== null && setActiveMessage(null)

  useClickOutside({
    handleClickOutside,
  })

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.preventDefault();
    const top = e.clientY;
    const left = e.clientX;
    setActiveMessage({ id, top, left });
  };

  const handleDeleteMessage = (id: number) => {
    setActiveMessage(null);
    onDeleteMessage(id)
  };

  const handleCopyMessage = (id: number) => {
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      navigator.clipboard.writeText(message.content);
      setActiveMessage(null);
    }
  };

  return (
    <div className="w-full h-full flex-col justify-between overflow-y-scroll">
      <div className="mb-32 flex flex-col w-full h-full overflow-y-scroll">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${message.sender === 'user' ? 'self-end' : 'self-start'} w-full max-w-[30ch] mb-4 transition-opacity duration-500 ${
              shouldAnimate ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={(e) => handleContextMenu(e, message.id)}
          >
            <div
              className={`relative rounded-lg border border-transparent px-5 py-5 mb-2 transition-colors ${
                message.sender === 'user' ? 'bg-gray-100 text-right' : 'bg-gray-200 text-left'
              } hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
            >
              <p className="m-0 text-sm opacity-70">{message.content}</p>
              <p className="absolute right-0 -bottom-5 text-xs opacity-70 font-thin">{dayjs(message?.date || null).format('DD.MM.YYYY HH:MM:ss')}</p>
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
    </div>
  );
}

export default MessagesView;


