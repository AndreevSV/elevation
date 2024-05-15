import { useContext, /*useEffect,*/ useState } from "react";
import users from "../mocks/jsons/users.json";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { Role } from "./CreateUserPage";

function LoginPage() {
  const [underFromText, setUnderFromText] = useState<string>("");
  
  const navigate = useNavigate();
  const { setEmail, setRole } = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    email = email.trim();
    password = password.trim();
    if (validateUser(email, password)) {
      setEmail(email);
      setRole(getUserRole(email));
      navigate('/users')
    } else {
        setUnderFromText("Email or password not correct");
    }
  };

  const validateUser = ( email: string, password: string): boolean => {
    const index: number = users.findIndex((element) => element.email === email);
    if (index < 0) {
      console.log(`No user with such email or password found - ${email}`);
      return false;
    }
    if (users[index].password !== password) {
      console.log(`No user with such email or password found - ${email}`);
      return false;
    }
    console.log(`User logged successfully - ${email}`);
    return true;
  };

const getUserRole = (email: string): Role => {
    const user = users.find(user => user.email === email);
    return user ? user.role as Role : Role.user;
};

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Please, login</h1>
      <h6>
        or tap{" "}
        <span>
          {" "}
          <Link to="/signup">SignUp</Link>{" "}
        </span>{" "}
        link{" "}
      </h6>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
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
          Password
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
        Submit
      </button>
    </form>
  );
}

export default LoginPage;
