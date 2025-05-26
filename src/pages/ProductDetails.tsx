import ProduitItem from '../types/ProduitItem';
import MyProduct from '../components/ProductDetailsComponent';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const api_url = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState<ProduitItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { idItem } = useParams<{ idItem?: string }>();

  useEffect(() => {
    const getProductById = async () => {
      const token = localStorage.getItem('bearerToken');
      if (!token) {
        console.error("Token non trouvé dans le localStorage");
        return;
      }

      if (idItem) {
        try {
          setIsLoading(true);
          const response = await fetch(`${api_url}api/Item/GetItemById/${idItem}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération du produit");
          }
          const product: ProduitItem = await response.json();
          setProduct(product);
        } catch (error) {
          console.error("Erreur lors de la récupération du produit :", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getProductById();
  }, [idItem, api_url]);

  return (
    <div className="min-h-screen bg-red-900 text-white">
      {/* En-tête de la page */}
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Détail du Produit
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Découvrez tous les détails de cet équipement ou vêtement disponible pour les pompiers de Rivière-du-Loup.
        </p>
      </header>

      {/* Section du produit */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="text-center text-lg flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-yellow-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Chargement du produit...
            </div>
          ) : product ? (
            <div className="bg-gray-100 text-gray-800 p-8 rounded-lg border-4 border-yellow-400 shadow-2xl">
              <MyProduct product={product} />
            </div>
          ) : (
            <p className="text-center text-lg">Produit non trouvé.</p>
          )}
        </div>
      </section>
    </div>
  );
}