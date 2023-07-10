'use client'
import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {ActiveMessage, Message} from "@/lib/types";

interface Props {
  onAddMessage: (message: string) => void;
}

function InputView(props: Props) {
  const {
    onAddMessage,
  } = props;

  const [message, setMessage] = useState('');

  const handleSubmit = () => onAddMessage(message);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
      setMessage('')
    }
  };

  return (
    <div className="absolute bottom-5 left-5 right-5 h-48 bg-white">
        <textarea
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
  );
}

export default InputView;


