import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chats from './Chats';


const socket = io.connect('http://localhost:2299');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChats, setShowChats] = useState(false);

  const joinRoom = () => {
    if (!username || !room) return;
    socket.emit('join_room', room);
    setShowChats(true);
  };
  return (
    <div className="App">
      {!showChats ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input type="text" name="username" placeholder='john...' id="username" onChange={(e) => setUsername(e.target.value)} />
          <input type="text" name="roomId" placeholder='Room ID....' id="roomId" onChange={(e) => setRoom(e.target.value)} />
          <button onClick={joinRoom}>Join Room</button>
        </div>)
        :
        (<Chats socket={socket} username={username} room={room} />)
      }
    </div>
  );
}

export default App;
