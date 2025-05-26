import Order, { OrderItem } from "../types/OrderItem";

export default function OrderComponent({ orderItem, order }: { orderItem: OrderItem; order: Order }) {
  return (
    <div>
      <p className="text-lg font-semibold">Numéro de commande : {order.noOrder}</p>
      <p className="text-md">Date de commande : {new Date(order.orderDate).toLocaleDateString()}</p>
      <p className="text-md">Quantité : {orderItem.quantityBought}</p>
      <p className="text-md">Points : {orderItem.totalPointPaid}</p>
    </div>
  );
}