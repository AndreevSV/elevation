import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import makeUUID from "../utils/makeUUID";
import {useTranslation} from 'react-i18next'

interface UsersPageProps {
  searchString: string;
}

function UsersPage({ searchString }: UsersPageProps) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const { id, role, users, setUsers } = useContext(UserContext);

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
    const { id: userId, firstName, lastName, email, role: userRole } = user;
    const key: string = makeUUID();
    return (
      <tr key={key}>
        <th scope="row">{index + 1}</th>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{userRole}</td>
        <td>
          <button
            className={`btn btn-primary ${
              role === "admin" || id === userId ? "" : " disabled"
            }`}
            type="submit"
            onClick={() => onEditClick(userId)}
          >
            {t('edit')}
          </button>
        </td>
        <td>
          <button
            className={`btn btn-danger ${
              role === "user" || userRole === "admin" ? " disabled" : ""
            }`}
            type="submit"
            onClick={() => onDeleteClick(userId)}
          >
            {t('delete')}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>{t('users-list')}</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('first-name')}</th>
            <th scope="col">{t("last-name")}</th>
            <th scope="col">{t('email')}</th>
            <th scope="col">{t('role')}</th>
            <th scope="col">{t('edit')}</th>
            <th scope="col">{t('delete')}</th>
          </tr>
        </thead>
        <tbody>{usersList}</tbody>
      </table>
    </>
  );
}

export default UsersPage;
