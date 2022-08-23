import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Post } from "./Post";
import { Product } from "./Product";

@Index("FK_post_TO_tag_1", ["postId"], {})
@Index("FK_product_TO_tag_1", ["productId"], {})
@Entity("tag", { schema: "kurly" })
export class Tag {
  @Column("varchar", { name: "keyword", nullable: true, length: 30 })
  keyword: string | null;

  @Column("int", { name: "post_id" })
  postId: number;

  @Column("int", { primary: true, name: "tag_id" })
  tagId: number;

  @Column("float", { name: "x", nullable: true, precision: 12 })
  x: number | null;

  @Column("float", { name: "y", nullable: true, precision: 12 })
  y: number | null;

  @Column("int", { name: "product_id", nullable: true })
  productId: number | null;

  @ManyToOne(() => Post, (post) => post.tags, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "post_id", referencedColumnName: "postId" }])
  post: Post;

  @ManyToOne(() => Product, (product) => product.tags, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
