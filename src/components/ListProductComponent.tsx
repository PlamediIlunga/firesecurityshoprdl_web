import ProduitItem from "../types/ProduitItem";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function ListProductComponent({ products }: { products: ProduitItem[] }) {

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
                        <th className="px-4 py-3 text-left text-lg font-semibold">
                            Description
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
                                {/* Colonne Image */}
                                <td className="px-4 py-3 border-r border-yellow-400">
                                    {product.image ? (
                                        <img
                                            src={`/${product.image}`}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <CiImageOn className="w-8 h-8 text-gray-500 mx-auto" />
                                    )}
                                </td>

                                {/* Colonne Nom */}
                                <td className="px-4 py-3 border-r border-yellow-400 text-lg font-medium">
                                    {product.name}
                                </td>

                                {/* Colonne Numéro d'article */}
                                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                                    {product.noArticle}
                                </td>

                                {/* Colonne Points */}
                                <td className="px-4 py-3 border-r border-yellow-400 text-md">
                                    {product.points}
                                </td>

                                {/* Colonne Description */}
                                <td className="px-4 py-3 text-md">
                                    {product.description}
                                </td>

                                <td>
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            to={`/edit-product/${product.idItem}`}
                                            className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
                                        >
                                            Modifier
                                        </Link>
                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-800 transition duration-300"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-4 py-3 text-center text-lg text-gray-500">
                                Aucun produit à afficher pour le moment.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}