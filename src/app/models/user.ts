import { Order } from "./order";

export interface User {
  _id: string;
  name: string;
  email: string;

  orders: Order[]
}
