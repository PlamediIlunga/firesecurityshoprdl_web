import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Ajout de useParams et Link
import UserItem from '../types/UserItem';
//import casePostalBD from '../datas/casePostaleBD_Mock.json';
import UserComponent from '../components/UserComponent';

export default function Profil() {
    const [user, setUser] = useState<UserItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { idUser } = useParams<{ idUser?: string }>(); 
    const api_url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getUserById = async () => {

            const token = localStorage.getItem('bearerToken');
            if (idUser) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`${api_url}api/User/GetUserById/${idUser}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${token}`,
                        },
                    });
                    console.log(response);
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération de l'utilisateur");
                    }
                    const user: UserItem = await response.json();
                    setUser(user);
                    console.log(idUser);

                    // Simulation avec les données mockées
                    /*const foundUser = casePostalBD.ListeUser.find(
                        (user) => user.idUser === parseInt(idCurrentUser, 10)
                    );
                    if (foundUser) {
                        setUser({
                            idUser: foundUser.idUser,
                            lastName: foundUser.lastName,
                            name: foundUser.name,
                            email: foundUser.email,
                            phone: foundUser.phone,
                            adresse: foundUser.adresse,
                            postalCode: foundUser.postalCode,
                            city: foundUser.city,
                            country: foundUser.country,
                            password: foundUser.password, 
                            points: foundUser.points,
                        });
                    } else {
                        setUser(null);
                    }*/
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

    return (
        <div className="min-h-screen bg-red-800 text-white flex flex-col">
            {/* En-tête de la page */}
            <header className="py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Mon Profil</h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                    Consultez et gérez vos informations personnelles et vos points.
                </p>
            </header>

            {/* Section principale */}
            <main className="flex-grow">
                <section className="py-12">
                    <div className="max-w-4xl mx-auto px-4">
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
                                Chargement du profil...
                            </div>
                        ) : user ? (
                            <div className="bg-gray-100 text-gray-800 p-8 rounded-lg border-4 border-yellow-400 shadow-2xl">
                                {/* Informations personnelles */}
                                <UserComponent user={user} />

                                {/* Bouton Modifier , Ne fais pas parti de fonctionnalités réquises mais je l'ai ajouté quand même.Il ne regirige nulle part pour l'instant*/}
                                <div className="mt-8 text-center">
                                    <Link
                                        to={`#`}
                                        className="inline-block bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300"
                                    >
                                        Modifier le Profil
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-lg">
                                Les informations de l'utilisateur n'ont pas pu être obtenues.
                            </p>
                        )}
                    </div>
                </section>

                {/* Section Historique des Commandes */}
                <section className="py-12 bg-red-700">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-semibold text-center mb-8">
                            Historique des Commandes
                        </h2>
                        <div className="bg-gray-100 text-gray-800 p-6 rounded-lg border-4 border-yellow-400 shadow-lg">
                            <p className="text-center text-lg text-gray-600">
                                Aucune commande récente. Consultez le catalogue pour échanger vos points !
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}