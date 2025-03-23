import ProduitItem from '../types/ProduitItem';
import KartProduct from '../components/ProductComponent';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import casePostalBD from '../datas/casePostaleBD_Mock.json';

// Étendre l'interface ProduitItem pour inclure la quantité
interface CartItem extends ProduitItem {
  quantity: number;
}

export default function Kart() {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        // Récupérer les produits depuis localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        // Si le panier est vide dans localStorage, charger les données par défaut
        if (cartItems.length === 0) {
          const defaultProducts = casePostalBD.Panier.map(product => ({
            idItem: product.idItem,
            noArticle: product.noArticle,
            name: product.name,
            points: product.points,
            description: product.description,
            image: product.imageUrl,
            quantity: 1, // Ajouter une quantité initiale de 1
          }));
          setProducts(defaultProducts);
          localStorage.setItem('cart', JSON.stringify(defaultProducts));
        } else {
          setProducts(cartItems);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des produits du panier :", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  // Calculer le total des points (points × quantité)
  const totalPoints = products.reduce((sum, product) => sum + (product.points * product.quantity), 0);

  // Fonction pour augmenter la quantité
  const increaseQuantity = (idItem: number) => {
    const updatedProducts = products.map(product => {
      if (product.idItem === idItem) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
  };

  // Fonction pour diminuer la quantité
  const decreaseQuantity = (idItem: number) => {
    const updatedProducts = products.map(product => {
      if (product.idItem === idItem && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
  };

  // Fonction pour retirer un produit du panier et de localStorage
  const removeProduct = (idItem: number) => {
    const updatedProducts = products.filter(product => product.idItem !== idItem);
    setProducts(updatedProducts);
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
  };

  return (
    <div className="min-h-screen bg-red-900 text-white">
      {/* En-tête du panier */}
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Mon Panier d'Achat
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Voici les articles que vous avez sélectionnés. Validez votre panier pour échanger vos points !
        </p>
      </header>

      {/* Section des produits du panier */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <p className="text-center text-lg">Chargement du panier...</p>
          ) : products.length > 0 ? (
            <>
              {/* Liste des produits */}
              <div className="space-y-6">
                {products.map((product) => (
                  <div
                    key={String(product.idItem)}
                    className="bg-gray-100 text-gray-800 p-6 rounded-lg border-4 border-yellow-400 shadow-lg flex items-center justify-between transition duration-300 hover:bg-blue-900 hover:text-white"
                  >
                    {/* Contenu du produit */}
                    <div className="flex items-center space-x-4">
                      <KartProduct product={product} />
                    </div>

                    {/* Points, quantité et bouton Retirer */}
                    <div className="flex items-center space-x-4">
                      {/* Contrôle de la quantité */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => decreaseQuantity(product.idItem)}
                          disabled={product.quantity <= 1}
                          className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300 disabled:bg-yellow-200 disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <span className="text-lg font-semibold">{product.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(product.idItem)}
                          className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
                        >
                          +
                        </button>
                      </div>

                      {/* Points (points × quantité) */}
                      <p className="text-lg font-semibold">{product.points * product.quantity} points</p>

                      {/* Bouton Retirer */}
                      <button
                        onClick={() => removeProduct(product.idItem)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-800 transition duration-300"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total et bouton de validation */}
              <div className="mt-8 flex justify-between items-center bg-gray-800 p-6 rounded-lg border-4 border-yellow-400">
                <p className="text-xl font-bold">
                  Total : <span className="text-yellow-400">{totalPoints} points</span>
                </p>
                <Link
                  to="/checkout"
                  className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
                >
                  Valider le panier
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-lg">Votre panier est vide pour le moment.</p>
          )}
        </div>
      </section>
    </div>
  );
}