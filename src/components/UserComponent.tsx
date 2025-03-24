import { RiAccountCircleFill } from "react-icons/ri";
import UserItem from "../types/UserItem";

export default function UserProfileComponent({ user }: { user: UserItem }) {
  return (
    <div className="space-y-8">
      {/* Icône et nom */}
      <div className="flex flex-col items-center space-y-4">
        <RiAccountCircleFill className="text-9xl text-yellow-400" /> {/* Icône agrandie */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {user.lastName} {user.name}
          </h2>
          <p className="text-gray-600">Membre du Service Incendie</p>
        </div>
      </div>

      {/* Informations personnelles (centrées) */}
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1 mx-auto max-w-md">
          Informations Personnelles
        </h3>
        <p className="text-gray-800">
          <span className="font-medium">Adresse :</span> {user.adresse}, {user.city}, {user.postalCode}, {user.country}
        </p>
      </div>

      {/* Informations de contact (centrées) */}
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1 mx-auto max-w-md">
          Contact
        </h3>
        <p className="text-gray-800">
          <span className="font-medium">Email :</span> {user.email}
        </p>
        <p className="text-gray-800">
          <span className="font-medium">Téléphone :</span> {user.phone}
        </p>
      </div>

      {/* Points (centrés) */}
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1 mx-auto max-w-md">
          Points
        </h3>
        <p className="text-2xl font-bold text-yellow-600">{user.points}</p>
      </div>
    </div>
  );
}