import { useAuth } from "./AuthContext";

function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <h1>Hello, {user?.login}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export { HomePage };
