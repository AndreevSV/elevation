import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function LoginPage() {
 
  const { login } = useAuth();
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ login: loginInput, password: passwordInput });
      navigate("/");
  };


  return (
    <div>
      <h1>Login Page</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export { LoginPage };
