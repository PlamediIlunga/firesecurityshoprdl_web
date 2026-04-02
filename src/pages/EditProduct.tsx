import ProduitItem from '../types/ProduitItem';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/editProduct.scss';

export default function EditProduct() {
  const [product, setProduct] = useState<ProduitItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageUrlError, setImageUrlError] = useState<string | null>(null);
  const { idItem } = useParams<{ idItem?: string }>();
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getProductById = async () => {
      const token = localStorage.getItem('bearerToken');
      if (idItem) {
        try {
          setIsLoading(true);
          const response = await fetch(api_url + `/api/Item/GetItemById/${idItem}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Erreur lors de la récupération du produit');
          const product: ProduitItem = await response.json();
          setProduct(product);
        } catch (error) {
          console.error('Erreur lors de la récupération du produit :', error);
          setProduct(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getProductById();
  }, [idItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      if (!prev) return null;
      return { ...prev, [name]: name === 'points' ? parseInt(value) || 0 : value } as ProduitItem;
    });
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
    if (!product) { setImageUrlError('Aucun produit à modifier.'); return; }
    const isImageValid = await validateImageUrl(product.imageUrl);
    if (!isImageValid) { setImageUrlError("L'URL de l'image est invalide."); return; }
    try {
      const token = localStorage.getItem('bearerToken');
      if (!token) { setImageUrlError('Erreur : Token manquant.'); return; }
      const response = await fetch(`${api_url}/api/Item/UpdateItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du produit');
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      setImageUrlError('Erreur lors de la mise à jour du produit.');
    }
  };

  return (
    <div className="edit-product-page">

      {/* EN-TÊTE — fond sombre */}
      <header className="edit-product-header">
        <div className="edit-product-header__inner">
          <div className="edit-product-header__eyebrow">
            <span className="edit-product-header__eyebrow-dot">◆</span>
            PANNEAU D'ADMINISTRATION
          </div>
          <h1 className="edit-product-header__title">
            {product ? product.name : 'Modifier le produit'}
          </h1>
          <div className="gold-rule gold-rule--center" />
          <p className="edit-product-header__subtitle">
            Modifiez les informations du produit et enregistrez les changements.
          </p>
        </div>
      </header>

      {/* CONTENU */}
      <section className="edit-product-section">
        <div className="edit-product-section__inner">

          {isLoading ? (
            <div className="ep-loading">
              <svg className="ep-loading__spinner" viewBox="0 0 24 24">
                <circle className="ep-loading__track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                <path className="ep-loading__arc" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span>Chargement du produit...</span>
            </div>
          ) : product ? (

            <form className="ep-form" onSubmit={handleSubmit}>

              {/* ── SECTION : Identification ── */}
              <div className="ep-form__section">
                <p className="ep-form__section-label">Identification</p>
                <div className="ep-form__grid">
                  <div className="form-field">
                    <label htmlFor="name" className="form-field__label">Nom du produit</label>
                    <input
                      type="text" id="name" name="name"
                      value={product.name ?? ''}
                      onChange={handleChange}
                      placeholder="Ex: Bande sur manteau"
                      className="form-field__input"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="noArticle" className="form-field__label">Numéro d'article</label>
                    <input
                      type="text" id="noArticle" name="noArticle"
                      value={product.noArticle ?? ''}
                      onChange={handleChange}
                      placeholder="Ex: DIV18"
                      className="form-field__input"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ── SECTION : Détails ── */}
              <div className="ep-form__section">
                <p className="ep-form__section-label">Détails</p>
                <div className="ep-form__grid ep-form__grid--full">
                  <div className="form-field">
                    <label htmlFor="points" className="form-field__label">Points requis</label>
                    <input
                      type="number" id="points" name="points"
                      value={product.points ?? 0}
                      onChange={handleChange}
                      placeholder="Ex: 18"
                      min="0"
                      className="form-field__input ep-form__points"
                      required
                    />
                  </div>
                </div>
                <div className="ep-form__grid ep-form__grid--full">
                  <div className="form-field">
                    <label htmlFor="description" className="form-field__label">Description</label>
                    <textarea
                      id="description" name="description"
                      value={product.description ?? ''}
                      onChange={handleChange}
                      placeholder="Ex: Bande réfléchissante"
                      rows={4}
                      className="form-field__input form-field__input--textarea"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ── SECTION : Image ── */}
              <div className="ep-form__section">
                <p className="ep-form__section-label">Image</p>
                <div className="ep-form__grid ep-form__grid--full">
                  <div className="form-field">
                    <label htmlFor="imageUrl" className="form-field__label">URL de l'image</label>
                    <input
                      type="text" id="imageUrl" name="imageUrl"
                      value={product.imageUrl ?? ''}
                      onChange={handleChange}
                      placeholder="Ex: https://example.com/image.jpg"
                      className={`form-field__input${imageUrlError ? ' form-field__input--error' : ''}`}
                    />
                    {imageUrlError && <p className="form-field__error">{imageUrlError}</p>}
                    {product.imageUrl && !imageUrlError && (
                      <div className="form-field__preview">
                        <span className="form-field__preview-label">Aperçu</span>
                        <img src={product.imageUrl} alt="Aperçu" className="form-field__preview-img" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── FOOTER bouton ── */}
              <div className="ep-form__footer">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`ep-submit-btn${isSubmitted ? ' ep-submit-btn--success' : ''}`}
                >
                  {isSubmitted ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Produit modifié !
                    </>
                  ) : (
                    <>
                      Enregistrer les modifications
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>

            </form>

          ) : (
            <p className="ep-empty">Les informations du produit n'ont pas pu être obtenues.</p>
          )}
        </div>
      </section>

    </div>
  );
}