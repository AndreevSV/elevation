import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { User } from "../types/user";
// import { decipher } from "../utils/encryptStr"
import {useTranslation} from 'react-i18next'

function LoginPage() {
  const {t} = useTranslation();
  const [underFromText, setUnderFromText] = useState<string>("");

  const navigate = useNavigate();
  const { setId, setEmail, setFirstName, setLastName, setRole, users } =
    useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    email = email.trim();
    password = password.trim();
    if (validateUser(email, password)) {
      setId(getUser(email).id);
      setEmail(email);
      setFirstName(getUser(email).firstName);
      setLastName(getUser(email).lastName);
      setRole(getUser(email).role);
      navigate("/users");
    } else {
      setUnderFromText("Email or password not correct");
    }
  };

  const validateUser = (email: string, password: string): boolean => {
    console.log("🚀 ~ validateUser ~ password:", password)
    const index: number = users.findIndex((element) => element.email === email);
    if (index < 0) {
      console.log(`No user with such email or password found - ${email}`);
      return false;
    }

    const decryptedPassword = password;//decipher('SECRET')(users[index].password);
    console.log("🚀 ~ validateUser ~ decryptedPassword:", decryptedPassword)

    if (decryptedPassword !== password) {
      console.log(`No user with such email or password found - ${email}`);
      return false;
    }
    console.log(`User logged successfully - ${email}`);
    return true;
  };

  const getUser = (email: string): User => {
    return users.find((user) => user.email === email) as User;
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>{t('please-login')}</h1>
      <h6>
        {t('or-tap')}{" "}
        <span>
          {" "}
          <Link to="/signup">{t('signup')}</Link>{" "}
        </span>{" "}
        {t('link')}{" "}
      </h6>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          {t('email-address')}
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="email"
          defaultValue=""
        />
        <div
          id="emailHelp"
          className={`form-text ${underFromText ? "text-danger" : ""}`}
        >
          {underFromText}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          {t('password')}
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          name="password"
          defaultValue=""
        />
      </div>
      <div
        id="passwordHelp"
        className={`form-text ${underFromText ? "text-danger" : ""}`}
      >
        {underFromText}
      </div>
      <button type="submit" className="btn btn-primary">
        {t('submit')}
      </button>
    </form>
  );
}

export default LoginPage;
