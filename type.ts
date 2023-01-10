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
