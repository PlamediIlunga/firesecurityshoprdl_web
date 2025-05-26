import ProduitItem from '../types/ProduitItem';
import MyProducts from '../components/ProductComponent';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Catalogue() {
  const [products, setProducts] = useState<ProduitItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  //const api_url = 'http://localhost:5007/'
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getProducts = async () => {
      const token = localStorage.getItem('bearerToken');
      if (!token) {
        console.error("Token non trouvé dans le localStorage");
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${api_url}/api/Item/GetAllItem`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }
        const products: ProduitItem[] = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-red-900 text-white">
      <div className="flex justify-end max-w-7xl mx-auto px-4 pt-6">
        <div className="relative inline-block">
          <select
            onChange={handleCategoryChange}
            className="bg-white-900 text-black border-2 border-yellow-400 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none hover:bg-blue-800 transition duration-300"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Vêtements">Vêtements</option>
            <option value="Équipements">Équipements</option>
            <option value="Accessoires">Accessoires</option>
            <option value="Autres">Autres</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Catalogue des Produits
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl">
            Découvrez notre sélection d’équipements et de vêtements pour les pompiers de Rivière-du-Loup. Échangez vos points pour des produits de qualité adaptés à vos besoins !
          </p>
          {selectedCategory && (
            <h2 className="text-2xl font-semibold text-yellow-400 mt-4 text-left">
              Catégorie : {selectedCategory}
            </h2>
          )}
        </div>
      </header>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <p className="text-center text-lg">Chargement des produits...</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={String(product.idItem)}
                  to={`/Products/${product.idItem}`}
                  className="group"
                >
                  <div className="bg-gray-100 text-gray-800 p-6 rounded-lg border-4 border-yellow-400 shadow-lg hover:bg-blue-900 hover:text-white transition duration-300 flex flex-col h-72 w-full transform group-hover:scale-105">
                    <MyProducts product={product} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg">Aucun produit disponible pour le moment.</p>
          )}
        </div>
      </section>
    </div>
  );
}