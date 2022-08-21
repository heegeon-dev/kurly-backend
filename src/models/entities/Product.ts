import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Post } from "./Post";
import { Cart } from "./Cart";
import { ProductScrap } from "./ProductScrap";

@Entity("product", { schema: "kurly" })
export class Product {
  @Column("int", { primary: true, name: "product_id" })
  productId: number;

  @Column("varchar", { name: "title", nullable: true, length: 200 })
  title: string | null;

  @Column("int", { name: "price", nullable: true })
  price: number | null;

  @Column("enum", { name: "kurly_only", nullable: true, enum: ["Y", "N"] })
  kurlyOnly: "Y" | "N" | null;

  @Column("varchar", { name: "sub_title", nullable: true, length: 200 })
  subTitle: string | null;

  @Column("varchar", { name: "content", nullable: true, length: 5000 })
  content: string | null;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => ProductScrap, (productScrap) => productScrap.product)
  productScraps: ProductScrap[];
}
