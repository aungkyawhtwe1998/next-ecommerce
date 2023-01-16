export interface Category {
  name: string;
  id?: number;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  categoryId: number;
  category?: Category;
}

export interface Products {
  map: any;
  products: Product[];
}

export interface Categories{
    [x: string]: any;
    categories:Category[]
  }

export interface OrderItem{
  productId:number,
  quantity:number,
  price:number
}
export interface Order{
  id:number;
  customerId:number,
  orderItems:OrderItem[],
}