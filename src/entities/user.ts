import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Sale } from "./sale";
import { Company } from "./company";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 30, unique: true, nullable: false })
  name!: string;

  @Column({ type: "varchar", nullable: false })
  @Exclude()
  password!: string;

  @Column({ type: "boolean", nullable: false, default: false })
  isAdm!: boolean;

  @Column({ type: "boolean", nullable: false, default: false })
  isStaff!: boolean;

  @Exclude()
  @Column({ type: "varchar", length: 150, nullable: false })
  securityAsk!: string;

  @Exclude()
  @Column({ type: "varchar", length: 150, nullable: false })
  securityAnswer!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @OneToMany(() => Sale, (sale) => sale.user, { onDelete: "SET NULL" })
  sales!: Sale[];

  @ManyToOne(() => Company, {
    nullable: false,
    eager: true,
    onDelete: "CASCADE",
  })
  company!: Company;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor() {
    this.id = uuid();
  }
}
