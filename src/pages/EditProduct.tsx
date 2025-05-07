import ProduitItem from '../types/ProduitItem';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditProduct() {
  const [product, setProduct] = useState<ProduitItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission success
  const [imageUrlError, setImageUrlError] = useState<string | null>(null); // Track image URL validation error
  const { idItem } = useParams<{ idItem?: string }>();
  
  //const api_url = import.meta.env.VITE_API_URL;
  const api_url = 'http://localhost:5007/'
  // Charger le produit au montage
  useEffect(() => {
    const getProductById = async () => {
      const token = localStorage.getItem('bearerToken');
      if (idItem) {
        try {
          setIsLoading(true);
          const response = await fetch(api_url + `api/Item/GetItemById/${idItem}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des utilisateurs");
          }
          const product: ProduitItem = await response.json();
          setProduct(product);
        } catch (error) {
          console.error("Erreur lors de la récupération du produit :", error);
          setProduct(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getProductById();
  }, [idItem]);

  // Gestionnaire pour les champs texte et textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: name === 'points' ? parseInt(value) || 0 : value,
      } as ProduitItem;
    });
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

  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setImageUrlError(null); // Reset error state

    if (!product) {
      console.error('Aucun produit à modifier');
      setImageUrlError('Aucun produit à modifier.');
      return;
    }

    // Validate image URL
    const isImageValid = await validateImageUrl(product.imageUrl);
    if (!isImageValid) {
      setImageUrlError('L’URL de l’image est invalide. Veuillez entrer une URL d’image valide.');
      return;
    }

    try {
      const token = localStorage.getItem('bearerToken');
      if (!token) {
        console.error('Token manquant.');
        setImageUrlError('Erreur : Token manquant.');
        return;
      }
      const response = await fetch(`${api_url}api/Item/UpdateItem`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du produit');
      }
      console.log('Produit mis à jour avec succès');
      setIsSubmitted(true); // Show success feedback
      setTimeout(() => setIsSubmitted(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      setImageUrlError('Erreur lors de la mise à jour du produit.');
    }
  };

  return (
    <div className="min-h-screen bg-red-900 text-white">
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Administration</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Bienvenue dans la section de modification d’un produit, vous pouvez
          modifier les informations du produit.
        </p>
      </header>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
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
              Chargement du produit...
            </div>
          ) : product ? (
            <div className="bg-gray-100 text-gray-800 p-8 rounded-lg border-4 border-yellow-400 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Modifier : {product.name}
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                    value={product.name ?? ''}
                    onChange={handleChange}
                    placeholder="Ex: Bande sur manteau"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

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
                    value={product.noArticle ?? ''}
                    onChange={handleChange}
                    placeholder="Ex: DIV18"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

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
                    value={product.points ?? 0}
                    onChange={handleChange}
                    placeholder="Ex: 18"
                    min="0"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                    required
                  />
                </div>

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
                    value={product.description ?? ''}
                    onChange={handleChange}
                    placeholder="Ex: Bande réfléchissante"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800 resize-none"
                    required
                  />
                </div>

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
                    value={product.imageUrl ?? ''}
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
                    {isSubmitted ? 'Produit modifié !' : 'Modifier le produit'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p className="text-center text-lg">
              Les informations du produit n’ont pas pu être obtenues.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}