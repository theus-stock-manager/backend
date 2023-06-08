import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Sale } from "./sale";
import { Product } from "./product";
import { Exclude } from "class-transformer";

@Entity()
export class SaleProduct {
  @PrimaryColumn()
  id: string;

  @Exclude()
  @ManyToOne(() => Sale, { onDelete: "CASCADE" })
  sale!: Sale;

  @ManyToOne(() => Product, { onDelete: "CASCADE", eager: true })
  product!: Product;

  @Column({ nullable: false, default: 1 })
  quantity!: number;

  constructor() {
    this.id = uuid();
  }
}
