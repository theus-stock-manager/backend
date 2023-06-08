import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user";
import { Product } from "./product";
import { Sale } from "./sale";
import { Category } from "./category";

@Entity()
export class Company {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 150, unique: true, nullable: false })
  name!: string;

  @Column({ nullable: true })
  image!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.company, {
    onDelete: "CASCADE",
  })
  users!: User[];

  @OneToMany(() => Product, (product) => product.company, {
    onDelete: "CASCADE",
  })
  products!: Product[];

  @OneToMany(() => Sale, (sale) => sale.company, {
    onDelete: "CASCADE",
  })
  sales!: Sale[];

  @OneToMany(() => Category, (category) => category.company, {
    onDelete: "CASCADE",
  })
  categories!: Category[];

  constructor() {
    this.id = uuid();
  }
}
