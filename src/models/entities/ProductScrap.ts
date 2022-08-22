import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { UserInfo } from "./UserInfo";
import { Product } from "./Product";

@Index("FK_product_TO_product_scrap_1", ["productId"], {})
@Index("FK_user_info_TO_product_scrap_1", ["userId"], {})
@Entity("product_scrap", { schema: "kurly" })
export class ProductScrap {
  @Column("int", { primary: true, name: "ps_id" })
  psId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.productScraps, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;

  @ManyToOne(() => Product, (product) => product.productScraps, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
