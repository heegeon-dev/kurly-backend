import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { UserInfo } from "./UserInfo";

@Index("FK_user_info_TO_product_scrap_1", ["userId"], {})
@Index("FK_product_TO_product_scrap_1", ["productId"], {})
@Entity("product_scrap", { schema: "kurly" })
export class ProductScrap {
  @Column("int", { primary: true, name: "ps_id" })
  psId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @ManyToOne(() => Product, (product) => product.productScraps, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.productScraps, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;
}
