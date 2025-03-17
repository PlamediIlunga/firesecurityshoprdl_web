import { Outlet, Link } from "react-router-dom";
const Layout = () => {
  return (
    <div className="min-h-screen bg-red-700 flex flex-col w-full m-0 p-0 overflow-x-hidden">
      <header className="bg-blue-900 border-b-4 border-yellow-400 shadow-lg w-screen max-w-full mx-0 px-0">
        <nav className="w-full px-0 py-3">
          <ul className="flex flex-wrap items-center justify-between w-full px-4">
            <li className="flex items-center">
              <a id="logo" href="/Home" className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                  <ellipse cx="22.48" cy="22.5263" rx="22.22" ry="21.7105" fill="black"></ellipse>
                </svg>
                <p className="text-yellow-400 text-xl font-bold ml-2">Home</p>
              </a>
            </li>
            <li className="mx-2">
              <Link to="/Administration/Catalogue" className="text-white hover:text-yellow-400 font-medium transition duration-300">Catalogue</Link>
            </li>
            <li className="mx-2">
              <Link to="/kart" className="text-white hover:text-yellow-400 font-medium transition duration-300">Panier</Link>
            </li>
            <li className="mx-2">
              <Link to="/Administration/Product" className="text-white hover:text-yellow-400 font-medium transition duration-300">Produit</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow p-6 w-full">
        <Outlet />
      </main>

      <footer className="bg-blue-900 border-t-4 border-yellow-400 py-4 text-center shadow-inner w-screen max-w-full mx-0 px-0">
        <h1 className="text-yellow-400 font-bold">Footer</h1>
      </footer>
    </div>
  );
};

export default Layout;