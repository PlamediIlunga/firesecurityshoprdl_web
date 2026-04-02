import ProduitItem from '../types/ProduitItem';
import KartProductComponent from '../components/KartProductComponent';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/kart.scss';

interface CartItem extends ProduitItem {
  quantity: number;
}

export default function Kart() {
  const api_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('bearerToken');
  const [products, setProducts] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [decodedToken, setDecodedToken] = useState<{ email: string; role: string; idUser: string } | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        setProducts(cartItems);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits du panier :', error);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();

    const bearerToken = localStorage.getItem('bearerToken');
    if (bearerToken) {
      try {
        const payload = jwtDecode<{ email: string; role: string; idUser: string }>(bearerToken);
        setDecodedToken(payload);
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        setDecodedToken(null);
      }
    }
  }, []);

  const totalPoints = products.reduce((sum, p) => sum + p.points * p.quantity, 0);

  const increaseQuantity = (idItem: number) => {
    const updated = products.map(p => p.idItem === idItem ? { ...p, quantity: p.quantity + 1 } : p);
    setProducts(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const decreaseQuantity = (idItem: number) => {
    const updated = products.map(p =>
      p.idItem === idItem && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
    );
    setProducts(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeProduct = (idItem: number) => {
    const updated = products.filter(p => p.idItem !== idItem);
    setProducts(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleCommand = async () => {
    if (orderProcessing) return;
    try {
      setOrderProcessing(true);

      if (!decodedToken?.idUser) throw new Error("Vous n'êtes pas connecté ou votre session a expiré");
      const idUser = parseInt(decodedToken.idUser, 10);
      if (isNaN(idUser)) throw new Error('Identifiant utilisateur invalide');
      if (products.length === 0) throw new Error('Votre panier est vide');

      const noOrder = Math.floor(Date.now() / 1000);
      const orderItems = products.map(p => ({
        idItem: p.idItem,
        quantityBought: p.quantity,
        totalPointPaid: p.points * p.quantity,
      }));
      const orderData = {
        noOrder,
        orderDate: new Date().toISOString().split('T')[0],
        idUser,
        orderitems: orderItems,
      };

      const response = await fetch(`${api_url}/api/Order/CreateOrder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        let msg = 'Erreur lors de la validation de la commande';
        try { const e = await response.json(); msg = e.message || e.title || msg; } catch {}
        throw new Error(msg);
      }

      const result = await response.json();
      localStorage.removeItem('cart');
      setProducts([]);
      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 4000);
      alert(`Commande #${result.noOrder} validée avec succès !`);
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      alert(`${error instanceof Error ? error.message : 'Une erreur est survenue'}`);
    } finally {
      setOrderProcessing(false);
    }
  };

  return (
    <div className="kart-page">

      {/* HEADER */}
      <header className="kart-header">
        <div className="kart-header__inner">
          <span className="kart-header__badge">Échange de points</span>
          <h1 className="kart-header__title">Mon Panier</h1>
          <div className="kart-header__rule" />
          <p className="kart-header__subtitle">
            Voici les articles que vous avez sélectionnés. Validez votre panier pour échanger vos points !
          </p>
        </div>
      </header>

      {/* SECTION PANIER */}
      <section className="kart-section">
        <div className="kart-section__inner">

          {isLoading ? (
            <div className="kart-loader">
              <div className="kart-loader__spinner" />
              <span className="kart-loader__text">Chargement du panier…</span>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="kart-list">
                {products.map(product => (
                  <div key={String(product.idItem)} className="kart-item">

                    <div className="kart-item__product">
                      <KartProductComponent product={product} />
                    </div>

                    <div className="kart-item__controls">

                      <div className="kart-item__pts">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {product.points * product.quantity} pts
                      </div>

                      <div className="kart-item__qty">
                        <button
                          className="kart-item__qty-btn"
                          onClick={() => decreaseQuantity(product.idItem)}
                          disabled={product.quantity <= 1}
                          aria-label="Diminuer"
                        >−</button>
                        <span className="kart-item__qty-val">{product.quantity}</span>
                        <button
                          className="kart-item__qty-btn"
                          onClick={() => increaseQuantity(product.idItem)}
                          aria-label="Augmenter"
                        >+</button>
                      </div>

                      <button
                        className="kart-item__remove"
                        onClick={() => removeProduct(product.idItem)}
                        aria-label="Retirer du panier"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Retirer
                      </button>

                    </div>
                  </div>
                ))}
              </div>

              <div className="kart-summary">
                <div className="kart-summary__total">
                  <span className="kart-summary__total-label">Total</span>
                  <span className="kart-summary__total-value">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {totalPoints} points
                  </span>
                </div>
                <button
                  className={`kart-summary__btn${orderProcessing ? ' kart-summary__btn--loading' : ''}${orderSuccess ? ' kart-summary__btn--success' : ''}`}
                  onClick={handleCommand}
                  disabled={orderProcessing}
                >
                  {orderProcessing ? (
                    <>
                      <span className="kart-summary__btn-spinner" />
                      Traitement en cours…
                    </>
                  ) : orderSuccess ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Commande validée !
                    </>
                  ) : (
                    <>
                      Valider le panier
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="kart-empty">
              <div className="kart-empty__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="kart-empty__title">Votre panier est vide.</p>
              <span className="kart-empty__sub">Parcourez le catalogue pour échanger vos points !</span>
              <Link to="/Home/Catalogue" className="kart-empty__btn">
                Découvrir le catalogue
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}