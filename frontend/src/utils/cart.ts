export type CartItem = {
  product_id: number;
  product_name: string;
  price: number;
  image_url?: string | null;
  quantity: number;
};

export const getCart = (): CartItem[] => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product: CartItem) => {
  const cart = getCart();

  const existing = cart.find(
    (item) => item.product_id === product.product_id
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);

  // Notify header to update cart count instantly
  window.dispatchEvent(new Event("cartUpdated"));
};