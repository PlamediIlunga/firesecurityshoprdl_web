import ProduitItem from '../types/ProduitItem';
import MyProducts from '../components/ProductComponent';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/catalogue.scss';

export default function Catalogue() {
  const [products, setProducts] = useState<ProduitItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getProducts = async () => {
      const token = localStorage.getItem('bearerToken');
      if (!token) {
        console.error("Token non trouvé dans le localStorage");
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch(`${api_url}/api/Item/GetAllItem`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }
        const products: ProduitItem[] = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="catalogue-page">

      {/* HEADER */}
      <header className="catalogue-header">
        <div className="catalogue-header__inner">
          <p className="section-eyebrow">Notre sélection</p>
          <h1 className="catalogue-header__title">Catalogue des Produits</h1>
          <div className="gold-rule gold-rule--center" />
          <p className="catalogue-header__subtitle">
            Découvrez notre sélection d'équipements et de vêtements pour les pompiers de Rivière-du-Loup.
            Échangez vos points pour des produits de qualité adaptés à vos besoins !
          </p>
        </div>

        {/* FILTRE CATÉGORIE */}
        <div className="catalogue-filter">
          <div className="catalogue-filter__wrap">
            <select
              onChange={handleCategoryChange}
              className="catalogue-filter__select"
            >
              <option value="">Toutes les catégories</option>
              <option value="Vêtements">Vêtements</option>
              <option value="Équipements">Équipements</option>
              <option value="Accessoires">Accessoires</option>
              <option value="Autres">Autres</option>
            </select>
            <svg className="catalogue-filter__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {selectedCategory && (
            <span className="catalogue-filter__tag">
              {selectedCategory}
              <button className="catalogue-filter__tag-clear" onClick={() => setSelectedCategory('')}>✕</button>
            </span>
          )}
        </div>
      </header>

      {/* GRILLE PRODUITS */}
      <section className="catalogue-section">
        <div className="catalogue-section__inner">
          {isLoading ? (
            <div className="catalogue-loading">
              <svg className="catalogue-loading__spinner" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.85" />
              </svg>
              <span>Chargement des produits...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="catalogue-grid">
              {products.map((product) => (
                <Link
                  key={String(product.idItem)}
                  to={`/Products/${product.idItem}`}
                  className="catalogue-card"
                >
                  <MyProducts product={product} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="catalogue-empty">Aucun produit disponible pour le moment.</p>
          )}
        </div>
      </section>

    </div>
  );
}
