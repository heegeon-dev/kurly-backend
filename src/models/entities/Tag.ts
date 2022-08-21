import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Post } from "./Post";

@Index("FK_post_TO_tag_1", ["postId"], {})
@Entity("tag", { schema: "kurly" })
export class Tag {
  @Column("varchar", { name: "keyword", nullable: true, length: 30 })
  keyword: string | null;

  @Column("int", { name: "post_id" })
  postId: number;

  @Column("int", { primary: true, name: "tag_id" })
  tagId: number;

  @ManyToOne(() => Post, (post) => post.tags, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "post_id", referencedColumnName: "postId" }])
  post: Post;
}