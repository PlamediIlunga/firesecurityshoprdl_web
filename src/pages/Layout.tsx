import { Outlet, Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";

const Layout = () => {
  return (
    <div className="min-h-screen bg-red-700 flex flex-col w-full m-0 p-0">
      <header className="bg-blue-900 border-b-4 border-yellow-400 shadow-lg w-full">
        <nav className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Section gauche : Logo + "Accueil" */}
          <div className="flex items-center space-x-4">
            <a id="logo" href="/Home" className="flex items-center">
              <img
                src="https://www.ciel103.com/medias/large/nouvelles/logo-incendie.jpg"
                alt="Logo Service Incendie"
                className="h-12 w-12 rounded-full object-cover" // Redimensionnement et style
              />
            </a>
            <Link
              to="/Home"
              className="text-yellow-400 text-lg font-semibold hover:text-yellow-300 transition duration-300"
            >
              <IoMdHome size={30} />
            </Link>

            <Link
              to="/Home/Catalogue"
              className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
            >
              Catalogue
            </Link>
          </div>

          {/* Section droite : Catalogue, Panier, Produit */}
          <div className="flex items-center space-x-6">
            <Link
              to="/Home/Contact"
              className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
            >
              Contact
            </Link>
            <Link
              to="/kart"
              className="text-yellow-400 text-base font-medium hover:text-yellow-400 transition duration-300"
            >
              <FaCartShopping size={30} />
            </Link>
            <Link
              to="/Home/Administration/"
              className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
            >
              Administration
            </Link>
            <Link
              to="#"
              className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
            >
              <RiAccountCircleFill size={70} />
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow w-full bg-red-700">
        <Outlet />
      </main>

      <footer className="bg-blue-900 border-t-4 border-yellow-400 py-6 text-center shadow-inner w-full">
        <div className="max-w-7xl mx-auto px-4">
          {/* Informations de l'organisation */}
          <div className="text-white mb-4">
            <h2 className="text-xl font-bold text-yellow-400 mb-2">
              Service Incendie Rivière-du-Loup
            </h2>
            <p className="text-sm">
              123 Rue des Pompiers, Rivière-du-Loup, QC G5R 0A1
            </p>
            <p className="text-sm">
              Téléphone : (418) 555-1234 | Email :{" "}
              <a
                href="mailto:contact@serviceincendie-rdl.ca"
                className="text-yellow-400 hover:text-yellow-300 transition duration-300"
              >
                contact@serviceincendie-rdl.ca
              </a>
            </p>
          </div>

          {/* Liens utiles */}
          <div className="flex justify-center space-x-6 mb-4">
            <Link
              to="#"
              className="text-white text-sm font-medium hover:text-yellow-400 transition duration-300"
            >
              À propos
            </Link>
            <Link
              to="#"
              className="text-white text-sm font-medium hover:text-yellow-400 transition duration-300"
            >
              Contact
            </Link>
            <Link
              to="#"
              className="text-white text-sm font-medium hover:text-yellow-400 transition duration-300"
            >
              Politique de confidentialité
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-yellow-400 text-sm">
            © 2025 Plamedi Ilunga. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;