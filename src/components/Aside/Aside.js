import classNames from "classnames";

function Aside({ members, messages, darkMode }) {
  return (
    <aside className={classNames('aside', darkMode ? "dark" : "light")}>
      <section className="aside-top">
        <h2>Users in room</h2>
        <ul>
          {members.map((member, i) => {
            return (
              <li key={i}>
                <img src={`/avatars/${member.clientData.avatar}`} alt="avatar logo" width="60" height="60"/>
                <b>{member.clientData.username}</b>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="aside-bottom">
        <h2>Room History</h2>
          <ul>
            {messages.map((message, i) => {
              return (
                <li key={i}>
                  <p><b>{message.member.clientData.username}</b> sent message</p>
                </li>
              );
            })}
          </ul>
      </section>
    </aside>
  );
}

export default Aside;
