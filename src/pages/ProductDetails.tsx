import ProduitItem from '../types/ProduitItem';
import MyProducts from '../components/ProductComponent';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const api_url = "http://localhost:5007/";
  const [product, setProduct] = useState<ProduitItem | null>(null);
  const { idItem } = useParams<{ idItem?: string }>(); // Récupère l'id depuis l'URL

  useEffect(() => {
    const getProductById = async () => {
      if (idItem) {
        try {
          const response = await fetch(`${api_url}api/Item/GetItemById?id=${idItem}`);
          const product: ProduitItem = await response.json();
          setProduct(product);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getProductById();
  }, [idItem]);

  return (
    <div>
      <div>
        <h1>Détail du produit</h1>
      </div>
      <div className="MyProducts bg-red-900 min-h-screen p-6 flex items-center justify-center">
        {product ? (
          <div className="Product bg-gray-100 text-gray-800 p-6 rounded-lg border-4 border-yellow-400 shadow-lg flex flex-col h-64 w-full">
            <MyProducts product={product} />
          </div>
        ) : (
          <p className="text-white">Chargement...</p>
        )}
      </div>
    </div>
  );
}