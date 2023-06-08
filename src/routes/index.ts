import { Express } from "express";
import { sessionRoutes } from "./session";
import { userRoutes } from "./user";
import { categoryRoutes } from "./category";
import { productRoutes } from "./product";
import { saleRoutes } from "./sale";
import { companyRoutes } from "./company";

export const appRoutes = (app: Express): void => {
  app.use("/users", userRoutes());
  app.use("/session", sessionRoutes());
  app.use("/categories", categoryRoutes());
  app.use("/products", productRoutes());
  app.use("/sales", saleRoutes());
  app.use("/companies", companyRoutes());
};
