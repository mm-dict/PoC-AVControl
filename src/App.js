import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('idle');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8765');
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === 'starting') {
        setStatus('starting');
      }
    };
  }, [socket]);

  const startAV = () => {
    if (socket) {
      socket.send(JSON.stringify({ command: 'start' }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lecture Hall AV Control</h1>
        {status === 'idle' ? (
          <button onClick={startAV}>Start Audio-video</button>
        ) : (
          <div>
            <h2>Starting AV System</h2>
            <p>Please wait while the system initializes...</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
