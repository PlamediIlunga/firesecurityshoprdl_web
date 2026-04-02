import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserItem from '../types/UserItem';
import UserComponent from '../components/UserComponent';
import '../styles/Profil.scss';

export let idCurrentUser = 0;

export default function Profil() {
  const [user, setUser] = useState<UserItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { idUser } = useParams<{ idUser?: string }>();
  const api_url = import.meta.env.VITE_API_URL;
  idCurrentUser = parseInt(idUser || '0');

  useEffect(() => {
    const getUserById = async () => {
      const token = localStorage.getItem('bearerToken');
      if (!token) { setIsLoading(false); return; }
      if (idUser) {
        try {
          setIsLoading(true);
          const response = await fetch(`${api_url}/api/User/GetUserById/${idUser}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error("Erreur lors de la récupération de l'utilisateur");
          const data: UserItem = await response.json();
          setUser(data);
        } catch (error) {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getUserById();
  }, [idUser, api_url]);

  return (
    <div className="profil-page">

      {/* HEADER */}
      <header className="profil-header">
        <div className="profil-header__inner">
          <span className="profil-header__badge">Espace personnel</span>
          <h1 className="profil-header__title">Mon Profil</h1>
          <div className="profil-header__rule" />
          <p className="profil-header__subtitle">
            Consultez et gérez vos informations personnelles et vos points.
          </p>
        </div>
      </header>

      <main className="profil-main">
        <section className="profil-section">
          <div className="profil-section__inner">

            {isLoading ? (
              <div className="profil-loader">
                <div className="profil-loader__spinner" />
                <span className="profil-loader__text">Chargement du profil…</span>
              </div>
            ) : user ? (
              <div className="profil-card">

                {/* En-tête carte : icône cercle + nom + points */}
                <div className="profil-card__top">

                  {/* Avatar SVG circulaire */}
                  <div className="profil-card__avatar">
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="profil-card__avatar-svg">
                      {/* Fond cercle */}
                      <circle cx="40" cy="40" r="40" fill="#2a2420"/>
                      {/* Anneau doré */}
                      <circle cx="40" cy="40" r="38" stroke="#c9a96e" strokeWidth="1.5" fill="none" strokeOpacity="0.4"/>
                      {/* Corps silhouette */}
                      <circle cx="40" cy="30" r="13" fill="#c9a96e" fillOpacity="0.9"/>
                      <path d="M14 68c0-14.36 11.64-26 26-26h0c14.36 0 26 11.64 26 26" fill="#c9a96e" fillOpacity="0.9"/>
                    </svg>
                  </div>

                  <div className="profil-card__top-info">
                    <h2 className="profil-card__name">{user.lastName} {user.lastName}</h2>
                    <span className="profil-card__email">{user.email}</span>
                    <span className="profil-card__role">· Membre du Service Incendie</span>
                  </div>

                  <div className="profil-card__points-pill">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {user.points} pts
                  </div>
                </div>

                <div className="profil-card__rule" />

                {/* Blocs d'informations */}
                <UserComponent user={user} />

                {/* Bouton modifier */}
                <div className="profil-card__actions">
                  <Link to="#" className="profil-card__btn">
                    Modifier le profil
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

              </div>
            ) : (
              <div className="profil-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <p>Les informations de l'utilisateur n'ont pas pu être obtenues.</p>
              </div>
            )}

          </div>
        </section>

        {/* Historique commandes */}
        <section className="profil-orders">
          <div className="profil-orders__inner">

            <div className="profil-orders__heading">
              <span className="profil-orders__num">01</span>
              <div>
                <h2 className="profil-orders__title">Historique des commandes</h2>
                <div className="profil-orders__rule" />
              </div>
            </div>

            <div className="profil-orders__card">
              <div className="profil-orders__empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Aucune commande récente.</p>
                <span>Consultez le catalogue pour échanger vos points !</span>
                <Link to="/Home/Catalogue" className="profil-orders__btn">
                  Voir le catalogue
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

    </div>
  );
}