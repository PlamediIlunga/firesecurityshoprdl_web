import ProduitItem from '../types/ProduitItem';
import KartProduct from '../components/ProductComponent';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface CartItem extends ProduitItem {
    quantity: number;
}

export default function Kart() {
    const api_url = 'http://localhost:5007/';
    const token = localStorage.getItem('bearerToken');
    const [products, setProducts] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [orderProcessing, setOrderProcessing] = useState(false);
    const [decodedToken, setDecodedToken] = useState<{ email: string; role: string, idUser: string } | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setIsLoading(true);
                const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
                setProducts(cartItems);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits du panier :", error);
            } finally {
                setIsLoading(false);
            }
        };
        getProducts();

        const bearerToken = localStorage.getItem('bearerToken');
        if (bearerToken) {
            try {
                const payload = jwtDecode<{ email: string; role: string, idUser: string }>(bearerToken);
                console.log(payload);
                setDecodedToken(payload);
            } catch (error) {
                console.error('Erreur lors du décodage du token:', error);
                setDecodedToken(null);
            }
        }     
    }, []);

    // Calculer le total des points (points × quantité)
    const totalPoints = products.reduce((sum, product) => sum + (product.points * product.quantity), 0);

    // Fonction pour augmenter la quantité
    const increaseQuantity = (idItem: number) => {
        const updatedProducts = products.map(product => {
            if (product.idItem === idItem) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });
        setProducts(updatedProducts);
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
    };

    // Fonction pour diminuer la quantité
    const decreaseQuantity = (idItem: number) => {
        const updatedProducts = products.map(product => {
            if (product.idItem === idItem && product.quantity > 1) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        });
        setProducts(updatedProducts);
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
    };

    // Fonction pour retirer un produit du panier et de localStorage
    const removeProduct = (idItem: number) => {
        const updatedProducts = products.filter(product => product.idItem !== idItem);
        setProducts(updatedProducts);
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
    };

    const handleCommand = async () => {
        if (orderProcessing) return; // Éviter les soumissions multiples
        
        try {
            setOrderProcessing(true);
            
            if (!decodedToken?.idUser) {
                throw new Error("Vous n'êtes pas connecté ou votre session a expiré");
            }

            const idUser = parseInt(decodedToken.idUser, 10);
            if (isNaN(idUser)) {
                throw new Error("Identifiant utilisateur invalide");
            }

            // Générer un numéro de commande unique
            const noOrder = Math.floor(Date.now() / 1000);

            // Créer les articles de commande à partir du panier
            const orderItems = products.map(product => ({
                idItem: product.idItem,
                quantityBought: product.quantity,
                totalPointPaid: product.points * product.quantity
            }));

            // Créer l'objet de commande qui correspond au DTO du backend
            const orderData = {
                noOrder: noOrder,
                orderDate: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
                idUser: idUser,
                orderitems: orderItems
            };

            // Vérifier si le panier est vide
            if (orderItems.length === 0) {
                throw new Error("Votre panier est vide");
            }

            console.log("Envoi de la commande:", orderData);

            // Envoyer la requête au serveur
            const response = await fetch(`${api_url}api/Order/CreateOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            // Traiter la réponse
            if (!response.ok) {
                // Essayer d'obtenir les détails de l'erreur à partir de la réponse
                let errorMessage = "Erreur lors de la validation de la commande";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.title || errorMessage;
                } catch (e) {
                    // Fallback si impossible d'analyser le JSON d'erreur
                    errorMessage += `: ${response.status} ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            // Analyser la réponse réussie
            const result = await response.json();
            console.log("Commande créée avec succès:", result);

            // Vider le panier en cas de succès
            localStorage.removeItem('cart');
            setProducts([]);
            
            // Afficher un message de succès
            alert(`Commande #${result.noOrder} validée avec succès !`);
            
            // Optionnel: Rediriger vers la page de confirmation de commande
            // window.location.href = '/confirmation-commande/' + result.idOrder;
        } catch (error) {
            console.error("Erreur lors de la commande:", error);
            alert(`${error instanceof Error ? error.message : "Une erreur est survenue lors de la validation de la commande"}`);
        } finally {
            setOrderProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-red-900 text-white">
            {/* En-tête du panier */}
            <header className="py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Mon Panier d'Achat
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                    Voici les articles que vous avez sélectionnés. Validez votre panier pour échanger vos points !
                </p>
            </header>

            {/* Section des produits du panier */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    {isLoading ? (
                        <p className="text-center text-lg">Chargement du panier...</p>
                    ) : products.length > 0 ? (
                        <>
                            {/* Liste des produits */}
                            <div className="space-y-6">
                                {products.map((product) => (
                                    <div
                                        key={String(product.idItem)}
                                        className="bg-gray-100 text-gray-800 p-6 rounded-lg border-4 border-yellow-400 shadow-lg flex items-center justify-between transition duration-300 hover:bg-blue-900 hover:text-white"
                                    >
                                        {/* Contenu du produit */}
                                        <div className="flex items-center space-x-4">
                                            <KartProduct product={product} />
                                        </div>

                                        {/* Points, quantité et bouton Retirer */}
                                        <div className="flex items-center space-x-4">
                                            {/* Contrôle de la quantité */}
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => decreaseQuantity(product.idItem)}
                                                    disabled={product.quantity <= 1}
                                                    className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300 disabled:bg-yellow-200 disabled:cursor-not-allowed"
                                                >
                                                    −
                                                </button>
                                                <span className="text-lg font-semibold">{product.quantity}</span>
                                                <button
                                                    onClick={() => increaseQuantity(product.idItem)}
                                                    className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Points (points × quantité) */}
                                            <p className="text-lg font-semibold">{product.points * product.quantity} points</p>

                                            {/* Bouton Retirer */}
                                            <button
                                                onClick={() => removeProduct(product.idItem)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-800 transition duration-300"
                                            >
                                                Retirer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total et bouton de validation */}
                            <div className="mt-8 flex justify-between items-center bg-gray-800 p-6 rounded-lg border-4 border-yellow-400">
                                <p className="text-xl font-bold">
                                    Total : <span className="text-yellow-400">{totalPoints} points</span>
                                </p>
                                <button
                                    className={`${
                                        orderProcessing 
                                            ? "bg-gray-500 cursor-not-allowed" 
                                            : "bg-yellow-400 hover:bg-yellow-500"
                                    } text-gray-800 px-6 py-3 rounded-lg font-semibold transition duration-300`}
                                    onClick={handleCommand}
                                    disabled={orderProcessing}
                                >
                                    {orderProcessing ? "Traitement en cours..." : "Valider le panier"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <p className="text-lg mb-4">Votre panier est vide pour le moment.</p>
                            <Link 
                                to="/products" 
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