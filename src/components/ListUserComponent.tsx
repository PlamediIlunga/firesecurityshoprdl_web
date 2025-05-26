
import { Link } from "react-router-dom";
import UserItem from "../types/UserItem";

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

      if (!response.ok) {
        throw new Error(`Erreur d'archivage: ${response.status} ${response.statusText}`);
      }

      console.log(`Utilisateur ${idUser} archivé avec succès`);
      await refreshUsers(); // Rafraîchir la liste
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
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border-4 border-yellow-400">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Nom
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Prénom
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Email
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Adresse
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Pays
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Points
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.idUser}
                className="bg-gray-100 text-gray-800 border-t-2 border-yellow-400 transition duration-300 hover:bg-blue-900 hover:text-white"
              >
                <td className="px-4 py-3 border-r border-yellow-400 text-lg font-medium">
                  {user.lastName}
                </td>
                <td className="px-4 py-3 border-r border-yellow-400 text-lg font-medium">
                  {user.firstName}
                </td>
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {user.email}
                </td>
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {user.address}, {user.city}, {user.country}
                </td>
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {user.country}
                </td>
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {user.points}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4">
                    <Link
                      to={`/edit-user/${user.idUser}`}
                      className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
                    >
                      Modifier
                    </Link>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-800 transition duration-300"
                      onClick={() => handleDeleteClick(user.idUser)}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-4 py-3 text-center text-lg text-gray-500">
                Aucun utilisateur à afficher pour le moment.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
