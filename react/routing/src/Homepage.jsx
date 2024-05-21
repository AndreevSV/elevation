import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      {user ? (
        <>
          <h2>Hello, {user.login}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h2>You are not logged in. Please login.</h2>
      )}
    </div>
  );
}

export { HomePage };
