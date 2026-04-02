import Order from "../types/OrderItem";
import OrderComponent from "../components/OrderComponent";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import '../styles/order.scss';

export default function Orders() {
  const api_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("bearerToken");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [decodedToken, setDecodedToken] = useState<{ email: string; role: string; idUser: string } | null>(null);

  useEffect(() => {
    const bearerToken = localStorage.getItem("bearerToken");
    if (bearerToken) {
      try {
        const payload = jwtDecode<{ email: string; role: string; idUser: string }>(bearerToken);
        setDecodedToken(payload);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        setDecodedToken(null);
      }
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!decodedToken) { console.log("decodedToken non défini"); return; }
      try {
        setIsLoading(true);
        if (!token) throw new Error("Vous n'êtes pas connecté");
        const idUser = parseInt(decodedToken.idUser, 10);
        if (isNaN(idUser)) throw new Error("Identifiant utilisateur invalide");

        let response: Response;
        if (decodedToken.role === "User") {
          response = await fetch(`${api_url}/api/Order/GetOrderByUserId/${idUser}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else if (decodedToken.role === "Admin") {
          response = await fetch(`${api_url}/api/Order/GetAllOrders`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          throw new Error("Rôle non reconnu");
        }

        if (!response.ok) throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        const data: Order[] = await response.json();
        console.log("Données brutes de l'API :", data);
        setOrders(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [decodedToken, api_url, token]);

  useEffect(() => {
    console.log("État orders :", orders);
  }, [orders]);

  return (
    <div className="orders-page">

      {/* HEADER — brun foncé identique Home/Contact/Catalogue/Administration */}
      <header className="orders-header">
        <div className="orders-header__inner">
          <span className="orders-header__badge">Historique</span>
          <h1 className="orders-header__title">Mes Commandes</h1>
          <div className="orders-header__rule" />
          <p className="orders-header__subtitle">
            Voici l'historique de vos commandes. Consultez vos achats passés !
          </p>
        </div>
      </header>

      {/* SECTION COMMANDES */}
      <section className="orders-section">
        <div className="orders-section__inner">

          {isLoading ? (
            <div className="orders-loading">
              <svg className="orders-loading__spinner" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.85" />
              </svg>
              <span>Chargement des commandes...</span>
            </div>

          ) : orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.idOrder} className="order-card">

                  <div className="order-card__header">
                    <div className="order-card__header-left">
                      <span className="order-card__eyebrow">Commande</span>
                      <h2 className="order-card__num">#{order.noOrder}</h2>
                    </div>
                    <div className="order-card__header-right">
                      <span className="order-card__date-label">Date</span>
                      <span className="order-card__date">
                        {order.orderDate ? new Date(order.orderDate).toLocaleDateString('fr-CA') : "Date invalide"}
                      </span>
                    </div>
                  </div>

                  <div className="order-card__body">
                    {order.orderitems && order.orderitems.length > 0 ? (
                      order.orderitems.map((orderItem) => (
                        <div key={String(orderItem.idItem)} className="order-item">
                          <OrderComponent orderItem={orderItem} order={order} />
                        </div>
                      ))
                    ) : (
                      <p className="order-card__empty">Aucun article pour cette commande.</p>
                    )}
                  </div>

                </div>
              ))}
            </div>

          ) : (
            <div className="orders-empty">
              <div className="orders-empty__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="orders-empty__text">Aucune commande trouvée.</p>
              <Link to="/Home/Catalogue" className="orders-empty__btn">
                Découvrir nos produits
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
