import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { UserInfo } from "./UserInfo";

@Index("FK_product_TO_cart_1", ["productId"], {})
@Index("FK_user_info_TO_cart_1", ["userId"], {})
@Entity("cart", { schema: "kurly" })
export class Cart {
  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @PrimaryGeneratedColumn({ type: "int", name: "cart_id" })
  cartId: number;

  @Column("int", { name: "count", nullable: true })
  count: number | null;

  @ManyToOne(() => Product, (product) => product.carts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.carts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;
}
