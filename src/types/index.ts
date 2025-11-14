export interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: ProductImage;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  items: OrderItem[];
  couponCode?: string;
}

export interface OrderResponse {
  id: string;
  items: OrderItem[];
  products: Product[];
  couponCode?: string;
}

