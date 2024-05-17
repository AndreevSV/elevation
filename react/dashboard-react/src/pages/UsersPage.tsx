import usersData from "../mocks/jsons/users.json";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import makeUUID from "../utils/makeUUID";

interface UsersPageProps {
  searchString: string;
}

function UsersPage({ searchString }: UsersPageProps) {
  const navigate = useNavigate();
  const loggedUser = useContext(UserContext);
  const [users, setUsers] = useState(usersData);

  const filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchString.toLowerCase()) ||
      user.email.toLowerCase().includes(searchString.toLowerCase())
    );
  });

  const onEditClick = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const onDeleteClick = (id: string) => {
    const userUpdated = users.filter((user) => user.id !== id);
    setUsers(userUpdated);
  };

  const usersList = filteredUsers.map((user, index) => {
    const { id, firstName, lastName, email, role } = user;
    const key: string = makeUUID();
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
            onClick={() => onEditClick(id)}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className={`btn btn-danger ${
              loggedUser.role === "user" || user.role === "admin"
                ? " disabled"
                : ""
            }`}
            type="submit"
            onClick={() => onDeleteClick(id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>Users List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{usersList}</tbody>
      </table>
    </>
  );
}

export default UsersPage;
