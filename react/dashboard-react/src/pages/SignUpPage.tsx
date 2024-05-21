import { UserContext } from "../contexts/UserContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User, Role } from "../types/user";
import makeUUID from "../utils/makeUUID";
import { encryptStr } from "../utils/encryptStr";
import { useTranslation } from "react-i18next";

function SignUpPage() {
  const { t } = useTranslation();

  const {
    setId,
    setEmail: setEmailContext,
    setFirstName: setFirstNameContext,
    setLastName: setLastNameContext,
    setRole,
    users,
    setUsers,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(-1); // -1 - not valid, 0 - email already exist, 1 - email is Ok
  const [symbolsNum, setSymbolsNum] = useState(8);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      firstName.length >= 2 &&
      lastName.length >= 2 &&
      password.length >= 8 &&
      password2 === password &&
      isEmailValid === 1
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [firstName, lastName, password, password2, isEmailValid]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password2 = formData.get("password2") as string;
    const id = makeUUID();

    const password = encryptStr(password2);
    const user: User = {
      id,
      firstName,
      lastName,
      email,
      password,
      role: Role.user,
    };
    

    const updatedUsers = [...users, user];

    setUsers(updatedUsers);
    setId(id);
    setEmailContext(email);
    setFirstNameContext(firstName);
    setLastNameContext(lastName);
    setRole(Role.user);
    console.log("🚀 ~ onSubmit ~ user:", user)
    navigate("/users");
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onInputEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const str: string = e.target.value;
    const index: number = users.findIndex(
      (element) => element.email === str.trim()
    );
    if (index >= 0) {
      // -1 - not valid, 0 - email already exist, 1 - email is Ok
      setIsEmailValid(0);
    } else if (validateEmail(str.trim()) !== null) {
      setEmail(str.trim());
      setIsEmailValid(1);
    } else {
      setIsEmailValid(-1);
    }
  };

  const onInputCheck = (e: React.ChangeEvent<HTMLInputElement>): number => {
    const str: string = e.target.value.trim();
    const fieldName: string = e.target.name;

    switch (fieldName) {
      case "firstName":
        setFirstName(str.length >= 2 ? str : "");
        break;
      case "lastName":
        setLastName(str.length >= 2 ? str : "");
        break;
      case "password":
        if (str.length >= 8) {
          setPassword(str);
          setSymbolsNum(0);
        } else {
          setPassword("");
          setSymbolsNum(8 - str.length);
        }
        break;
      case "password2":
        setPassword2(str === password ? str : "");
        break;
    }
    return symbolsNum;
  };

  return (
    <form className="row g-3" onSubmit={onSubmit}>
      <h1>{t("signup")}</h1>
      <div className="col-md-4">
        <label htmlFor="validationServer01" className="form-label">
          {t("first-name")}
        </label>
        <input
          type="text"
          className={`form-control ${
            firstName.length >= 2 ? "is-valid" : "is-invalid"
          }`}
          id="validationServer01"
          name="firstName"
          placeholder="First name"
          defaultValue=""
          required
          onChange={onInputCheck}
        />
        {firstName.length >= 2 ? (
          <div className="valid-feedback">{t("looks-good")}</div>
        ) : (
          <div className="invalid-feedback">{t("please-type-first-name")}</div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="validationServer02" className="form-label">
          {t("last-name")}
        </label>
        <input
          type="text"
          className={`form-control ${
            lastName.length >= 2 ? "is-valid" : "is-invalid"
          }`}
          id="validationServer02"
          name="lastName"
          placeholder="Last name"
          defaultValue=""
          required
          onChange={onInputCheck}
        />
        {lastName.length >= 2 ? (
          <div className="valid-feedback">{t("looks-good")}</div>
        ) : (
          <div className="invalid-feedback">{t("please-type-a-last-name")}</div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="validationServerUsername" className="form-label">
          {t("email")}
        </label>
        <div className="input-group has-validation">
          <span className="input-group-text" id="inputGroupPrepend3">
            @
          </span>
          <input
            type="text"
            className={`form-control ${
              isEmailValid === 1 ? "is-valid" : "is-invalid"
            }`}
            id="validationServerUsername"
            name="email"
            placeholder="email"
            aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
            required
            defaultValue={email}
            onChange={onInputEmail}
          />

          {isEmailValid === 1 ? (
            <div className="valid-feedback">{t("looks-good")}</div>
          ) : isEmailValid === -1 ? (
            <div className="invalid-feedback">{t("please-type-an-email")}</div>
          ) : (
            <div className="invalid-feedback">
              {t("such-email-already-exist")}
            </div>
          )}
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="validationServer03" className="form-label">
          {t("password")}
        </label>
        <input
          type="password"
          className={`form-control ${
            password.length >= 8 ? "is-valid" : "is-invalid"
          }`}
          id="validationServer03"
          name="password"
          placeholder="password"
          defaultValue=""
          required
          onChange={onInputCheck}
        />
        {password.length >= 8 ? (
          <div className="valid-feedback">{t("looks-good")}</div>
        ) : (
          <div className="invalid-feedback">
            {t("please-type")} {symbolsNum} {t("symbols")}
          </div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="validationServer04" className="form-label">
          {t("repeat-the-password")}
        </label>
        <input
          type="password"
          className={`form-control ${
            password.length >= 8 &&
            password2.length >= 8 &&
            password2 === password
              ? "is-valid"
              : "is-invalid"
          }`}
          id="validationServer04"
          name="password2"
          placeholder="password"
          defaultValue=""
          required
          onChange={onInputCheck}
        />
        {password.length >= 8 &&
        password2.length >= 8 &&
        password2 === password ? (
          <div className="valid-feedback">{t("looks-good")}</div>
        ) : (
          <div className="invalid-feedback">{t("passwords-not-equal")}</div>
        )}
      </div>
      <div className="col-12">
        <button
          className={`btn btn-primary ${isButtonDisabled ? " disabled" : ""}`}
          type="submit"
        >
          {t("submit")}
        </button>
      </div>
    </form>
  );
}

export default SignUpPage;
