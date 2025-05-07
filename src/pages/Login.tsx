import { useState, useEffect } from 'react';
import UserModel from '../modeles/usersModel';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [usernameInput, setUsername] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [users, setUsers] = useState<UserModel[]>([]);
  const [decodedToken, setDecodedToken] = useState<{ idUser?: number; isAdministrator?: boolean } | null>(null);
  const navigate = useNavigate();
  //const api_url = import.meta.env.VITE_API_URL;
  const api_url = 'http://localhost:5007/';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(api_url + "api/User/GetAllUser", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('bearerToken')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };
    fetchUsers();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(api_url + "api/Auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur de connexion: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const bearerToken = data.token;

      if (!bearerToken) {
        throw new Error('Token non trouvé dans la réponse');
      }

      // Décoder le token avec jwt-decode
      const payload = jwtDecode<{ idUser: number; isAdministrator: boolean }>(bearerToken);
      setDecodedToken({
        idUser: payload.idUser,
        isAdministrator: payload.isAdministrator,
      });

      // Stocker le token
      localStorage.setItem('bearerToken', bearerToken);

      console.log('Connexion réussie', {
        IdUser: payload.idUser,
        IsAdministrator: payload.isAdministrator,
      });

      // Rediriger vers /Home
      navigate('/Home');
      return bearerToken;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      alert(`Erreur: ${error}`);
      throw error;
    }
  };

  const handlelogin = async () => {
    await login(usernameInput, passwordInput);
  };

  return (
    <div className="min-h-screen bg-red-900 flex items-center justify-center p-6">
      <div className="hidden">
        {users.map((user) => (
          <div key={user.idUser}>
            {user.username} - {user.email}
          </div>
        ))}
      </div>
      <div className="bg-blue-900 rounded-lg border-4 border-yellow-400 p-8 w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Connexion</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            value={usernameInput}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 rounded border border-yellow-400 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={passwordInput}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded border border-yellow-400 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handlelogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded border-2 border-yellow-400 transition duration-300"
          >
            Se connecter
          </button>
          <p className="text-white text-center mt-4">
            Mot de passe oublié ?{' '}
            <a href="#" className="text-yellow-400 hover:text-yellow-300 underline">
              Cliquez ici
            </a>
          </p>
        </div>
        {decodedToken && (
          <div className="mt-4 text-white text-center">
            <p>IdUser: {decodedToken.idUser ?? 'Non trouvé'}</p>
            <p>IsAdministrator: {decodedToken.isAdministrator ? 'Oui' : 'Non'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
