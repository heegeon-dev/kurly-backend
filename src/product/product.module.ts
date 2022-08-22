import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../models/entities/Product';
import { Cart } from '../models/entities/Cart';
import { ProductScrap } from '../models/entities/ProductScrap';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product,Cart,ProductScrap])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
