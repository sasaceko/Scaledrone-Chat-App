import React, { useState, useRef, useEffect } from 'react';
import MessageContainer from './components/MessageContainer/MessageContainer';
import MessageInput from './components/MessageInput/MessageInput';
import Aside from './components/Aside/Aside';
import Login from './components/Login/Login';

function App() {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState("");
  const [membersList, setMembersList] = useState([]);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.querySelector("body").classList.toggle("dark");
  };

  const droneRef = useRef(null);

  useEffect(() => {
    if (!member || droneRef.current) {
      return;
    }

    const drone = new window.Scaledrone("3jfYv0OClLhDzI2v", {
      data: member
    });

    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const newMember = {...member};
      newMember.id = drone.clientId;
      setMember(newMember);
    });

    drone.on('close', () => {
      console.log('Connection closed, trying to reconnect...');
      setTimeout(() => {
        drone.connect();
      }, 2000);
    });

    const room = drone.subscribe("observable-room");

    room.on('data', (data, member) => {
      setMessages(prevMessages => [...prevMessages, { member, text: data }]);
    });

    room.on('members', members => {
      setMembersList(members);
    })
    
    droneRef.current = drone;
  }, [member]);

  const onLogin = (username) => {
    setMember(username);
  };

  const onSendMessage = (message) => {
    droneRef.current.publish({
      room: "observable-room",
      message
    });
  };

  return (
    <div className='app'>
      <label>
        <input type='checkbox' onChange={handleDarkModeToggle}/>
        <span className='slider'></span>
      </label>
      {member ? (
        <>
          <div className='sidebar'>
            <input className="mobile-menu" type='checkbox' />
            <Aside members={membersList} messages={messages} darkMode={isDarkMode} />
          </div>
          <div className='app-messages-container'>
            <MessageContainer messages={messages} member={member} darkMode={isDarkMode} />
            <MessageInput onSendMessage={onSendMessage} />
          </div>
        </>
      ) : (
        <Login onLogin={onLogin} darkMode={isDarkMode} />
      )}
    </div>
  );
}

export default App;