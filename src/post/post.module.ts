import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../models/entities/Post';
import { PostScrap } from '../models/entities/PostScrap';

@Module({
  imports:[
    TypeOrmModule.forFeature([Post,PostScrap])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
