import { Link, useMatch } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  onSearchSubmit: (value: string) => void;
}

function NavBar({ onSearchSubmit }: NavBarProps) {
  const navigate = useNavigate();
  const { id, email, firstName, lastName, role, clearUserContext } =
    useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");

  const isHomePage = useMatch("/");
  const isUsersPage = useMatch("/users");
  const isEditPage = useMatch("/edit/:id");
  const isSignupPage = useMatch("/signup");

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const logoutHandler = () => {
    clearUserContext();
    navigate("/");
  };

  const handleSearchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchSubmit(value);
  };

  return (
    <nav className="navbar navbar-expand bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav nav-pills nav-fill me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isHomePage ? " active" : ""}`}
                aria-disabled="true"
              >
                {email === "" ? "Login" : ""}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/users"
                className={`nav-link ${
                  isUsersPage ? " active" : email === "" ? "disabled" : ""
                }`}
                aria-current="page"
              >
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={email ? `/edit/${id}` : "/edit"}
                className={`nav-link ${
                  isEditPage ? " active" : email === "" ? "disabled" : ""
                }`}
              >
                Edit
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className={`nav-link ${
                  isSignupPage ? " active" : email !== "" ? "disabled" : ""
                }`}
              >
                SignUp
              </Link>
            </li>
          </ul>

          <div
            className={`navbar-item me-2 active ${
              isHovered ? "text-danger" : " text-primary"
            } `}
            onClick={logoutHandler}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isHovered ? "pointer" : "default" }}
          >
            {`${
              id !== ""
                ? isHovered
                  ? "Click here to Logout"
                  : `Welcome, ${role} ${firstName} ${lastName}!`
                : ""
            }`}
          </div>
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
