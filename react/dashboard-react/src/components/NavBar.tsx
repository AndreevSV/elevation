import i18n from "../i18n";
import { Link, useMatch } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

interface NavBarProps {
  onSearchSubmit: (value: string) => void;
}

const DropDownLanguageMenu = () => {
  const { t } = useTranslation();
  const onMenuItemClick = (value: string): void => {
    switch (value) {
      case "en":
        i18n.changeLanguage("en");
        break;
      case "de":
        i18n.changeLanguage("de");
        break;
    }
  };

  return (
    <div className="dropdown-menu show">
      <a
        className="dropdown-item"
        onClick={() => {
          console.log("English");
          onMenuItemClick("en");
        }}
        style={{ cursor: "pointer" }}
      >
        {t("english")}
      </a>
      <a
        className="dropdown-item"
        onClick={() => {
          console.log("German");
          onMenuItemClick("de");
        }}
        style={{ cursor: "pointer" }}
      >
        {t("german")}
      </a>
    </div>
  );
};

function NavBar({ onSearchSubmit }: NavBarProps) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { id, email, firstName, lastName, role, clearUserContext } =
    useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");

  const isHomePage = useMatch("/");
  const isUsersPage = useMatch("/users");
  const isEditPage = useMatch("/edit/:id");
  const isSignupPage = useMatch("/signup");

  const [isHovered, setIsHovered] = useState(false);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const langIcon = <FontAwesomeIcon icon={faGlobe} />;

  const onGlobeClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

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
            <li
              className={`nav-item dropdown me-1 ${
                isDropDownOpen ? "show" : ""
              }`}
              onMouseLeave={() => setIsDropDownOpen(false)}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={onGlobeClick}
                style={{ cursor: "pointer" }}
              >
                {langIcon}
              </a>
              {isDropDownOpen && <DropDownLanguageMenu />}
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isHomePage ? " active" : ""}`}
                aria-disabled="true"
              >
                {email === "" ? t("login") : ""}
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
                {t("users")}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={email ? `/edit/${id}` : "/edit"}
                className={`nav-link ${
                  isEditPage ? " active" : email === "" ? "disabled" : ""
                }`}
              >
                {t("edit")}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className={`nav-link ${
                  isSignupPage ? " active" : email !== "" ? "disabled" : ""
                }`}
              >
                {t("signup")}
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
                  ? t("click-here-to-logout")
                  : `${t("welcome")}, ${role} ${firstName} ${lastName}!`
                : ""
            }`}
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 is-inactive"
              type="search"
              placeholder={t("search")}
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
