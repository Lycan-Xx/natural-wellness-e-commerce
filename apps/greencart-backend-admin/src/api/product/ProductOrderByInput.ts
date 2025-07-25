import { SortOrder } from "../../util/SortOrder";

export type ProductOrderByInput = {
  category?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  price?: SortOrder;
  updatedAt?: SortOrder;
};
