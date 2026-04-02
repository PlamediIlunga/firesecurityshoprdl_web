import ProduitItem from "../types/ProduitItem";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import '../styles/listProductComponent.scss';

interface ListProductComponentProps {
  products: ProduitItem[];
  refreshProducts: () => Promise<void>;
}

export default function ListProductComponent({ products, refreshProducts }: ListProductComponentProps) {
  const api_url = import.meta.env.VITE_API_URL;

  const deleteProduct = async (idItem: number) => {
    try {
      const response = await fetch(`${api_url}/api/Item/ArchiveItem/?id=${idItem}`, {
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
      await refreshProducts();
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
    <div className="list-table-wrap">
      <table className="list-table">

        <thead className="list-table__head">
          <tr>
            <th className="list-table__th list-table__th--img">Image</th>
            <th className="list-table__th">Nom</th>
            <th className="list-table__th">N° article</th>
            <th className="list-table__th list-table__th--center">Points</th>
            <th className="list-table__th">Description</th>
            <th className="list-table__th list-table__th--center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.idItem} className={`list-table__row ${index % 2 === 0 ? 'list-table__row--even' : ''}`}>

                <td className="list-table__td list-table__td--img">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      className="list-table__img"
                      alt={product.name}
                    />
                  ) : (
                    <CiImageOn className="list-table__img-placeholder" />
                  )}
                </td>

                <td className="list-table__td list-table__td--name">
                  {product.name}
                </td>

                <td className="list-table__td list-table__td--muted">
                  {product.noArticle}
                </td>

                <td className="list-table__td list-table__td--center">
                  <span className="list-table__badge">{product.points} pts</span>
                </td>

                <td className="list-table__td list-table__td--muted">
                  {product.description}
                </td>

                <td className="list-table__td list-table__td--center">
                  <div className="list-table__actions">
                    <Link to={`/edit-product/${product.idItem}`} className="list-table__btn list-table__btn--edit">
                      Modifier
                    </Link>
                    <button
                      className="list-table__btn list-table__btn--delete"
                      onClick={() => handleDeleteClick(product.idItem)}
                    >
                      Archiver
                    </button>
                  </div>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="list-table__empty">
                Aucun produit à afficher pour le moment.
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}
