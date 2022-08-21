import { Column, Entity, OneToMany } from "typeorm";
import { Cart } from "./Cart";
import { PostScrap } from "./PostScrap";
import { ProductScrap } from "./ProductScrap";

@Entity("user_info", { schema: "kurly" })
export class UserInfo {
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => PostScrap, (postScrap) => postScrap.user)
  postScraps: PostScrap[];

  @OneToMany(() => ProductScrap, (productScrap) => productScrap.user)
  productScraps: ProductScrap[];
}
