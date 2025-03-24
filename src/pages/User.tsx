import UserItem from '../types/UserItem';
import ListUserComponent from '../components/ListUserComponent';
import { useState, useEffect } from 'react';
import casePostalBD from '../datas/casePostaleBD_Mock.json';

export default function User() {
    const [users, setUsers] = useState<UserItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsLoading(true);
                /*const response = await fetch(api_url + "api/User/GetAllUser");
                if (!response.ok) {
                  throw new Error("Erreur lors de la récupération des utilisateurs");
                }
                const users: UserItem[] = await response.json();
                setUsers(users);*/

                setUsers(casePostalBD.ListeUser.map(user => ({
                    idUser: user.idUser,
                    lastName: user.lastName,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    adresse: user.adresse,
                    postalCode: user.postalCode,
                    city: user.city,
                    country: user.country,
                    password: user.password, // Non affiché, mais inclus pour respecter le type
                    points: user.points,
                })));
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
                setUsers([]); // S'assurer que users est vide en cas d'erreur
            } finally {
                setIsLoading(false);
            }
        };
        getUsers();
    }, []);

    return (
        <div className="min-h-screen bg-red-900 text-white">
            {/* En-tête de la page */}
            <header className="py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Administration
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                    Bienvenue dans la section d'administration. Ajoutez un nouvel utilisateur pour gérer les accès.
                </p>
            </header>

            {/* Section de la liste des utilisateurs */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Liste des utilisateurs
                    </h2>
                    {isLoading ? (
                        <div className="text-center text-lg flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3 text-yellow-400" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Chargement des utilisateurs...
                        </div>
                    ) : users.length > 0 ? (
                        <div className="space-y-6">
                            <ListUserComponent users={users} />
                        </div>
                    ) : (
                        <p className="text-center text-lg">
                            Les informations des utilisateurs n'ont pas pu être obtenues.
                        </p>
                    )}
                </div>
            </section>

            {/* Section du formulaire */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-gray-100 text-gray-800 p-8 rounded-lg border-4 border-yellow-400 shadow-2xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                            Ajouter un utilisateur
                        </h2>
                        <form className="space-y-6">
                            {/* Champ : Nom de famille */}
                            <div>
                                <label htmlFor="lastName" className="block text-lg font-semibold text-gray-700 mb-2">
                                    Nom de famille
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Ex: Doe"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                                    required
                                />
                            </div>

                            {/* Champ : Prénom */}
                            <div>
                                <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Ex: John"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                                    required
                                />
                            </div>

                            {/* Champ : Email */}
                            <div>
                                <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Ex: john.doe@example.com"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                                    required
                                />
                            </div>

                            {/* Champ : Téléphone */}
                            <div>
                                <label htmlFor="phone" className="block text-lg font-semibold text-gray-700 mb-2">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Ex: 418-555-1234"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                                    required
                                />
                            </div>

                            {/* Champ : Adresse */}
                            <div>
                                <label htmlFor="adresse" className="block text-lg font-semibold text-gray-700 mb-2">
                                    Adresse
                                </label>
                                <input
                                    type="text"
                                    id="adresse"
                                    name="adresse"
                                    placeholder="Ex: 123 Rue des Pompiers"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                                    required
                                />
                            </div>

                            {/* Champ : Code postal */}
                            <div>
                                <label htmlFor="postalCode" className="block text-lg font-semibold text-gray-700 mb-2">
                                    Code postal
                                </label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    placeholder="Ex: G5R 0A1"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                                    required
                                />
                            </div>

                            {/* Champ : Ville */}
                            <div>
                                <label htmlFor="city" className="block text-lg font-semibold text-gray-700 mb-2">
                                    Ville
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Ex: Rivière-du-Loup"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                                    required
                                />
                            </div>

                            {/* Champ : Pays */}
                            <div>
                                <label htmlFor="country" className="block text-lg font-semibold text-gray-700 mb-2">
                                    Pays
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    placeholder="Ex: Canada"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                                    required
                                />
                            </div>

                            {/* Champ : Points */}
                            <div>
                                <label htmlFor="points" className="block text-lg font-semibold text-gray-700 mb-2">
                                    Points
                                </label>
                                <input
                                    type="number"
                                    id="points"
                                    name="points"
                                    placeholder="Ex: 150"
                                    min="0"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                                    required
                                />
                            </div>

                            {/* Bouton Ajouter */}
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-lg font-semibold text-lg transition duration-300 bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                                >
                                    Ajouter l'utilisateur
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}