import { UserContext } from "../contexts/UserContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User, Role } from "../types/user";
import makeUUID from "../utils/makeUUID";
import { encryptStr } from "../utils/encryptStr";

function SignUpPage() {
  const {
    setId,
    setEmail,
    setFirstName: setFirstNameContext,
    setLastName: setLastNameContext,
    setRole,
    users,
    setUsers,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [symbolsNum, setSymbolsNum] = useState(8);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [feedbackEmail, setFeedbackEmail] = useState("Please type an email.");
  const [validFeedback, setValidFeedback] = useState("invalid-feedback");

  useEffect(() => {
    if (
      firstName.length >= 2 &&
      lastName.length >= 2 &&
      password.length >= 8 &&
      password2 === password &&
      feedbackEmail === "Looks good!"
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [firstName, lastName, password, password2, feedbackEmail]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password2 = formData.get("password2") as string;
    console.log("🚀 ~ onSubmit ~ password2:", password2)
    const id = makeUUID();

    const password = encryptStr(password2);
    console.log("🚀 ~ onSubmit ~ password:", password)

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
    setEmail(email);
    setFirstNameContext(firstName);
    setLastNameContext(lastName);
    setRole(Role.user);
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
      setFeedbackEmail("Such email already exist");
      setValidFeedback("invalid-feedback");
    } else if (validateEmail(str) !== null) {
      setFeedbackEmail("Looks good!");
      setValidFeedback("valid-feedback");
    } else {
      setFeedbackEmail("Invalid email");
      setValidFeedback("invalid-feedback");
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
      <h1>SignUp</h1>
      <div className="col-md-4">
        <label htmlFor="validationServer01" className="form-label">
          First name
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
          <div className="valid-feedback">Looks good!</div>
        ) : (
          <div className="invalid-feedback">Please type first name</div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="validationServer02" className="form-label">
          Last name
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
          <div className="valid-feedback">Looks good!</div>
        ) : (
          <div className="invalid-feedback">Please type a last name</div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="validationServerUsername" className="form-label">
          Email
        </label>
        <div className="input-group has-validation">
          <span className="input-group-text" id="inputGroupPrepend3">
            @
          </span>
          <input
            type="text"
            className={`form-control ${
              validFeedback === "valid-feedback" ? "is-valid" : "is-invalid"
            }`}
            id="validationServerUsername"
            name="email"
            placeholder="email"
            aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
            required
            onChange={onInputEmail}
          />
          <div id="validationServerUsernameFeedback" className={validFeedback}>
            {feedbackEmail}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="validationServer03" className="form-label">
          Password
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
          <div className="valid-feedback">Looks good!</div>
        ) : (
          <div className="invalid-feedback">
            Please type {symbolsNum} symbols
          </div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="validationServer04" className="form-label">
          Duplicate password
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
          <div className="valid-feedback">Looks good!</div>
        ) : (
          <div className="invalid-feedback">Passwords not equal</div>
        )}
      </div>
      <div className="col-12">
        <button
          className={`btn btn-primary ${isButtonDisabled ? " disabled" : ""}`}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default SignUpPage;
