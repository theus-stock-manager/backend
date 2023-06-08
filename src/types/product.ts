import { Category } from "../entities/category";
import { Company } from "../entities/company";
import { User } from "../entities/user";

export interface IProduct {
  id: string;
  name: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
  category: Category | null;
  createdAt: Date;
  updatedAt: Date;
  company: Company;
  user?: User;
}

export interface IProductRequest {
  name?: string;
  stock?: number;
  purchasePrice?: number;
  salePrice?: number;
  categoryName?: string | null;
  companyId?: string;
}

export interface IFilterProduct {
  name?: string;
  stockLess?: number;
  stockMore?: number;
  categoryName?: string;
}
