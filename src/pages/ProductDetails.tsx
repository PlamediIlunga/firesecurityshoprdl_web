import ProduitItem from '../types/ProduitItem';
import MyProduct from '../components/ProductDetailsComponent';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import casePostalBD from '../datas/casePostaleBD_Mock.json';

// Étendre l'interface ProduitItem pour inclure la quantité
interface CartItem extends ProduitItem {
  quantity: number;
}

export default function ProductDetail() {
  //const api_url = "http://localhost:5007/";
  const [product, setProduct] = useState<ProduitItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddedToCart, setIsAddedToCart] = useState(false); // État pour indiquer si le produit est ajouté au panier
  const { idItem } = useParams<{ idItem?: string }>();

  useEffect(() => {
    const getProductById = async () => {
      if (idItem) {
        try {
          setIsLoading(true);
          /*const response = await fetch(`${api_url}api/Item/GetItemById?id=${idItem}`);
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération du produit");
          }
          const product: ProduitItem = await response.json();
          setProduct(product);*/
          // temporaire
          const foundProduct = casePostalBD.Products.find(product => product.idItem === parseInt(idItem, 10));
          if (foundProduct) {
            setProduct(
              foundProduct // Map imageUrl to image
            );
          } else {
            setProduct(null);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du produit :", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getProductById();
  }, [idItem]);

  // Fonction pour ajouter au panier
  const addToCart = () => {
    if (product) {
      // Récupérer le panier actuel depuis localStorage
      const currentCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Vérifier si le produit existe déjà dans le panier
      const existingProductIndex = currentCart.findIndex(item => item.idItem === product.idItem);
      
      let updatedCart: CartItem[];
      if (existingProductIndex !== -1) {
        // Si le produit existe, augmenter sa quantité
        updatedCart = currentCart.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        // Si le produit n'existe pas, l'ajouter avec une quantité de 1
        const productWithQuantity: CartItem = { ...product, quantity: 1 };
        updatedCart = [...currentCart, productWithQuantity];
      }

      // Mettre à jour localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setIsAddedToCart(true);
      // Réinitialiser l'état après 2 secondes pour permettre un nouvel ajout
      setTimeout(() => setIsAddedToCart(false), 2000);
    }
  };

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
            <div className="bg-gray-100 text-gray-800 p-8 rounded-lg border-4 border-yellow-400 shadow-2xl flex flex-col md:flex-row gap-8">
              {/* Image du produit */}
              <div className="md:w-1/2">
                {product.imageUrl ? (
                  <img
                    src={`/${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                    <span className="text-gray-500 text-xl">Aucune image disponible</span>
                  </div>
                )}
              </div>

              {/* Détails du produit */}
              <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                  <MyProduct product={product} />
                </div>

                {/* Bouton Ajouter au panier */}
                <div className="mt-6">
                  <button
                    onClick={addToCart}
                    disabled={isAddedToCart}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition duration-300 ${
                      isAddedToCart
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-yellow-400 text-gray-800 hover:bg-yellow-500'
                    }`}
                  >
                    {isAddedToCart ? 'Ajouté au panier !' : 'Ajouter au panier'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-lg">Produit non trouvé.</p>
          )}
        </div>
      </section>
    </div>
  );
}