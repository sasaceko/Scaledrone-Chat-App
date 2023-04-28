import classNames from "classnames";

function Messages({ messages, currentMember }) {

  function renderMessage(message, i) {
    const { member, text } = message;
    const messageFromMe = member.id === currentMember.id;

    return (
      <li className={classNames('message', messageFromMe && 'current-member')} key={i}>
        <img src={`/avatars/${member.clientData.avatar}`} alt="avatar logo" width="60" height="60"/>
        <div className="message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }

  return (
    <ul className="messages-list">
      {messages.map((message, i) => renderMessage(message, i))}
    </ul>
  );
}

export default Messages;