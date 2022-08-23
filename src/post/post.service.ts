import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../models/entities/Post';
import { Repository } from 'typeorm';
import { Pagination, PaginationOptions } from "../utils/paginate";
import { CreatePostScrap } from './dto/create-postScrap.dto';
import { PostScrap } from '../models/entities/PostScrap';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostScrap)
    private postScrapRepository: Repository<PostScrap>,
  ) {}
  async findAll(
    options: PaginationOptions,
    keyword: string,
    userId: number
  ) {
    const { take, page } = options;

    let qb = this.postRepository
      .createQueryBuilder("post")
      .select(["post.postId","post.title","post.subTitle","post.thumbnail"])
      .skip(take * page)
      .take(take);

    if(userId){
      qb.leftJoinAndSelect((qb) => 
        qb.select("postScrap.postScrapId")
          .from(PostScrap, 'postScrap')
          .where('postScrap.userId=:userId', { userId })
      , 'sub', "sub.postScrap_post_scrap_id = post.postId");
    }

    if(keyword){
      qb.andWhere("post.title LIKE :keyword",{ keyword: `%${keyword}%`})
    }
    const total = await qb.getCount();
    const results = await qb.getRawMany();
    return new Pagination<Post>({
      results,
      total,
    });
  }

  async findOne(postId: number, userId: number) {
    const post = await this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.tags","tag")
      .where("post.postId=:postId",{ postId })
      .getOne();
    const isScrap = await this.postScrapRepository
      .findOneBy({postId: post.postId}) ? true : false;
    return { post, isScrap };
  }

  async scrapPost(createPostScrap: CreatePostScrap){
    const scrap = await this.postScrapRepository.findOneBy(createPostScrap);
    console.log(scrap)
    if( scrap ){
      return scrap;
    }else{
      return this.postScrapRepository.insert(createPostScrap); 
    }
  }
  deletePost(scrapId: number){
    return this.postScrapRepository.delete(scrapId);
  }
}
