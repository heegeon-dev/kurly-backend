import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreatePostScrap } from './dto/create-postScrap.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Get()
  findAll(
    @Query("take") take: number,
    @Query("page") page: number,
    @Query("keyword") keyword: string,
    @Query("userId") userId: number
  ) {
    return this.postService.findAll(
      { take: take ? take : 20, page: page ? page : 0 },
      keyword,
      userId,
    );
  }

  @Get(':postId')
  async findOne(@Param('postId') postId: string, @Query('userId') userId: number) {
    return this.postService.findOne(+postId, +userId);
  }

  @Post('/scrap')
  scrapProduct(@Body() CreatePostScrap: CreatePostScrap){
    return this.postService.scrapPost(CreatePostScrap);
  }

  @Delete('/scrap/:scrapId')
  deleteProduct(@Param('scrapId') scrapId: number ){
    return this.postService.deletePost(scrapId);
  }
}
