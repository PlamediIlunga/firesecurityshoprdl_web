import ProduitItem from '../types/ProduitItem';
import ListProducts from '../components/ListProductComponent';
import { useState, useEffect } from 'react';
import casePostalBD from '../datas/casePostaleBD_Mock.json';

export default function Product() {
  const [products, setProducts] = useState<ProduitItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        /*const response = await fetch(api_url + "api/Item/GetAllItem");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }
        const products: ProduitItem[] = await response.json();
        setProducts(products);*/
        // temporaire
        setProducts(casePostalBD.ListeProduit.map(product => ({
          idItem: product.idItem,
          noArticle: product.noArticle,
          name: product.name,
          points: product.points,
          description: product.description,
          imageUrl: product.imageUrl 
        })));
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        setProducts([]); 
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-red-900 text-white">
      {/* En-tête de la page */}
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Administration
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Bienvenue dans la section d'administration. Ajoutez un nouveau produit au catalogue.
        </p>
      </header>

      {/* Section de la liste de produits */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Liste des produits
          </h2>
          {isLoading ? (
            <div className="text-center text-lg flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-yellow-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Chargement des produits...
            </div>
          ) : products.length > 0 ? (
            <div className="space-y-6">
              <ListProducts products={products} />
            </div>
          ) : (
            <p className="text-center text-lg">
              Les informations des produits n'ont pas pu être obtenues.
            </p>
          )}
        </div>
      </section>

      {/* Section du formulaire */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gray-100 text-gray-800 p-8 rounded-lg border-4 border-yellow-400 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Ajouter un produit
            </h2>
            <form className="space-y-6">
              {/* Champ : Nom du produit */}
              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                  Nom du produit
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ex: Bande sur manteau"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              {/* Champ : Numéro d'article */}
              <div>
                <label htmlFor="noArticle" className="block text-lg font-semibold text-gray-700 mb-2">
                  Numéro d'article
                </label>
                <input
                  type="text"
                  id="noArticle"
                  name="noArticle"
                  placeholder="Ex: DIV18"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              {/* Champ : Points */}
              <div>
                <label htmlFor="points" className="block text-lg font-semibold text-gray-700 mb-2">
                  Points requis
                </label>
                <input
                  type="number"
                  id="points"
                  name="points"
                  placeholder="Ex: 18"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              {/* Champ : Description */}
              <div>
                <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Ex: Bande réfléchissante"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800 resize-none"
                  required
                />
              </div>

              {/* Champ : Image */}
              <div>
                <label htmlFor="image" className="block text-lg font-semibold text-gray-700 mb-2">
                  Image du produit
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              {/* Bouton Ajouter */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg font-semibold text-lg transition duration-300 bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                >
                  Ajouter le produit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}