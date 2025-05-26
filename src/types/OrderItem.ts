export interface OrderItem {
    idItem: number;
    quantityBought: number;
    totalPointPaid: number;
  }
  
  export default interface Order {
    idOrder: number;
    noOrder: string;
    orderDate: string;
    idUser: number;
    orderitems: OrderItem[];
  }