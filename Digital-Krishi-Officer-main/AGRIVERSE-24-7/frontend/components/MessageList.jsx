import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages, loading, onSpeak }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-agri-green/20 scrollbar-track-transparent">


            {messages.map((msg, index) => (
                <MessageBubble key={index} message={msg} onSpeak={onSpeak} />
            ))}

            {loading && (
                <div className="flex justify-start animate-pulse">
                    <div className="bg-white/50 px-4 py-3 rounded-2xl rounded-tl-sm text-stone-400 text-sm flex gap-2 items-center">
                        <span className="w-2 h-2 bg-agri-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-agri-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-agri-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                </div>
            )}
            <div ref={bottomRef} className="h-4" />
        </div>
    );
};

export default MessageList;
