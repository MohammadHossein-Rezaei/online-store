import { IProduct } from "./types/IProduct";
import rawProducts from "../data/localProducts.json";
import { PRODUCTS_URL } from "./constant";

const localProducts: IProduct[] = rawProducts;

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) throw new Error("Server error");
    return await response.json();
  } catch (error) {
    console.warn("Using local product data:", error);
    return localProducts;
  }
};
