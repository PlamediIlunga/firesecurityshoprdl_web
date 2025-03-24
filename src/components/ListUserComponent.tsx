import { Link } from "react-router-dom";
import UserItem from "../types/UserItem";

export default function ListUserComponent({ users }: { users: UserItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border-4 border-yellow-400">
        {/* En-tête du tableau */}
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
              Téléphone
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Adresse
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Points
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        {/* Corps du tableau */}
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.idUser}
                className="bg-gray-100 text-gray-800 border-t-2 border-yellow-400 transition duration-300 hover:bg-blue-900 hover:text-white"
              >
                {/* Colonne Nom */}
                <td className="px-4 py-3 border-r border-yellow-400 text-lg font-medium">
                  {user.lastName}
                </td>

                {/* Colonne Prénom */}
                <td className="px-4 py-3 border-r border-yellow-400 text-lg font-medium">
                  {user.name}
                </td>

                {/* Colonne Email */}
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {user.email}
                </td>

                {/* Colonne Téléphone */}
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {user.phone}
                </td>

                {/* Colonne Adresse */}
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {user.adresse}, {user.postalCode}, {user.city}, {user.country}
                </td>

                {/* Colonne Points */}
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {user.points}
                </td>

                {/* Colonne Actions */}
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