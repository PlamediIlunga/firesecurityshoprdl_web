import UserItem from '../types/UserItem';
import ListUserComponent from '../components/ListUserComponent';
import { useState, useEffect } from 'react';
import casePostalBD from '../datas/casePostaleBD_Mock.json';

export default function User() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    lastName: '',
    name: '',
    email: '',
    phone: '',
    adresse: '',
    postalCode: '',
    city: '',
    country: '',
    points: 0,
  });
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    postalCode: '',
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        setUsers(
          casePostalBD.ListeUser.map((user) => ({
            idUser: user.idUser,
            lastName: user.lastName,
            name: user.name,
            email: user.email,
            phone: user.phone,
            adresse: user.adresse,
            postalCode: user.postalCode,
            city: user.city,
            country: user.country,
            password: user.password,
            points: user.points,
          }))
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  // Gestionnaire pour les champs texte et textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) || 0 : value,
    }));

    // Réinitialiser l'erreur pour ce champ lorsqu'il est modifié
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  // Gestionnaire pour valider les champs spécifiques
  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        newErrors.email = 'Veuillez entrer un email valide (ex: user@domain.com).';
      } else {
        newErrors.email = '';
      }
    }

    if (name === 'phone') {
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        newErrors.phone = 'Veuillez entrer un numéro au format 418-555-1234.';
      } else {
        newErrors.phone = '';
      }
    }

    if (name === 'postalCode') {
      const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
      if (!postalCodeRegex.test(value)) {
        newErrors.postalCode = 'Veuillez entrer un code postal valide (ex: G5R 0A1).';
      } else {
        newErrors.postalCode = '';
      }
    }

    setErrors(newErrors);
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity() && !errors.email && !errors.phone && !errors.postalCode) {
      console.log('Utilisateur ajouté :', formData);
      // Réinitialiser le formulaire après soumission
      setFormData({
        lastName: '',
        name: '',
        email: '',
        phone: '',
        adresse: '',
        postalCode: '',
        city: '',
        country: '',
        points: 0,
      });
      setErrors({
        email: '',
        phone: '',
        postalCode: '',
      });
    } else {
      // Déclencher la validation HTML pour afficher les messages d'erreur
      form.reportValidity();
    }
  };

  return (
    <div className="min-h-screen bg-red-900 text-white">
      {/* En-tête de la page */}
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Administration</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Bienvenue dans la section d'administration. Ajoutez un nouvel utilisateur pour gérer les accès.
        </p>
      </header>

      {/* Section de la liste des utilisateurs */}
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
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ex: Doe"
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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: John"
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
                  value={formData.email}
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
                  className={`w-full px-4 py-2 rounded-lg border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:border-yellow-400 focus:outline-none text-gray-800`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                  value={formData.phone}
                  onChange={(e) => {
                    handleChange(e);
                    handleValidation(e);
                  }}
                  placeholder="Ex: 418-555-1234"
                  pattern="\d{3}-\d{3}-\d{4}"
                  onInvalid={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity(
                      'Veuillez entrer un numéro au format 418-555-1234.'
                    )
                  }
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                  className={`w-full px-4 py-2 rounded-lg border-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:border-yellow-400 focus:outline-none text-gray-800`}
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
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
                  value={formData.adresse}
                  onChange={handleChange}
                  placeholder="Ex: 123 Rue des Pompiers"
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
                  value={formData.postalCode}
                  onChange={(e) => {
                    handleChange(e);
                    handleValidation(e);
                  }}
                  placeholder="Ex: G5R 0A1"
                  pattern="[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d"
                  onInvalid={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity(
                      'Veuillez entrer un code postal valide (ex: G5R 0A1).'
                    )
                  }
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                  className={`w-full px-4 py-2 rounded-lg border-2 ${
                    errors.postalCode ? 'border-red-500' : 'border-gray-300'
                  } focus:border-yellow-400 focus:outline-none text-gray-800`}
                  required
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                )}
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
                  value={formData.city}
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
                  value={formData.country}
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
                  value={formData.points}
                  onChange={handleChange}
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