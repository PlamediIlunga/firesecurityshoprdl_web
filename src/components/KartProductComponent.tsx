import ProduitItem from "../types/ProduitItem";
import { CiImageOn } from "react-icons/ci";
import '../styles/KartProductComponent.scss';

export default function KartProductComponent({ product }: { product: ProduitItem }) {
  return (
    <div className="kart-product">

      {/* Miniature */}
      <div className="kart-product__thumb">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="kart-product__img"
          />
        ) : (
          <div className="kart-product__no-img">
            <CiImageOn />
          </div>
        )}
      </div>

      {/* Infos texte */}
      <div className="kart-product__info">
        <p className="kart-product__name">{product.name}</p>
        <div className="kart-product__meta">
          <span className="kart-product__article">#{product.noArticle}</span>
          <span className="kart-product__sep">·</span>
          <span className="kart-product__unit">{product.points} pts / unité</span>
        </div>
        {product.description && (
          <p className="kart-product__desc">{product.description}</p>
        )}
      </div>

    </div>
  );
}