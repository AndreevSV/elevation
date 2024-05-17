import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UsersPage from "./pages/UsersPage";
import EditUserPage from "./pages/EditUserPage";
import Error404Page from "./pages/Error404Page";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { useState } from "react";

function App() {
  const [searchString, setSearchString] = useState("");

  const handleSearchSubmit = (value: string) => {
    setSearchString(value);
  };

  return (
    <>
      <UserProvider>
        <NavBar onSearchSubmit={handleSearchSubmit} />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/users"
              element={<UsersPage searchString={searchString} />}
            />
            <Route path="/edit/:userId" element={<EditUserPage />} />
            <Route path="/edit" element={<EditUserPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
