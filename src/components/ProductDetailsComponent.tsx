import ProduitItem from "../types/ProduitItem";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";
import "../styles/ProductDetailsComponent.scss";

interface CartItem extends ProduitItem {
  quantity: number;
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductDetailsComponent({ product }: { product: ProduitItem }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("M");

  const addToCart = () => {
    if (product) {
      const currentCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingIndex = currentCart.findIndex((item) => item.idItem === product.idItem);

      let updatedCart: CartItem[];
      if (existingIndex !== -1) {
        updatedCart = currentCart.map((item, i) =>
          i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...currentCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2500);
    }
  };

  return (
    <div className="pdc">

      {/* IMAGE */}
      <div className="pdc__image-wrap">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="pdc__image"
          />
        ) : (
          <div className="pdc__image-placeholder">
            <CiImageOn className="pdc__image-icon" />
            <span>Aucune image disponible</span>
          </div>
        )}

        {/* Badge numéro d'article */}
        <div className="pdc__article-badge">
          <span className="pdc__article-badge__label">Réf.</span>
          <span className="pdc__article-badge__value">{product.noArticle}</span>
        </div>
      </div>

      {/* DETAILS */}
      <div className="pdc__details">

        {/* Titre */}
        <h2 className="pdc__title">{product.name}</h2>
        <div className="pdc__rule" />

        {/* Points */}
        <div className="pdc__points-block">
          <div className="pdc__points-block__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="pdc__points-block__info">
            <span className="pdc__points-block__label">Points requis</span>
            <span className="pdc__points-block__value">{product.points} pts</span>
          </div>
        </div>

        {/* Taille */}
        <div className="pdc__field">
          <span className="pdc__field__label">Sélectionner la taille</span>
          <div className="pdc__sizes">
            {SIZES.map((size) => (
              <button
                key={size}
                className={`pdc__size-btn${selectedSize === size ? " pdc__size-btn--active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div className="pdc__divider" />

        {/* Description */}
        <div className="pdc__field">
          <span className="pdc__field__label">Spécifications</span>
          <p className="pdc__description">
            {product.description || "Aucune description disponible pour cet article."}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={addToCart}
          disabled={isAddedToCart}
          className={`pdc__cta${isAddedToCart ? " pdc__cta--success" : ""}`}
        >
          {isAddedToCart ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ajouté au panier !
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ajouter au panier
            </>
          )}
        </button>

      </div>
    </div>
  );
}