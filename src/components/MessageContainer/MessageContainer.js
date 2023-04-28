import Messages from '../Messages/Messages';
import classNames from "classnames";

function MessageContainer({ messages, member, darkMode}) {
    return (
        <div className={classNames('message-container', darkMode ? "dark" : "light")}>
            <Messages messages={messages} currentMember={member} />
        </div>
    );
}

export default MessageContainer;