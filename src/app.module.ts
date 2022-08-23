import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'kurly.cwlbmv6oqerc.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'adminadmin',
      database: 'kurly',
      entities: [__dirname + '/**/entities/*.{ts,js}'],
      synchronize: false,
      logging: true
    }),
    PostModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
