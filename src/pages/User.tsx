import UserItem from '../types/UserItem';
import ListUserComponent from '../components/ListUserComponent';
import { useState, useEffect } from 'react';

export default function User() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission success
  //const api_url = import.meta.env.VITE_API_URL;
  const api_url = 'http://localhost:5007/'

  const [user, setUser] = useState<UserItem>({
    idUser: 0,
    email: '',
    password: '',
    points: 0,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    country: '',
    isAdministrator: false,
    isArchived: false,
    orders: []
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    phone: '',
    postalCode: '',
  });

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(api_url + "api/User/GetAllUser", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('bearerToken')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      }
      const users: UserItem[] = await response.json();
      setUsers(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'points' ? parseInt(value) || 0 : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      newErrors.email = emailRegex.test(value)
        ? ''
        : 'Veuillez entrer un email valide (ex: user@domain.com).';
    }

    if (name === 'password') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      newErrors.password = passwordRegex.test(value)
        ? ''
        : 'Le mot de passe doit contenir au moins 8 caractères, incluant une lettre et un chiffre.';
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity() && !errors.email && !errors.password) {
      try {
        const response = await fetch(api_url + "api/User/CreateUser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('bearerToken')}`,
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de l'ajout de l'utilisateur: ${response.status} ${response.statusText}`);
        }
        await response.json();
        console.log('Utilisateur ajouté avec succès');

        // Réinitialiser le formulaire
        form.reset();
        setUser({
          idUser: 0,
          email: '',
          password: '',
          points: 0,
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          province: '',
          country: '',
          isAdministrator: false,
          isArchived: false,
          orders: []
        });
        setErrors({
          email: '',
          password: '',
          phone: '',
          postalCode: '',
        });

        // Indiquer que l'utilisateur a été ajouté
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 2000); // Reset after 2 seconds

        // Rafraîchir la liste des utilisateurs
        await getUsers();
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        alert(`Erreur: ${error}`);
      }
    } else {
      form.reportValidity();
    }
  };

  return (
    <div className="min-h-screen bg-red-900 text-white">
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Administration</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Bienvenue dans la section d'administration. Ajoutez un nouvel utilisateur pour gérer les accès.
        </p>
      </header>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Liste des utilisateurs</h2>
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
              Chargement des utilisateurs...
            </div>
          ) : users.length > 0 ? (
            <div className="space-y-6">
              <ListUserComponent users={users} refreshUsers={getUsers} />
            </div>
          ) : (
            <p className="text-center text-lg">
              Les informations des utilisateurs n'ont pas pu être obtenues.
            </p>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gray-100 text-gray-800 p-8 rounded-lg border-4 border-yellow-400 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Ajouter un utilisateur
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate autoComplete="off">
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
                  value={user.lastName}
                  onChange={handleChange}
                  placeholder="Ex: Doe"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="firstName"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  placeholder="Ex: John"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

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
                  value={user.email}
                  onChange={(e) => {
                    handleChange(e);
                    handleValidation(e);
                  }}
                  placeholder="Ex: john.doe@example.com"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  onInvalid={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity(
                      'Veuillez entrer un email valide (ex: user@domain.com).'
                    )
                  }
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                  autoComplete="off"
                  className={`w-full px-4 py-2 rounded-lg border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:border-yellow-400 focus:outline-none text-gray-800`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => {
                    handleChange(e);
                    handleValidation(e);
                  }}
                  placeholder="Ex: MotdePasse123"
                  pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                  onInvalid={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity(
                      'Le mot de passe doit contenir au moins 8 caractères, incluant une lettre et un chiffre.'
                    )
                  }
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                  autoComplete="new-password"
                  className={`w-full px-4 py-2 rounded-lg border-2 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:border-yellow-400 focus:outline-none text-gray-800`}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  placeholder="Ex: 123 Rue des Pompiers"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

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
                  value={user.city}
                  onChange={handleChange}
                  placeholder="Ex: Rivière-du-Loup"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="province"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Province
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={user.province}
                  onChange={handleChange}
                  placeholder="Ex: Québec"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                />
              </div>

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
                  value={user.country}
                  onChange={handleChange}
                  placeholder="Ex: Canada"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

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
                  value={user.points}
                  onChange={handleChange}
                  placeholder="Ex: 150"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="isAdministrator"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Administrateur
                </label>
                <input
                  type="checkbox"
                  id="isAdministrator"
                  name="isAdministrator"
                  checked={user.isAdministrator}
                  onChange={handleChange}
                  className="h-5 w-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                />
                <span className="ml-2 text-gray-700">
                  Cocher pour donner des droits d'administrateur
                </span>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition duration-300 ${
                    isSubmitted
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-yellow-400 text-gray-800 hover:bg-yellow-500'
                  }`}
                >
                  {isSubmitted ? 'Utilisateur ajouté !' : 'Ajouter l’utilisateur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}