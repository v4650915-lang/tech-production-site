export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: "printing" | "cutting" | "mangals" | "stands" | "souvenirs" | "signs";
  created_at?: string;
}

export interface CartItem {
  id: string;
  product?: Product;
  type: "custom" | "product";
  name: string;
  parameters: Record<string, string | number | boolean>;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Order {
  id?: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_vk_id?: number;
  items: CartItem[];
  total_amount: number;
  comment?: string;
  status: "new" | "in_progress" | "completed" | "cancelled";
  created_at?: string;
}
