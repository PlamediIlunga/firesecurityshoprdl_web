import { Link } from "react-router-dom";
import UserItem from "../types/UserItem";
import '../styles/listUserComponent.scss';

interface ListUserComponentProps {
  users: UserItem[];
  refreshUsers: () => Promise<void>;
}

export default function ListUserComponent({ users, refreshUsers }: ListUserComponentProps) {
  const api_url = import.meta.env.VITE_API_URL;

  const deleteUser = async (idUser: number) => {
    try {
      const response = await fetch(`${api_url}/api/User/ArchiveUser/?id=${idUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
        },
      });
      if (!response.ok) throw new Error(`Erreur d'archivage: ${response.status} ${response.statusText}`);
      console.log(`Utilisateur ${idUser} archivé avec succès`);
      await refreshUsers();
    } catch (error) {
      console.error("Erreur lors de l'archivage de l'utilisateur:", error);
      alert(`Erreur: ${error}`);
    }
  };

  const handleDeleteClick = (idUser: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir archiver cet utilisateur ?")) {
      deleteUser(idUser);
    }
  };

  return (
    <div className="list-table-wrap">
      <table className="list-table">

        <thead className="list-table__head">
          <tr>
            <th className="list-table__th">Nom</th>
            <th className="list-table__th">Prénom</th>
            <th className="list-table__th">Email</th>
            <th className="list-table__th">Adresse</th>
            <th className="list-table__th">Pays</th>
            <th className="list-table__th list-table__th--center">Points</th>
            <th className="list-table__th list-table__th--center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.idUser} className={`list-table__row ${index % 2 === 0 ? 'list-table__row--even' : ''}`}>
                <td className="list-table__td list-table__td--name">{user.lastName}</td>
                <td className="list-table__td list-table__td--name">{user.firstName}</td>
                <td className="list-table__td list-table__td--muted">{user.email}</td>
                <td className="list-table__td list-table__td--muted">{user.address}, {user.city}</td>
                <td className="list-table__td list-table__td--muted">{user.country}</td>
                <td className="list-table__td list-table__td--center">
                  <span className="list-table__badge">{user.points} pts</span>
                </td>
                <td className="list-table__td list-table__td--center">
                  <div className="list-table__actions">
                    <Link to={`/edit-user/${user.idUser}`} className="list-table__btn list-table__btn--edit">
                      Modifier
                    </Link>
                    <button className="list-table__btn list-table__btn--delete"
                      onClick={() => handleDeleteClick(user.idUser)}>
                      Archiver
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="list-table__empty">Aucun utilisateur à afficher pour le moment.</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}
