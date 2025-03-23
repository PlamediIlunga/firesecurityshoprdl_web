import ProduitItem from '../types/ProduitItem';
import MyProducts from '../components/ProductComponent';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import casePostalBD from '../datas/casePostaleBD_Mock.json';

export default function Catalogue() {
  const api_url = "http://localhost:5007/";
  const [products, setProducts] = useState<ProduitItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Ajout d'un état pour le chargement

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
        setProducts(casePostalBD.Products.map(product => ({
          idItem: product.idItem,
          noArticle: product.noArticle,
          name: product.name,
          points: product.points,
          description: product.description,
          image: product.imageUrl // Map imageUrl to image
        })));
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
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
          Catalogue des Produits
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Découvrez notre sélection d’équipements et de vêtements pour les pompiers de Rivière-du-Loup. Échangez vos points pour des produits de qualité adaptés à vos besoins !
        </p>
      </header>

      {/* Section des produits */}
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
                  className="group" // Ajout de la classe "group" pour les effets de survol
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