import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../models/entities/Post';
import { Repository } from 'typeorm';
import { Pagination, PaginationOptions } from "../utils/paginate";
import { CreatePostScrap } from './dto/create-postScrap.dto';
import { PostScrap } from 'src/models/entities/PostScrap';

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
      .createQueryBuilder("postRepository")
      .select(["postRepository.postId","postRepository.title","postRepository.subTitle","postRepository.thumbnail"])
      .skip(take * page)
      .take(take);

    if(userId){
      qb.leftJoinAndSelect("postRepository.postScraps","postScraps")
        .andWhere("postScraps.userId=:userId",{ userId })
    }

    if(keyword){
      qb.andWhere("postRepository.title LIKE :keyword",{ keyword: `%${keyword}%`})
    }
    const [results, total] = await qb.getManyAndCount();

    return new Pagination<Post>({
      results,
      total,
    });
  }

  findOne(postId: number) {
    return this.postRepository.createQueryBuilder("postRepository")
      .leftJoinAndSelect("postRepository.tags","tags")
      .leftJoinAndSelect("postRepository.postScraps","postScraps")
      .where("postRepository.postId=:postId",{ postId })
      .getOne();
  }

  scrapPost(createPostScrap: CreatePostScrap){
    return this.postScrapRepository.create(createPostScrap);
  }
  deletePost(scrapId: number){
    return this.postScrapRepository.delete(scrapId);
  }
}
