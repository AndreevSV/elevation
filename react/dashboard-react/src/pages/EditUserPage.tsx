import usersData from "../mocks/jsons/users.json";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Role } from "../types/user";
import { decipher, encryptStr } from "../utils/encryptStr";
import { UserContext } from "../contexts/UserContext";
// import ModalWindow from "../components/ModalWindow";

function EditUserPage() {
  const userContext = useContext(UserContext);
  const { id } = userContext;
  console.log("🚀 ~ EditUserPage ~ id:", id);

  const { userId } = useParams<{ userId: string }>();
  console.log("🚀 ~ EditUserPage ~ userId:", userId);

  const [users, setUsers] = useState(usersData);
  const user = users.find((user) => user.id === userId);

  const navigate = useNavigate();

  const encodedPassword = user?.password;
  const decodedPassword = decipher("SECRET")(encodedPassword as string);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(decodedPassword);
  const [password2, setPassword2] = useState(decodedPassword);
  const [symbolsNum, setSymbolsNum] = useState(8);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [feedbackEmail, setFeedbackEmail] = useState("Looks good!");
  const [validFeedback, setValidFeedback] = useState("valid-feedback");
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (
      firstName.length >= 2 &&
      lastName.length >= 2 &&
      password.length >= 8 &&
      feedbackEmail === "Looks good!" &&
      password2 === password
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
    const id = userId!;

    const password = encryptStr(password2);

    const updatedUser: User = {
      id,
      firstName,
      lastName,
      email,
      password,
      role: Role.user,
    };
    const usersUpdated = users.map((user) => user.id === id ? updatedUser: user);
    setUsers(usersUpdated);
    navigate("/users");
  };

  const onDeleteClick = (userId: string) => {
    const usersUpdated = users.filter((user) => user.id !== userId);
    setUsers(usersUpdated);
    if (userId === id) {
      userContext.clearContext();
      navigate("/");
    } else {
      navigate("/users");
    }
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
    if (index >= 0 && users[index].id !== userId) {
      setFeedbackEmail("Such email already exist");
      setValidFeedback("invalid-feedback");
    } else if (validateEmail(str.trim()) !== null) {
      setEmail(str.trim());
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
    <>
      <form className="row g-3" onSubmit={onSubmit}>
        <h1>Edit User</h1>
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
            placeholder="firstName"
            value={firstName}
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
            placeholder="lastName"
            defaultValue={lastName}
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
              defaultValue={email}
              required
              onChange={onInputEmail}
            />
            <div
              id="validationServerUsernameFeedback"
              className={validFeedback}
            >
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
            defaultValue={password}
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
            defaultValue={password2}
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
        <div className="col-md-4">
          <label htmlFor="validationServer04" className="form-label">
            Role
          </label>
          <select
            className="form-control is-valid"
            id="validationServer05"
            name="Role"
            value={user?.role}
            required
            disabled={
              user?.role !== Role.admin ||
              (user?.role === Role.admin && user?.id === id)
            }
          >
            <option value={Role.user}>User</option>
            <option value={Role.admin}>Admin</option>
          </select>
          {user?.role === Role.admin ? (
            <div className="valid-feedback">You can choose a Role</div>
          ) : (
            <div className="valid-feedback">You role is User</div>
          )}
        </div>
        <div className="d-flex justify-content-center col-12 mb-2">
          <button
            className={`btn btn-primary mb-2 mx-2`}
            disabled={isButtonDisabled}
            type="submit"
          >
            Submit
          </button>
          <button
            className={`btn btn-danger mb-2 mx-2`}
            disabled={
              isButtonDisabled || (id === userId && user?.role === Role.admin)
            }
            type="button"
            // onClick={() => setIsModalOpen(true)}
            onClick={() => userId && onDeleteClick(userId)}
          >
            Delete
          </button>
        </div>
      </form>
      {/* <ModalWindow
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={() => onDeleteClick(userId!)}
      /> */}
    </>
  );
}

export default EditUserPage;
