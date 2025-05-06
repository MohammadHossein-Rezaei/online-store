// در فایل api/products.ts
import { PRODUCTS_URL } from "./constant";
import { IProduct } from "./types/IProduct";

export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(PRODUCTS_URL);
  return response.json();
};
