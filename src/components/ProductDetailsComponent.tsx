import ProduitItem from "../types/ProduitItem";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";

interface CartItem extends ProduitItem {
  quantity: number;
}

export default function ProductDetailsComponent({ product }: { product: ProduitItem }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const addToCart = () => {
    if (product) {
      const currentCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProductIndex = currentCart.findIndex(item => item.idItem === product.idItem);

      let updatedCart: CartItem[];
      if (existingProductIndex !== -1) {
        updatedCart = currentCart.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        const productWithQuantity: CartItem = { ...product, quantity: 1 };
        updatedCart = [...currentCart, productWithQuantity];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Image du produit à gauche */}
      <div className="md:w-1/3">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
            <CiImageOn className="text-6xl text-gray-400" />
            <span className="text-gray-500 text-xl ml-2">Aucune image disponible</span>
          </div>
        )}
      </div>

      {/* Détails du produit et bouton à droite */}
      <div className="md:w-2/3 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase">
            {product.name}
          </h2>
          <p className="text-lg mb-2">
            <span className="font-semibold">Numéro d'article :</span> {product.noArticle}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Points requis :</span>{' '}
            <span className="text-yellow-600">{product.points}</span>
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Tailles :</span>{' '}
            <span className="text-yellow-600">
              <select className="text-yellow-600">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </span>
          </p>
          <h3 className="text-xl font-semibold text-yellow-600 mt-4 mb-2">
            Spécifications
          </h3>
          <p className="text-md">{product.description || "Aucune description disponible."}</p>
        </div>
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
  );
}