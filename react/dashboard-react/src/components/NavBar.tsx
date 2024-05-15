import { Link, useMatch } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
    onSearchSubmit: (value: string) => void;
  }

function NavBar({onSearchSubmit}: NavBarProps ) {
  const navigate = useNavigate();
  const loggedUser = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");

  const logoutHandler = () => {
    loggedUser.clearContext();
    navigate("/");
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit(searchValue);
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${useMatch("/") ? " active" : ""}`}
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
                  useMatch("/users")
                    ? " active"
                    : loggedUser.email === "" || loggedUser.role === "user"
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
                to="/edit"
                className={`nav-link ${
                  useMatch("/edit")
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
                className={`nav-link ${useMatch("/signup") ? " active" : ""}`}
              >
                SignUp
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2 is-inactive"
              type="search"
              placeholder="Search"
              aria-label="Search"
              disabled={!useMatch("/users")}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className={`btn btn-outline-success ${
                useMatch("/users") ? "" : " disabled"
              }`}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
