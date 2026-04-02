import ProduitItem from '../types/ProduitItem';
import ListProducts from '../components/ListProductComponent';
import { useState, useEffect } from 'react';
import '../styles/Product.scss';

export default function Product() {
  const [products, setProducts] = useState<ProduitItem[]>([]);
  const [product, setProduct] = useState<ProduitItem>({
    idItem: 0,
    noArticle: '',
    name: '',
    points: 0,
    description: '',
    imageUrl: '',
    isArchived: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageUrlError, setImageUrlError] = useState<string | null>(null);
  const api_url = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem('bearerToken');

  const getProducts = async () => {
    if (!token) { console.error('Token manquant.'); return; }
    try {
      setIsLoading(true);
      const response = await fetch(api_url + '/api/Item/GetAllItem', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération des produits');
      const products: ProduitItem[] = await response.json();
      setProducts(products);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
      setProducts([]);
    } finally { setIsLoading(false); }
  };

  useEffect(() => { getProducts(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: name === 'points' ? parseInt(value) || 0 : value }));
    if (name === 'imageUrl') setImageUrlError(null);
  };

  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!url) { resolve(true); return; }
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setImageUrlError(null);
    const isImageValid = await validateImageUrl(product.imageUrl);
    if (!isImageValid) { setImageUrlError("L'URL de l'image est invalide."); return; }
    const token = localStorage.getItem('bearerToken');
    if (!token) { setImageUrlError('Erreur : Token manquant.'); return; }
    try {
      const response = await fetch(api_url + '/api/Item/CreateItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout du produit");
      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);
      setProduct({ idItem: 0, noArticle: '', name: '', points: 0, description: '', imageUrl: '', isArchived: false });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 2000);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      setImageUrlError("Erreur lors de l'ajout du produit.");
    }
  };

  return (
    <div className="product-page">

      {/* EN-TÊTE — fond sombre style Utilisateurs */}
      <header className="product-header">
        <div className="product-header__inner">
          <div className="product-header__eyebrow">
            <span className="product-header__eyebrow-dot">◆</span>
            PANNEAU D'ADMINISTRATION
          </div>
          <h1 className="product-header__title">Produits</h1>
          <div className="gold-rule gold-rule--center" />
          <p className="product-header__subtitle">
            Bienvenue dans la section d'administration. Ajoutez un nouveau produit au catalogue
            ou gérez les articles existants.
          </p>
        </div>
      </header>

      {/* LISTE DES PRODUITS */}
      <section className="product-list-section">
        <div className="product-list-section__inner">
          <p className="section-eyebrow">Inventaire</p>
          <h2 className="section-title">Liste des produits</h2>
          <div className="gold-rule" />
          {isLoading ? (
            <div className="product-loading">
              <svg className="product-loading__spinner" viewBox="0 0 24 24">
                <circle className="product-loading__track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                <path className="product-loading__arc" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span>Chargement des produits...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="product-list">
              <ListProducts products={products} refreshProducts={getProducts} />
            </div>
          ) : (
            <p className="product-empty">Les informations des produits n'ont pas pu être obtenues.</p>
          )}
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="product-form-section">
        <div className="product-form-section__inner">

          <div className="product-form-header">
            <p className="section-eyebrow section-eyebrow--gold">Nouveau produit</p>
            <h2 className="product-form-title">Ajouter un produit</h2>
            <div className="gold-rule" />
          </div>

          <form className="product-form" onSubmit={handleSubmit}>

            {/* COLONNE GAUCHE */}
            <div className="product-form__col">
              <div className="form-field">
                <label htmlFor="name" className="form-field__label">Nom du produit</label>
                <input type="text" id="name" name="name" value={product.name} onChange={handleChange}
                  placeholder="Ex: Bande sur manteau" className="form-field__input" required />
              </div>
              <div className="form-field">
                <label htmlFor="noArticle" className="form-field__label">Numéro d'article</label>
                <input type="text" id="noArticle" name="noArticle" value={product.noArticle} onChange={handleChange}
                  placeholder="Ex: DIV18" className="form-field__input" required />
              </div>
              <div className="form-field">
                <label htmlFor="points" className="form-field__label">Points requis</label>
                <input type="number" id="points" name="points" value={product.points} onChange={handleChange}
                  placeholder="Ex: 18" min="0" className="form-field__input" required />
              </div>
            </div>

            {/* COLONNE DROITE */}
            <div className="product-form__col">
              <div className="form-field form-field--grow">
                <label htmlFor="description" className="form-field__label">Description</label>
                <textarea id="description" name="description" value={product.description} onChange={handleChange}
                  placeholder="Ex: Bande réfléchissante" rows={4}
                  className="form-field__input form-field__input--textarea form-field__input--full" required />
              </div>
              <div className="form-field">
                <label htmlFor="imageUrl" className="form-field__label">URL de l'image</label>
                <input type="text" id="imageUrl" name="imageUrl" value={product.imageUrl} onChange={handleChange}
                  placeholder="Ex: https://example.com/image.jpg" className="form-field__input" />
                {product.imageUrl && (
                  <div className="form-field__preview">
                    <span className="form-field__preview-label">Aperçu</span>
                    <img src={product.imageUrl} alt="Aperçu" className="form-field__preview-img" />
                  </div>
                )}
                {imageUrlError && <p className="form-field__error">{imageUrlError}</p>}
              </div>
            </div>

            {/* BOUTON PLEINE LARGEUR */}
            <div className="product-form__footer">
              <button type="submit" disabled={isSubmitted}
                className={`product-submit-btn ${isSubmitted ? 'product-submit-btn--success' : ''}`}>
                {isSubmitted ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Produit ajouté !
                  </>
                ) : (
                  <>
                    Ajouter le produit
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </section>

    </div>
  );
}