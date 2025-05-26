import { Link } from "react-router-dom";

export default function Administration() {
  return (
    <div className="min-h-screen bg-red-900 text-white flex flex-col">
      {/* En-tête de la page */}
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Administration</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Gérez les utilisateurs, les produits et les commandes du Service Incendie de Rivière-du-Loup avec efficacité et simplicité.
        </p>
      </header>

      {/* Section principale */}
      <section className="py-12 flex-grow">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gestion des utilisateurs */}
            <div className="flex flex-col items-center">
              {/* Cercle non cliquable */}
              <div className="w-40 h-40 flex items-center justify-center rounded-full border-4 border-yellow-400 mb-6">
                <h2 className="text-xl font-semibold text-center">
                  Gestion des utilisateurs
                </h2>
              </div>
              {/* Carré avec description et bouton */}
              <div className="bg-blue-900 rounded-lg border-4 border-yellow-400 p-6 shadow-lg text-center">
                <p className="text-lg mb-4">
                  Ajoutez, modifiez ou supprimez des utilisateurs. Gérez les accès et les permissions pour une administration optimale.
                </p>
                <Link
                  to="/Home/Administration/User"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded border-2 border-yellow-400 transition duration-300"
                >
                  Aller vers
                </Link>
              </div>
            </div>

            {/* Gestion des produits */}
            <div className="flex flex-col items-center">
              {/* Cercle non cliquable */}
              <div className="w-40 h-40 flex items-center justify-center rounded-full border-4 border-yellow-400 mb-6">
                <h2 className="text-xl font-semibold text-center">
                  Gestion des produits
                </h2>
              </div>
              {/* Carré avec description et bouton */}
              <div className="bg-blue-900 rounded-lg border-4 border-yellow-400 p-6 shadow-lg text-center">
                <p className="text-lg mb-4">
                  Administrez le catalogue de produits : ajoutez, modifiez ou supprimez des équipements et vêtements pour les pompiers.
                </p>
                <Link
                  to="/Home/Administration/Product"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded border-2 border-yellow-400 transition duration-300"
                >
                  Aller vers
                </Link>
              </div>
            </div>

            {/* Gestion des commandes */}
            <div className="flex flex-col items-center">
              {/* Cercle non cliquable */}
              <div className="w-40 h-40 flex items-center justify-center rounded-full border-4 border-yellow-400 mb-6">
                <h2 className="text-xl font-semibold text-center">
                  Gestion des commandes
                </h2>
              </div>
              {/* Carré avec description et bouton */}
              <div className="bg-blue-900 rounded-lg border-4 border-yellow-400 p-6 shadow-lg text-center">
                <p className="text-lg mb-4">
                  Consultez, modifiez ou suivez les commandes passées. Gérez les échanges de points et les historiques d'achat.
                </p>
                <Link
                  to="/Home/Administration/Order"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded border-2 border-yellow-400 transition duration-300"
                >
                  Aller vers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}