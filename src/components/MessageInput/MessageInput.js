import { useState } from "react";

function MessageInput({ onSendMessage }) {
    const [text, setText] = useState("");

    function onChange(e) {
        setText(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        if(!text) {
            return(alert("Please enter something"))
        }
        setText("");
        onSendMessage(text);
    }

    return (
        <div className="message-input">
            <form onSubmit={e => onSubmit(e)}>
                <input onChange={e => onChange(e)} value={text} type="text" placeholder="Enter your message" autoFocus />
            <button type="submit">
                SEND
            </button>
            </form>
        </div>
    );
}

export default MessageInput;