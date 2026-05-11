
export type WishlistItem = {
  product_id: number;
  product_name: string;
  price: number;
  image_url?: string | null;
};

export const getWishlist = (): WishlistItem[] => {
  const data = localStorage.getItem("wishlist");
  return data ? JSON.parse(data) : [];
};

export const saveWishlist = (wishlist: WishlistItem[]) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

export const isInWishlist = (productId: number): boolean => {
  return getWishlist().some((item) => item.product_id === productId);
};

export const toggleWishlist = (product: WishlistItem) => {
  const wishlist = getWishlist();

  const exists = wishlist.find(
    (item) => item.product_id === product.product_id
  );

  let updatedWishlist: WishlistItem[];

  if (exists) {
    updatedWishlist = wishlist.filter(
      (item) => item.product_id !== product.product_id
    );
  } else {
    updatedWishlist = [...wishlist, product];
  }

  saveWishlist(updatedWishlist);

  window.dispatchEvent(new Event("wishlistUpdated"));

  return updatedWishlist;
};