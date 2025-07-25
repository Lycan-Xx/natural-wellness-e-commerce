import { Product as TProduct } from "../api/product/Product";

export const PRODUCT_TITLE_FIELD = "category";

export const ProductTitle = (record: TProduct): string => {
  return record.category?.toString() || String(record.id);
};
