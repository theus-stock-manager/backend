import { Category } from "../entities/category";
import { Product } from "../entities/product";
import { Sale } from "../entities/sale";
import { User } from "../entities/user";

export interface ICompany {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  users?: User[];
  products?: Product[];
  sales?: Sale[];
  categories?: Category[];
}

export interface ICompanyRequest {
  name: string;
  image?: string;
}

export interface ICompanyUpdateRequest {
  name?: string;
  image?: string;
}
