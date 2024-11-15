import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllMessage from '@/hooks/useGetAllMessage';
import useGetRTM from '@/hooks/useGetRTM';

const Messages = ({ selectedUser }) => {
    useGetRTM();
    useGetAllMessage();
    const { messages } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth);

    const [isTyping, setIsTyping] = useState(false);
    const { socket } = useSelector(store => store.socketio);

    useEffect(() => {
        socket?.on('typing', ({ senderId, isTyping }) => {
            if (senderId === selectedUser._id) {
                setIsTyping(isTyping);
            }
        });

        return () => {
            socket?.off('typing');
        };
    }, [socket, selectedUser]);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 bg-gray-100 shadow-sm">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
                    <AvatarFallback>{selectedUser?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="font-semibold text-lg">{selectedUser?.username}</h2>
                    {isTyping && <p className="text-sm text-gray-500">Typing...</p>}
                </div>
                <Link to={`/profile/${selectedUser?._id}`} className="ml-auto">
                    <Button className="h-8" variant="secondary">View Profile</Button>
                </Link>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages && messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'} mb-3`}
                    >
                        <div
                            className={`p-3 rounded-lg max-w-xs text-sm break-words shadow-md ${
                                msg.senderId === user?._id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black'
                            }`}
                        >
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Messages;
