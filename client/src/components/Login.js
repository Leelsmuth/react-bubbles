import React, { useRef, useState } from "react";
import axios from "axios";

export default function Login(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");

  const submit = () => {
    axios
      .post("http://localhost:5000/api/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      })
      .then(res => {
        localStorage.setItem("token", res.data.payload);

        props.history.push("/bubble");
      })
      .catch(error => {
        setError(error.response.data.error);
      });
  };

  return (
    <div className="login">
      <div className="login-inputs">
        username <input ref={usernameRef} type="text" />
        <br />
        password <input ref={passwordRef} type="text" />
      </div>
      {error && <p>{error}</p>}
      <div>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}
