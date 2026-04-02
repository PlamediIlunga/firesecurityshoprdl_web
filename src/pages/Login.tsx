import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/Login.scss';

export default function Login() {
  const [usernameInput, setUsername] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [ isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [decodedToken, setDecodedToken] = useState<{ idUser?: number; isAdministrator?: boolean } | null>(null);
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => { }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(api_url + "/api/Auth/login", {
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

      const payload = jwtDecode<{ idUser: number; isAdministrator: boolean }>(bearerToken);
      setDecodedToken({
        idUser: payload.idUser,
        isAdministrator: payload.isAdministrator,
      });

      localStorage.setItem('bearerToken', bearerToken);

      console.log('Connexion réussie', {
        IdUser: payload.idUser,
        IsAdministrator: payload.isAdministrator,
      });

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
    <div className="login-page">

      <div className="login-card">

        <div className="login-card__header">
          <img
            src="https://www.ciel103.com/medias/large/nouvelles/logo-incendie.jpg"
            alt="Logo Service Incendie"
            className="login-card__logo"
          />
          <h1 className="login-card__title">Connexion</h1>
          <p className="login-card__subtitle">Service Incendie — Rivière-du-Loup</p>
        </div>

        <div className="login-card__body">
          <div className="login-field">
            <label className="login-field__label">Email</label>
            <input
              type='text'
              placeholder="votre@email.com"
              value={usernameInput}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-field__input"
            />
          </div>

          <div className="login-field">
            <label className="login-field__label">Mot de passe</label>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-field__input"
              id = "password"
            />
            <label typeof="checkbox">
              <input type="checkbox" id="checkbox"
               onChange={(e)=> setIsPasswordVisible(e.target.checked)}
              />
                Afficher le mot de passe
            </label>
          </div>

          <button onClick={handlelogin} className="login-btn">
            Se connecter
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <p className="login-card__forgot">
            Mot de passe oublié ?{' '}
            <a href="#" className="login-card__forgot-link">Cliquez ici</a>
          </p>
        </div>

        {decodedToken && (
          <div className="login-card__debug">
            <p>IdUser: {decodedToken.idUser ?? 'Non trouvé'}</p>
            <p>IsAdministrator: {decodedToken.isAdministrator ? 'Oui' : 'Non'}</p>
          </div>
        )}

      </div>
    </div>
  );
}
