import "./App.css";
import { LoginPage } from "./LoginPage";
import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./Homepage";
import { NotFoundPage } from "./Notfoundpage";

function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </header>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
