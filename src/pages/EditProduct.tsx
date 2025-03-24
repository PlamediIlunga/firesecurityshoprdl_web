import ProduitItem from '../types/ProduitItem';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import casePostalBD from '../datas/casePostaleBD_Mock.json';

export default function EditProduct() {
  const [product, setProduct] = useState<ProduitItem | null>(null);
  const [formData, setFormData] = useState<Partial<ProduitItem>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { idItem } = useParams<{ idItem?: string }>();

  // Charger le produit au montage
  useEffect(() => {
    const getProductById = async () => {
      if (idItem) {
        try {
          setIsLoading(true);
          /*const response = await fetch(api_url + "api/User/GetAllUser");
                if (!response.ok) {
                  throw new Error("Erreur lors de la récupération des utilisateurs");
                }
                const users: UserItem[] = await response.json();
                setUsers(users);*/
          // Simulation avec les données mockées
          const foundProduct = casePostalBD.ListeProduit.find(
            (product) => product.idItem === parseInt(idItem, 10)
          );
          if (foundProduct) {
            setProduct(foundProduct);
            // Initialiser formData avec les valeurs du produit
            setFormData(foundProduct);
          } else {
            setProduct(null);
          }
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestionnaire pour le champ fichier (image)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file), // Aperçu temporaire de l'image
      }));
    }
  };

  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Produit modifié :", formData);
    // Ici, tu peux envoyer formData à ton API pour mettre à jour le produit
    // Exemple : fetch(`${api_url}api/Item/UpdateItem`, { method: 'PUT', body: JSON.stringify(formData) })
  };

  return (
    <div className="min-h-screen bg-red-900 text-white">
      {/* En-tête de la page */}
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Administration</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Bienvenue dans la section de modification d'un produit, vous pouvez
          modifier les informations du produit.
        </p>
      </header>

      {/* Section du formulaire */}
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
                Modifier : {formData.name}
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
                    value={formData.name || ""}
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
                    value={formData.noArticle || ""}
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
                    value={formData.points || 0}
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
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Ex: Bande réfléchissante"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800 resize-none"
                    required
                  />
                </div>

                {/* Champ : Image */}
                <div>
                  <label
                    htmlFor="image"
                    className="block text-lg font-semibold text-gray-700 mb-2"
                  >
                    Image du produit
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-800"
                  />
                  {formData.imageUrl && (
                    <p className="mt-2 text-sm text-gray-600">
                      Image actuelle :{" "}
                      <img
                        src={formData.imageUrl}
                        alt="Aperçu"
                        className="h-20 w-20 object-cover mt-2"
                      />
                    </p>
                  )}
                </div>

                {/* Bouton Modifier */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg font-semibold text-lg transition duration-300 bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                  >
                    Modifier le produit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p className="text-center text-lg">
              Les informations du produit n'ont pas pu être obtenues.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}