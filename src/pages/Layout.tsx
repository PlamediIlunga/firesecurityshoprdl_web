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
              <IoMdHome size={30}/>
            </Link>
          </div>

          {/* Section droite : Catalogue, Panier, Produit */}
          <div className="flex items-center space-x-6">
            <Link
              to="/Home/Catalogue"
              className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
            >
              Catalogue
            </Link>
            <Link
              to="/kart"
              className="text-yellow-400 text-base font-medium hover:text-yellow-400 transition duration-300"
            >
              <FaCartShopping size={30}/>
            </Link>
            <Link
              to="/Home/Administration/Products"
              className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
            >
              Administration
            </Link>
            <Link
              to="#"
              className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
            >
              <RiAccountCircleFill size={70}/>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow w-full bg-red-700">
        <Outlet />
      </main>

      <footer className="bg-blue-900 border-t-4 border-yellow-400 py-4 text-center shadow-inner w-full">
        <h1 className="text-yellow-400 font-bold">Footer</h1>
      </footer>
    </div>
  );
};

export default Layout;