import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  maxQuantity?: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

type AddToCartPayload = Omit<CartItem, "quantity"> & { quantity?: number };
type UpdateQuantityPayload = { productId: string; size: string; quantity: number };

const SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 150;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const incoming = action.payload;
      const amountToAdd = incoming.quantity ?? 1;
      const existingItem = state.items.find(
        (item) => item.productId === incoming.productId && item.size === incoming.size,
      );

      if (existingItem) {
        const nextQuantity = existingItem.quantity + amountToAdd;
        existingItem.quantity = existingItem.maxQuantity
          ? Math.min(existingItem.maxQuantity, nextQuantity)
          : nextQuantity;
        return;
      }

      state.items.push({
        ...incoming,
        quantity: amountToAdd,
      });
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const item = state.items.find(
        (entry) => entry.productId === action.payload.productId && entry.size === action.payload.size,
      );

      if (!item) return;

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (entry) => !(entry.productId === action.payload.productId && entry.size === action.payload.size),
        );
        return;
      }

      item.quantity = item.maxQuantity
        ? Math.min(item.maxQuantity, action.payload.quantity)
        : action.payload.quantity;
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string; size: string }>) => {
      state.items = state.items.filter(
        (item) => !(item.productId === action.payload.productId && item.size === action.payload.size),
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartShipping = (state: RootState) =>
  selectCartSubtotal(state) >= SHIPPING_THRESHOLD ? 0 : state.cart.items.length > 0 ? SHIPPING_FEE : 0;
export const selectCartGrandTotal = (state: RootState) => selectCartSubtotal(state) + selectCartShipping(state);

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;