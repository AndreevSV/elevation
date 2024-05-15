import users from "../mocks/jsons/users.json";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../components/UserContext";
import { useContext } from "react";

interface UsersPageProps {
  searchString: string;
}

function UsersPage({searchString}: UsersPageProps) {
  const loggedUser = useContext(UserContext);

  const filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchString.toLowerCase()) ||
      user.email.toLowerCase().includes(searchString.toLowerCase())
    );
  });

  const usersList = filteredUsers.map((user, index) => {
    const { firstName, lastName, email, role } = user;
    const key: string = uuidv4();
    return (
      <tr key={key}>
        <th scope="row">{index + 1}</th>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{role}</td>
        <td>
          <button
            className={`btn btn-primary ${
              loggedUser.role === "admin" ? "" : " disabled"
            }`}
            type="submit"
          >
            Edit
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>{usersList}</tbody>
    </table>
  );
}

export default UsersPage;
