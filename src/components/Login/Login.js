import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import classNames from 'classnames';

function Login({ onLogin, darkMode }) {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const imagesList = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
  const avatarImages = document.querySelectorAll('.avatar-container img');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAvatarChange = (event, image) => {
    setAvatar(image.toString());
  };

  avatarImages.forEach(image => {
    image.addEventListener('click', function() {
      avatarImages.forEach(image => {
        image.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  
  const handleLoginClick = () => {
    var modal = document.getElementById("myModal");
    if(username.trim() !== "" && avatar !== "") {
      onLogin({ username, avatar });
    } else if(username.trim() === "" && avatar === "") {
      setErrorMessage("Unesite korisničko ime te odaberite Avatar");
      return(modal.style.display = "block");
    } else if(avatar === "") {
      setErrorMessage("Odaberite Avatar");
      return(modal.style.display = "block");
    } else {
      setErrorMessage("Unesite korisničko ime");
      return(modal.style.display = "block");
    }
  };

  return (
    <>
    <Modal error={errorMessage} darkMode={darkMode} />
    <div className={classNames("login-container", darkMode ? "dark" : "light")}>
      <h1>Login</h1>
      <div className="username-input">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
      </div>
      <p>Choose Avatar</p>
      <div className='avatar-container'>
        {imagesList.map((image, i) => {
          return (
              <img key={i} src={`/avatars/${image}`} alt="avatar" width="60" height="60" onClick={event => handleAvatarChange(event, image)} />
          )
        })
        }
      </div>
      <button onClick={handleLoginClick}>Login</button>
    </div>
    </>
  );
}

export default Login;