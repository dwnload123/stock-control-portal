export interface GetAllProductsResponse {
  id: string;
  name: string;
  amount: string;
  description: string;
  price: string;
  category: {
    id: string;
    name: string;
  }
}
