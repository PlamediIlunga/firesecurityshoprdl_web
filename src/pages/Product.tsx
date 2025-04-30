import ProduitItem from '../types/ProduitItem';
import ListProducts from '../components/ListProductComponent';
import { useState, useEffect } from 'react';

export default function Product() {
  const [products, setProducts] = useState<ProduitItem[]>([]);
  const [product, setProduct] = useState<ProduitItem>({
    idItem: 0,
    noArticle: '',
    name: '',
    points: 0,
    description: '',
    imageUrl: '',
    isArchived: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission success
  const [imageUrlError, setImageUrlError] = useState<string | null>(null); // Track image URL validation error
  const api_url = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem('bearerToken');
    const getProducts = async () => {
      if (!token) {
        console.error('Token manquant.');
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch(api_url + 'api/Item/GetAllItem', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        const products: ProduitItem[] = await response.json();
        setProducts(products);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
  useEffect(() => {
    getProducts();
  }, []);

  // Handle text and textarea inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) || 0 : value,
    }));
    // Clear error when user starts typing in imageUrl
    if (name === 'imageUrl') {
      setImageUrlError(null);
    }
  };

  // Validate image URL by attempting to load it
  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!url) {
        resolve(true); // Empty URL is valid (optional field)
        return;
      }
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setImageUrlError(null); // Reset error state

    // Validate image URL
    const isImageValid = await validateImageUrl(product.imageUrl);
    if (!isImageValid) {
      setImageUrlError('L’URL de l’image est invalide. Veuillez entrer une URL d’image valide.');
      return;
    }

    const token = localStorage.getItem('bearerToken');
    if (!token) {
      console.error('Token manquant.');
      setImageUrlError('Erreur : Token manquant.');
      return;
    }

    try {
      const response = await fetch(api_url + 'api/Item/CreateItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l’ajout du produit');
      }
      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);
      // Reset form and state
      setProduct({
        idItem: 0,
        noArticle: '',
        name: '',
        points: 0,
        description: '',
        imageUrl: '',
        isArchived: false,
      });
      setIsSubmitted(true); // Show success feedback
      setTimeout(() => setIsSubmitted(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Erreur lors de l’ajout du produit :', error);
      setImageUrlError('Erreur lors de l’ajout du produit.');
    }
  };

  return (
    <div className="min-h-screen bg-red-900 text-white">
      {/* En-tête de la page */}
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Administration</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Bienvenue dans la section d’administration. Ajoutez un nouveau produit au catalogue.
        </p>
      </header>

      {/* Section de la liste de produits */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Liste des produits</h2>
          {isLoading ? (
            <div className="text-center text-lg flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-yellow-400"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Chargement des produits...
            </div>
          ) : products.length > 0 ? (
            <div className="space-y-6">
              <ListProducts products={products} refreshProducts={getProducts}/>
            </div>
          ) : (
            <p className="text-center text-lg">
              Les informations des produits n’ont pas pu être obtenues.
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Champ : Nom du produit */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Nom du produit
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Ex: Bande sur manteau"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              {/* Champ : Numéro d'article */}
              <div>
                <label
                  htmlFor="noArticle"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Numéro d'article
                </label>
                <input
                  type="text"
                  id="noArticle"
                  name="noArticle"
                  value={product.noArticle}
                  onChange={handleChange}
                  placeholder="Ex: DIV18"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              {/* Champ : Points */}
              <div>
                <label
                  htmlFor="points"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Points requis
                </label>
                <input
                  type="number"
                  id="points"
                  name="points"
                  value={product.points}
                  onChange={handleChange}
                  placeholder="Ex: 18"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              {/* Champ : Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Ex: Bande réfléchissante"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800 resize-none"
                  required
                />
              </div>

              {/* Champ : URL de l'image */}
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  URL de l’image du produit
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={product.imageUrl}
                  onChange={handleChange}
                  placeholder="Ex: https://example.com/image.jpg"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                />
                {product.imageUrl && (
                  <p className="mt-2 text-sm text-gray-600">
                    Aperçu :{' '}
                    <img
                      src={product.imageUrl}
                      alt="Aperçu"
                      className="h-20 w-20 object-cover mt-2"
                    />
                  </p>
                )}
                {imageUrlError && (
                  <p className="mt-2 text-sm text-red-600">{imageUrlError}</p>
                )}
              </div>

              {/* Bouton Ajouter */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition duration-300 ${
                    isSubmitted
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-yellow-400 text-gray-800 hover:bg-yellow-500'
                  }`}
                >
                  {isSubmitted ? 'Produit ajouté !' : 'Ajouter le produit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}