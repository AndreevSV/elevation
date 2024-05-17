import { Link, useMatch } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  onSearchSubmit: (value: string) => void;
}

function NavBar({ onSearchSubmit }: NavBarProps) {
  const navigate = useNavigate();
  const loggedUser = useContext(UserContext);
  console.log("🚀 ~ NavBar ~ loggedUser:", loggedUser)
  const [searchValue, setSearchValue] = useState("");

  const isHomePage = useMatch("/");
  const isUsersPage = useMatch("/users");
  const isEditPage = useMatch("/edit/:id");
  const isSignupPage = useMatch("/signup");

  const logoutHandler = () => {
    loggedUser.clearContext();
    navigate("/");
  };

  const handleSearchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchSubmit(value);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
           <ul className="navbar-nav nav-pills nav-fill me-auto mb-2 mb-lg-0"> 
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isHomePage ? " active" : ""}`}
                aria-disabled="true"
                onClick={logoutHandler}
              >
                {loggedUser.email === "" ? "Login" : "LogOut"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/users"
                className={`nav-link ${
                  isUsersPage
                    ? " active"
                    : loggedUser.email === ""
                    ? "disabled"
                    : ""
                }`}
                aria-current="page"
              >
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={loggedUser.email ? `/edit/${loggedUser.id}` : "/edit"}
                className={`nav-link ${
                  isEditPage
                    ? " active"
                    : loggedUser.email === ""
                    ? "disabled"
                    : ""
                }`}
              >
                Edit
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className={`nav-link ${
                  isSignupPage 
                  ? " active" 
                  : loggedUser.email !== ""
                  ? "disabled"
                  : ""}`}
              >
                SignUp
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 is-inactive"
              type="search"
              placeholder="Search"
              aria-label="Search"
              disabled={!useMatch("/users")}
              value={searchValue}
              onChange={handleSearchSubmit}
            />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
