import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Post } from "./Post";
import { UserInfo } from "./UserInfo";

@Index("FK_user_info_TO_post_scrap_1", ["userId"], {})
@Index("FK_post_TO_post_scrap_1", ["postId"], {})
@Entity("post_scrap", { schema: "kurly" })
export class PostScrap {
  @Column("int", { primary: true, name: "post_scrap_id" })
  postScrapId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "post_id" })
  postId: number;

  @ManyToOne(() => Post, (post) => post.postScraps, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "post_id", referencedColumnName: "postId" }])
  post: Post;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.postScraps, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: UserInfo;
}
