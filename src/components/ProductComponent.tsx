import ProduitItem from "../types/ProduitItem";
import { CiImageOn } from "react-icons/ci";
import '../styles/ProductComponent.scss';

export default function ProductComponent({ product }: { product: ProduitItem }) {
  return (
    <div className="product-card">

      {/* MOITIÉ HAUTE — beige, image plein format */}
      <div className="product-card__top">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-card__img"
          />
        ) : (
          <CiImageOn className="product-card__placeholder" />
        )}
      </div>

      {/* MOITIÉ BASSE — chocolat, textes centrés */}
      <div className="product-card__bottom">
        <p className="product-card__name">{product.name}</p>
        <div className="product-card__meta">
          <span className="product-card__badge">{product.points} pts</span>
          <span className="product-card__article">#{product.noArticle}</span>
        </div>
        <p className="product-card__desc">{product.description}</p>
      </div>

    </div>
  );
}
