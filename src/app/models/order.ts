import { CartItem } from './item';
import { Product } from './product';
import { User } from './user';

export interface Order {
  _id: string;
  totalPrice: number;
  items: CartItem[];
  user: User,
  createdAt: Date,
  paidAt: Date
}
