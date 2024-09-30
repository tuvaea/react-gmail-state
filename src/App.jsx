import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  //console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const updateHideRead = () => {
    setHideRead(!hideRead);
  }

  const toggleStar = (id) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === id) {
        return { ...email, starred: !email.starred };
      }
      return email;
    });

    setEmails(updatedEmails); 
  };

  const toggleRead = (id) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === id) {
        return { ...email, read: !email.read };
      }
      return email;
    });

    setEmails(updatedEmails); 
  };

  const listEmails = emails
  .filter(email => !hideRead || !email.read)
  .map((email) =>
    <li className={`email ${email.read ? 'read' : 'unread'}`} key={email.id}>
      <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"
          checked = {email.read}
          onChange={() => toggleRead(email.id)}
          />
      </div>
      <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
          checked={email.starred}
          //checked = {initialStar(email.starred)}
          onChange={() => toggleStar(email.id)}
        />
      </div>
      <div className="sender">{email.sender}</div>
      <div className="title">{email.title}</div>
  </li>
  )
  

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={updateHideRead}
            />
          </li>
        </ul>
      </nav>
      <main className="emails"> {/* Render a list of emails here */
        <ul>
          {listEmails}
        </ul>
      }
      </main>
    </div>
  )
}

export default App
