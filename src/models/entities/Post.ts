import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Product } from "./Product";
import { Tag } from "./Tag";
import { PostScrap } from "./PostScrap";

@Entity("post", { schema: "kurly" })
export class Post {
  @Column("int", { primary: true, name: "post_id" })
  postId: number;

  @Column("varchar", { name: "content", nullable: true, length: 5000 })
  content: string | null;

  @Column("varchar", { name: "title", nullable: true, length: 200 })
  title: string | null;

  @Column("varchar", { name: "sub_title", nullable: true, length: 200 })
  subTitle: string | null;

  @Column("varchar", { name: "category", nullable: true, length: 200 })
  category: string | null;

  @Column("varchar", { name: "thumbnail", nullable: true, length: 200 })
  thumbnail: string | null;

  @ManyToMany(() => Product, (product) => product.posts)
  products: Product[];

  @OneToMany(() => Tag, (tag) => tag.post)
  tags: Tag[];

  @OneToMany(() => PostScrap, (postScrap) => postScrap.post)
  postScraps: PostScrap[];
}
