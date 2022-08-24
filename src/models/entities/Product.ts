import { Column, Entity, OneToMany } from "typeorm";
import { Cart } from "./Cart";
import { Tag } from "./Tag";
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

  @Column("varchar", { name: "thumbnail", nullable: true, length: 200 })
  thumbnail: string | null;

  @Column("varchar", { name: "image", nullable: true, length: 2000 })
  image: string | null;

  @Column("varchar", { name: "category", nullable: true, length: 50 })
  category: string | null;

  @Column("varchar", { name: "delivery", nullable: true, length: 63 })
  delivery: string | null;

  @Column("float", { name: "discount", nullable: true, precision: 12 })
  discount: number | null;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => Tag, (tag) => tag.product)
  tags: Tag[];

  @OneToMany(() => ProductScrap, (productScrap) => productScrap.product)
  productScraps: ProductScrap[];
}
