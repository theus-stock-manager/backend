import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./product";
import { Company } from "./company";

@Entity()
export class Category {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @OneToMany((type) => Product, (product) => product.category, {
    onDelete: "SET NULL",
  })
  products!: Product[];

  @ManyToOne(() => Company, {
    nullable: false,
    eager: true,
    onDelete: "CASCADE",
  })
  company!: Company;

  constructor() {
    this.id = uuid();
  }
}
