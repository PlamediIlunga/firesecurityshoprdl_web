import ProduitItem from '../types/ProduitItem';
import MyProduct from '../components/ProductDetailsComponent';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetail.scss';

export default function ProductDetail() {
  const api_url = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState<ProduitItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { idItem } = useParams<{ idItem?: string }>();

  useEffect(() => {
    const getProductById = async () => {
      const token = localStorage.getItem('bearerToken');
      if (!token) {
        console.error("Token non trouvé dans le localStorage");
        setIsLoading(false);
        return;
      }

      if (idItem) {
        try {
          setIsLoading(true);
          const response = await fetch(`${api_url}/api/Item/GetItemById/${idItem}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error("Erreur lors de la récupération du produit");
          const data: ProduitItem = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Erreur lors de la récupération du produit :", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getProductById();
  }, [idItem, api_url]);

  return (
    <div className="detail-page">

      {/* HEADER */}
      <header className="detail-header">
        <div className="detail-header__inner">
          <span className="detail-header__badge">Équipement pompier</span>
          <h1 className="detail-header__title">Détail du Produit</h1>
          <div className="detail-header__rule" />
          <p className="detail-header__subtitle">
            Découvrez tous les détails de cet équipement ou vêtement disponible pour les pompiers de Rivière-du-Loup.
          </p>
        </div>
      </header>

      {/* CONTENT */}
      <section className="detail-section">
        <div className="detail-section__inner">
          {isLoading ? (
            <div className="detail-loader">
              <div className="detail-loader__spinner" />
              <span className="detail-loader__text">Chargement du produit…</span>
            </div>
          ) : product ? (
            <MyProduct product={product} />
          ) : (
            <div className="detail-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <p>Produit introuvable.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}