import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { UserInfo } from "./UserInfo";

@Index("FK_post_TO_post_scrap_1", ["postId"], {})
@Index("FK_user_info_TO_post_scrap_1", ["userId"], {})
@Entity("post_scrap", { schema: "kurly" })
export class PostScrap {
  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "post_id" })
  postId: number;

  @PrimaryGeneratedColumn({ type: "int", name: "post_scrap_id" })
  postScrapId: number;

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
