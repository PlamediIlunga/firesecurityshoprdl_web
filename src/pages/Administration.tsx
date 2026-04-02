import { Link } from "react-router-dom";
import '../styles/Administration.scss';

export default function Administration() {
  return (
    <div className="admin-page">

      {/* HEADER — fond brun foncé comme Home/Contact/Catalogue */}
      <header className="admin-header">
        <div className="admin-header__inner">
          <span className="admin-header__badge">Panneau d'administration</span>
          <h1 className="admin-header__title">Administration</h1>
          <div className="admin-header__rule" />
          <p className="admin-header__subtitle">
            Gérez les utilisateurs, les produits et les commandes du Service Incendie de Rivière-du-Loup avec efficacité et simplicité.
          </p>
        </div>
      </header>

      {/* SECTION CARTES */}
      <section className="admin-section">
        <div className="admin-section__inner">

          {/* Gestion des utilisateurs */}
          <div className="admin-card">
            <div className="admin-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="admin-card__num">01</div>
            <h2 className="admin-card__title">Gestion des utilisateurs</h2>
            <div className="admin-card__rule" />
            <p className="admin-card__desc">
              Ajoutez, modifiez ou supprimez des utilisateurs. Gérez les accès et les permissions pour une administration optimale.
            </p>
            <Link to="/Home/Administration/User" className="admin-card__btn">
              Accéder
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Gestion des produits */}
          <div className="admin-card">
            <div className="admin-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="admin-card__num">02</div>
            <h2 className="admin-card__title">Gestion des produits</h2>
            <div className="admin-card__rule" />
            <p className="admin-card__desc">
              Administrez le catalogue de produits : ajoutez, modifiez ou supprimez des équipements et vêtements pour les pompiers.
            </p>
            <Link to="/Home/Administration/Product" className="admin-card__btn">
              Accéder
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Gestion des commandes */}
          <div className="admin-card">
            <div className="admin-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="admin-card__num">03</div>
            <h2 className="admin-card__title">Gestion des commandes</h2>
            <div className="admin-card__rule" />
            <p className="admin-card__desc">
              Consultez, modifiez ou suivez les commandes passées. Gérez les échanges de points et les historiques d'achat.
            </p>
            <Link to="/Home/Administration/Order" className="admin-card__btn">
              Accéder
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
