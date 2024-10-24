export type User = {
  id: string;
  fullName: string;
  email: string;
  location: string;
  phoneNumber: string;
  refreshToken: string;
  active: boolean;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  restaurantId: string;
};

export type PizzasApiResponse = {
    id: string;
    name: string;
    price: number;
    toppings: string[];
    createdBy: User;
    _count: { orders: number };
  };

export type Order = {
    id: string;
    pizzaId: string;
    pizza: string;
    customerId: string;
    customer: string;
    quantity: number;
    totalAmount: number;
    status: "Preparing" | "Ready" | "Delivered";
    toppings: string;
    createdAt: string;
    updatedAt: string;
  };