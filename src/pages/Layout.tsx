import { Outlet, Link, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import '../styles/Layout.scss';

const Layout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [decodedToken, setDecodedToken] = useState<{ email: string; role: string, idUser: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const bearerToken = localStorage.getItem('bearerToken');
    if (bearerToken) {
      try {
        const payload = jwtDecode<{ email: string; role: string, idUser: string }>(bearerToken);
        console.log(payload);
        setDecodedToken(payload);
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        setDecodedToken(null);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('bearerToken');
    setDecodedToken(null);
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <div className="layout-root">

      {/* ── HEADER ── */}
      <header className="layout-header">
        <nav className="layout-nav">
          <div className="layout-nav__left">
            <Link to="/Home" className="layout-nav__logo">
              <img
                src="https://www.ciel103.com/medias/large/nouvelles/logo-incendie.jpg"
                alt="Logo Service Incendie"
                className="layout-nav__logo-img"
              />
            </Link>
            <Link to="/Home" className="layout-nav__link layout-nav__link--icon">
              <IoMdHome size={22} />
            </Link>
            <Link to="/Home/Catalogue" className="layout-nav__link">
              Catalogue
            </Link>
          </div>

          <div className="layout-nav__right">
            <Link to="/Home/Contact" className="layout-nav__link">
              Contact
            </Link>
            <Link to="/kart" className="layout-nav__link layout-nav__link--icon">
              <FaCartShopping size={22} />
            </Link>

            {decodedToken?.role === "Admin" ? (
              <Link to="/Home/Administration/" className="layout-nav__link">
                Administration
              </Link>
            ) : (
              <Link to="/Home/Order/" className="layout-nav__link">
                Commandes
              </Link>
            )}

            <div className="layout-nav__account">
              <button onClick={toggleDropdown} className="layout-nav__account-btn">
                <RiAccountCircleFill size={40} />
              </button>

              {isDropdownOpen && (
                <div className="layout-dropdown">
                  <div className="layout-dropdown__header">
                    <span className="layout-dropdown__name">
                      {decodedToken?.email ? decodedToken.email.split('@')[0] : 'Non connecté'}
                    </span>
                    <span className="layout-dropdown__role">
                      {decodedToken?.role === "Admin" ? 'Administrateur' : 'Utilisateur'}
                    </span>
                  </div>
                  <ul className="layout-dropdown__menu">
                    <li>
                      <Link to={`/Profil/${decodedToken?.idUser}`} className="layout-dropdown__item">
                        Profil
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="layout-dropdown__item">
                        Paramètres
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="layout-dropdown__item">
                        Points
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="layout-dropdown__item layout-dropdown__item--logout">
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* ── MAIN ── */}
      <main className="layout-main">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="layout-footer">
        <div className="layout-footer__inner">
          <div className="layout-footer__info">
            <h2 className="layout-footer__title">Service Incendie Rivière-du-Loup</h2>
            <p className="layout-footer__text">123 Rue des Pompiers, Rivière-du-Loup, QC G5R 0A1</p>
            <p className="layout-footer__text">
              Téléphone : (418) 555-1234 | Email :{" "}
              <a href="mailto:contact@serviceincendie-rdl.ca" className="layout-footer__link">
                contact@serviceincendie-rdl.ca
              </a>
            </p>
          </div>

          <div className="layout-footer__rule" />

          <div className="layout-footer__links">
            <Link to="#" className="layout-footer__nav-link">À propos</Link>
            <Link to="#" className="layout-footer__nav-link">Contact</Link>
            <Link to="#" className="layout-footer__nav-link">Politique de confidentialité</Link>
          </div>

          <p className="layout-footer__copy">© 2025 Plamedi Ilunga. Tous droits réservés.</p>
        </div>
      </footer>

    </div>
  );
};

export default Layout;
