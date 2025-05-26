import UserItem from '../types/UserItem';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditUser() {
  const [user, setUser] = useState<UserItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null); // Erreur globale (API, etc.)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    country: '',
  });
  const { idUser } = useParams<{ idUser?: string }>();
  const api_url = import.meta.env.VITE_API_URL;
  //const api_url = 'http://localhost:5007/'
  const MAX_LENGTH = 200; // Limite de 200 caractères

  useEffect(() => {
    const getUserById = async () => {
      if (idUser) {
        try {
          setIsLoading(true);
          setError(null);
          const token = localStorage.getItem('bearerToken');
          if (!token) throw new Error('Token d’authentification manquant.');
          const response = await fetch(`${api_url}api/User/GetUserById/${idUser}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error(`Erreur ${response.status} : Impossible de récupérer l'utilisateur.`);
          }
          const userData: UserItem = await response.json();
          setUser(userData);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue.';
          setError(errorMessage);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getUserById();
  }, [idUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    // Validation de la longueur pour les champs textuels
    if (type !== 'checkbox' && type !== 'number' && value.length > MAX_LENGTH) {
      setErrors((prev) => ({
        ...prev,
        [name]: `Ce champ ne peut pas dépasser ${MAX_LENGTH} caractères.`,
      }));
      return;
    }

    // Mise à jour de l'utilisateur
    setUser((prev) => ({
      ...prev!,
      [name]: type === 'checkbox' ? checked : name === 'points' ? parseInt(value) || 0 : value,
    }));

    // Réinitialiser l'erreur pour ce champ
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    // Validation email
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      newErrors.email = emailRegex.test(value)
        ? ''
        : 'Veuillez entrer un email valide (ex: user@domain.com).';
    }

    // Validation mot de passe
    if (name === 'password' && value) { // Mot de passe optionnel
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      newErrors.password = passwordRegex.test(value)
        ? ''
        : 'Le mot de passe doit contenir au moins 8 caractères, incluant une lettre et un chiffre.';
    }

    // Validation des autres champs pour s'assurer qu'ils ne sont pas vides (sauf province et password)
    if (name === 'firstName' && !value.trim()) {
      newErrors.firstName = 'Le prénom est requis.';
    }
    if (name === 'lastName' && !value.trim()) {
      newErrors.lastName = 'Le nom de famille est requis.';
    }
    if (name === 'address' && !value.trim()) {
      newErrors.address = 'L’adresse est requise.';
    }
    if (name === 'city' && !value.trim()) {
      newErrors.city = 'La ville est requise.';
    }
    if (name === 'country' && !value.trim()) {
      newErrors.country = 'Le pays est requis.';
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitted(false);

    const form = e.target as HTMLFormElement;
    
    // Vérifier les erreurs de validation
    const formErrors = Object.values(errors).some((err) => err !== '');
    if (!formErrors && form.checkValidity() && user) {
      try {
        const token = localStorage.getItem('bearerToken');
        if (!token) throw new Error('Token d’authentification manquant.');
        const response = await fetch(`${api_url}api/User/UpdateUser`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          throw new Error(`Erreur ${response.status} : Impossible de mettre à jour l'utilisateur.`);
        }
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 2000);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue.';
        setError(errorMessage);
      }
    } else {
      form.reportValidity();
      // Déclencher la validation pour tous les champs
      const inputs = form.querySelectorAll('input');
      inputs.forEach((input) => handleValidation({ target: input } as React.ChangeEvent<HTMLInputElement>));
    }
  };

  return (
    <div className="min-h-screen bg-red-900 text-white">
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Administration</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Bienvenue dans la section de modification d'un utilisateur, vous pouvez
          modifier les informations de l'utilisateur.
        </p>
      </header>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
              <p>{error}</p>
            </div>
          )}
          {isSubmitted && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
              <p>Utilisateur modifié avec succès !</p>
            </div>
          )}
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
                Modifier : {user.lastName} {user.firstName}
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                    value={user.email || ''}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidation(e);
                    }}
                    placeholder="Ex: marc.tremblay@serviceincendie-rdl.ca"
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
                
                {/*
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
                    value={user.password || ''}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidation(e);
                    }}
                    placeholder="Laisser vide pour ne pas modifier"
                    pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                    onInvalid={(e) =>
                      (e.target as HTMLInputElement).setCustomValidity(
                        'Le mot de passe doit contenir au moins 8 caractères, incluant une lettre et un chiffre.'
                      )
                    }
                    onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                    className={`w-full px-4 py-2 rounded-lg border-2 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } focus:border-yellow-400 focus:outline-none text-gray-800`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                */}

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
                    value={user.points || 0}
                    onChange={handleChange}
                    placeholder="Ex: 300"
                    min="0"
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
                    value={user.firstName || ''}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidation(e);
                    }}
                    placeholder="Ex: Marc"
                    className={`w-full px-4 py-2 rounded-lg border-2 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:border-yellow-400 focus:outline-none text-gray-800`}
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

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
                    value={user.lastName || ''}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidation(e);
                    }}
                    placeholder="Ex: Tremblay"
                    className={`w-full px-4 py-2 rounded-lg border-2 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:border-yellow-400 focus:outline-none text-gray-800`}
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
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
                    value={user.address || ''}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidation(e);
                    }}
                    placeholder="Ex: 45 Rue des Pompiers"
                    className={`w-full px-4 py-2 rounded-lg border-2 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    } focus:border-yellow-400 focus:outline-none text-gray-800`}
                    required
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
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
                    value={user.city || ''}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidation(e);
                    }}
                    placeholder="Ex: Rivière-du-Loup"
                    className={`w-full px-4 py-2 rounded-lg border-2 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    } focus:border-yellow-400 focus:outline-none text-gray-800`}
                    required
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
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
                    value={user.province || ''}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidation(e);
                    }}
                    placeholder="Ex: Québec"
                    className={`w-full px-4 py-2 rounded-lg border-2 ${
                      errors.province ? 'border-red-500' : 'border-gray-300'
                    } focus:border-yellow-400 focus:outline-none text-gray-800`}
                  />
                  {errors.province && (
                    <p className="text-red-500 text-sm mt-1">{errors.province}</p>
                  )}
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
                    value={user.country || ''}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidation(e);
                    }}
                    placeholder="Ex: Canada"
                    className={`w-full px-4 py-2 rounded-lg border-2 ${
                      errors.country ? 'border-red-500' : 'border-gray-300'
                    } focus:border-yellow-400 focus:outline-none text-gray-800`}
                    required
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                  )}
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
                    checked={user.isAdministrator || false}
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
                    disabled={isLoading || isSubmitted}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition duration-300 ${
                      isSubmitted
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-yellow-400 text-gray-800 hover:bg-yellow-500'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Chargement...' : isSubmitted ? 'Utilisateur modifié !' : 'Modifier l’utilisateur'}
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