import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../models/entities/Post';
import { Repository } from 'typeorm';
import { Pagination, PaginationOptions } from "../utils/paginate";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async findAll(
    options: PaginationOptions,
    keyword: string,
    userId
  ) {
    const { take, page } = options;

    let qb = this.postRepository
    .createQueryBuilder("postRepository")
    .skip(take * page)
    .take(take);

    if(userId){
      qb.leftJoinAndSelect("postRepository.postScraps","postScraps")
        .andWhere("postScraps.userId=:userId",{ userId })
    }

    if(keyword){
      qb.andWhere("postRepository.title LIKE :keyword",{ keyword: `%${keyword}%`})
        .andWhere("postRepository.subtitle LIKE :keyword",{ keyword: `%${keyword}%`})
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
}
