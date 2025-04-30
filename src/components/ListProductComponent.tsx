import ProduitItem from "../types/ProduitItem";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router-dom";

interface ListProductComponentProps {
  products: ProduitItem[];
  refreshProducts: () => Promise<void>;
}

export default function ListProductComponent({ products, refreshProducts }: ListProductComponentProps) {
  const api_url = import.meta.env.VITE_API_URL;

  const deleteProduct = async (idItem: number) => {
    try {
      const response = await fetch(`${api_url}api/Item/ArchiveItem/?id=${idItem}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur d'archivage: ${response.status} ${response.statusText}`);
      }

      console.log(`Produit ${idItem} archivé avec succès`);
      await refreshProducts(); // Rafraîchir la liste
    } catch (error) {
      console.error("Erreur lors de l'archivage du produit:", error);
      alert(`Erreur: ${error}`);
    }
  };

  const handleDeleteClick = (idItem: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir archiver ce produit ?")) {
      deleteProduct(idItem);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border-4 border-yellow-400">
        {/* En-tête du tableau */}
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Image
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Nom
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Numéro d'article
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Points
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold border-r border-yellow-400">
              Description
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        {/* Corps du tableau */}
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.idItem}
                className="bg-gray-100 text-gray-800 border-t-2 border-yellow-400 transition duration-300 hover:bg-blue-900 hover:text-white"
              >
                <td className="px-4 py-3 border-r border-yellow-400">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      className="w-16 h-16 object-cover rounded-lg"
                      alt={product.name}
                    />
                  ) : (
                    <CiImageOn className="w-8 h-8 text-gray-500 mx-auto" />
                  )}
                </td>
                <td className="px-4 py-3 border-r border-yellow-400 text-lg font-medium">
                  {product.name}
                </td>
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {product.noArticle}
                </td>
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {product.points}
                </td>
                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                  {product.description}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4">
                    <Link
                      to={`/edit-product/${product.idItem}`}
                      className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
                    >
                      Modifier
                    </Link>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-800 transition duration-300"
                      onClick={() => handleDeleteClick(product.idItem)}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-3 text-center text-lg text-gray-500">
                Aucun produit à afficher pour le moment.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}