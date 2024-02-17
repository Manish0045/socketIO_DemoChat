import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chats = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (!currentMessage) return;
        const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
        }
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData])
        setCurrentMessage("");
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])
    return (
        <div className='chat-window'>
            <div className="chat-header">
                <p>Let's Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className='message-container'>
                    {
                        messageList.map(function (messageContent) {
                            return (
                                <div className="message" id={username === messageContent.author ? "you" : "other"}>
                                    <div>
                                        <div className="message-content">
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id='time'>{messageContent.time}</p>
                                            <p id='author'>{messageContent.author}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    name="message_textbox"
                    placeholder="Hey...."
                    id="message_textbox"
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => { e.key === 'Enter' && sendMessage() }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div >
    )
}

export default Chats