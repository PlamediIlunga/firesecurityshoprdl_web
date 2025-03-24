import UserItem from '../types/UserItem';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import casePostalBD from '../datas/casePostaleBD_Mock.json';

export default function EditUser() {
  const [user, setUser] = useState<UserItem | null>(null);
  const [formData, setFormData] = useState<Partial<UserItem>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { idUser } = useParams<{ idUser?: string }>();

  // Charger l'utilisateur au montage
  useEffect(() => {
    const getUserById = async () => {
      if (idUser) {
        try {
          setIsLoading(true);
          /*const response = await fetch(api_url + "api/User/GetAllUser");
                if (!response.ok) {
                  throw new Error("Erreur lors de la récupération des utilisateurs");
                }
                const users: UserItem[] = await response.json();
                setUsers(users);*/
          // Simulation avec les données mockées
          const foundUser = casePostalBD.ListeUser.find(
            (user) => user.idUser === parseInt(idUser, 10)
          );
          if (foundUser) {
            setUser(foundUser);
            // Initialiser formData avec les valeurs de l'utilisateur
            setFormData(foundUser);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getUserById();
  }, [idUser]);

  // Gestionnaire pour les champs texte et textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Utilisateur modifié :", formData);
    // Ici, tu peux envoyer formData à ton API pour mettre à jour l'utilisateur
    // Exemple : fetch(`${api_url}api/User/UpdateUser`, { method: 'PUT', body: JSON.stringify(formData) })
  };

  return (
    <div className="min-h-screen bg-red-900 text-white">
      {/* En-tête de la page */}
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Administration</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Bienvenue dans la section de modification d'un utilisateur, vous pouvez
          modifier les informations de l'utilisateur.
        </p>
      </header>

      {/* Section du formulaire */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          {isLoading ? (
            <div className="text-center text-lg flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-yellow-400"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Chargement de l'utilisateur...
            </div>
          ) : user ? (
            <div className="bg-gray-100 text-gray-800 p-8 rounded-lg border-4 border-yellow-400 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Modifier : {formData.lastName} {formData.name}
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Champ : Nom de famille */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Nom de famille
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                    placeholder="Ex: Tremblay"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

                {/* Champ : Prénom */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="Ex: Marc"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

                {/* Champ : Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="Ex: marc.tremblay@serviceincendie-rdl.ca"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

                {/* Champ : Téléphone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="Ex: 418-555-0101"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

                {/* Champ : Adresse */}
                <div>
                  <label
                    htmlFor="adresse"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    value={formData.adresse || ""}
                    onChange={handleChange}
                    placeholder="Ex: 45 Rue des Pompiers"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

                {/* Champ : Code postal */}
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Code postal
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode || ""}
                    onChange={handleChange}
                    placeholder="Ex: G5R 2T3"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

                {/* Champ : Ville */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Ville
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                    placeholder="Ex: Rivière-du-Loup"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

                {/* Champ : Pays */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Pays
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                    placeholder="Ex: Canada"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

                {/* Champ : Points */}
                <div>
                  <label
                    htmlFor="points"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Points
                  </label>
                  <input
                    type="number"
                    id="points"
                    name="points"
                    value={formData.points || 0}
                    onChange={handleChange}
                    placeholder="Ex: 300"
                    min="0"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

                {/* Bouton Modifier */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg font-semibold text-lg transition duration-300 bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                  >
                    Modifier l'utilisateur
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p className="text-center text-lg">
              Les informations de l'utilisateur n'ont pas pu être obtenues.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}