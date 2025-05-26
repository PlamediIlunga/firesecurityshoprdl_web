import Order from "../types/OrderItem";
import OrderComponent from "../components/OrderComponent";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Orders() {
  const api_url = import.meta.env.VITE_API_URL ; // Utiliser l'URL de l'API depuis les variables d'environnement
  //const api_url = "http://localhost:5007/";
  const token = localStorage.getItem("bearerToken");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [decodedToken, setDecodedToken] = useState<{ email: string; role: string; idUser: string } | null>(null);

  // Décoder le token une seule fois au montage
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
  }, []); // Dépendance vide pour exécuter une seule fois au montage

  // Récupérer les commandes après le décodage du token
  useEffect(() => {
    const fetchOrders = async () => {
      if (!decodedToken) {
        console.log("decodedToken non défini");
        return;
      }

      try {
        setIsLoading(true);
        if (!token) {
          throw new Error("Vous n'êtes pas connecté");
        }

        const idUser = parseInt(decodedToken.idUser, 10);
        if (isNaN(idUser)) {
          throw new Error("Identifiant utilisateur invalide");
        }

        let response: Response;
        if (decodedToken.role === "User") {
          response = await fetch(`${api_url}api/Order/GetOrderByUserId/${idUser}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else if (decodedToken.role === "Admin") {
          response = await fetch(`${api_url}api/Order/GetAllOrders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          throw new Error("Rôle non reconnu");
        }

        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        }

        const data: Order[] = await response.json();
        console.log("Données brutes de l'API :", data); // Vérifier les données exactes
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

  // Débogage de l'état après mise à jour
  useEffect(() => {
    console.log("État orders :", orders);
  }, [orders]);

  return (
    <div className="min-h-screen bg-red-900 text-white">
      {/* En-tête des commandes */}
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Mes Commandes</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Voici l'historique de vos commandes. Consultez vos achats passés !
        </p>
      </header>

      {/* Section des commandes */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <p className="text-center text-lg">Chargement des commandes...</p>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.idOrder} className="mb-8">
                {/* Détails de la commande */}
                <div className="bg-gray-100 text-gray-800 p-6 rounded-lg border-4 border-yellow-400 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Commande #{order.noOrder}</h2>
                  <p className="text-lg mb-2">Date: {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "Date invalide"}</p>
                  <div className="space-y-4">
                    {order.orderitems && order.orderitems.length > 0 ? (
                      order.orderitems.map((orderItem) => (
                        <div
                          key={String(orderItem.idItem)}
                          className="bg-gray-200 p-4 rounded-lg flex items-center justify-between transition duration-300 hover:bg-blue-900 hover:text-white"
                        >
                          <div className="flex items-center space-x-4">
                            <OrderComponent orderItem={orderItem} order={order} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-md">Aucun article pour cette commande.</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p className="text-lg mb-4">Aucune commande trouvée.</p>
              <Link
                to="/Home/Catalogue"
                className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
              >
                Découvrir nos produits
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}