import ProduitItem from '../types/ProduitItem';
import MyProducts from '../components/ProductComponent';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Product() {
  const api_url = "http://localhost:5007/";
  const [products, setProducts] = useState<ProduitItem[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(api_url + "api/Item/GetAllItem");
        const products: ProduitItem[] = await response.json();
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <div>
        <h1>Produits</h1>
      </div>
      <div className="MyProducts bg-red-900 min-h-screen p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={String(product.idItem)}
                className="AProduct"
                to={`/Products/${product.idItem}`} // Navigation vers la page de détail
              >
                <div className="Product bg-gray-100 text-gray-800 p-6 rounded-lg border-4 border-yellow-400 shadow-lg hover:bg-blue-900 hover:text-white transition duration-300 flex flex-col h-64 w-full">
                  <MyProducts product={product} />
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white text-center col-span-full">Aucun produit disponible</p>
          )}
        </div>
      </div>
    </div>
  );
}