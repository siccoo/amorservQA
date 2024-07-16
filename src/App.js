import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setErrorMessage("");
      alert("Login successful");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login Page</h1>
        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button id="loginButton" onClick={handleLogin}>
          Login
        </button>
        {errorMessage && (
          <div id="errorMessage" style={{ color: "red" }}>
            {errorMessage}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
