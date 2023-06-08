import { Company } from "../entities/company";
import { Product } from "../entities/product";

export interface ICategory {
  id: string;
  name: string;
  products: Product[];
  company: Company;
}

export interface ICategoryRequest {
  name: string;
  companyId?: string;
}
