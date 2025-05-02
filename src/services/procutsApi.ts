import { PRODUCTS_URL } from "./constant";
import { IProduct } from "./types/IProduct";

export const fetchProducts = async () => {
  const response = await fetch(PRODUCTS_URL);
  const productList: IProduct[] = await response.json();
  return productList;
};
