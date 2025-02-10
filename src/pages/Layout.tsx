import { Outlet, Link } from "react-router-dom";
import '../styles/Layout.scss'
const Layout = () => {
  return (
    <body>
      <header className="navLayout">
        <nav >
          <ul>
            <li>
              <a id="logo" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none"><ellipse cx="22.48" cy="22.5263" rx="22.22" ry="21.7105" fill="black"></ellipse></svg><p className="text">LOGO</p></a>
            </li>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/Administration/Catalogue">Catalogue</Link>
            </li>
            <li>
              Categorie 2
            </li>
            <li>
              Categorie 3
            </li>
            <li>
              Categorie 4
            </li>
            <li>
              Promotions
            </li>
            <li>
              <Link to="/kart">Panier</Link>
            </li>
            <li>
              <Link to="/Administration/Produit">Administration</Link>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
      <Outlet />
      <footer className="footer">
        <h1 className="textFooter">Nos produits sont aussi fiables que le css de cette page , À vous d'en juger< br />
          P.S: AUCUN REMBOURSEMENT
        </h1>
      </footer>
    </body>

  );
};

export default Layout;