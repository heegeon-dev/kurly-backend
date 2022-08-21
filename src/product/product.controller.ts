import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(
    @Query("take") take: number,
    @Query("page") page: number,
    @Query("keyword") keyword: string,
  ) {
    console.log("AA")

    return this.productService.findAll(
      { take: take ? take : 20, page: page ? page : 0 },
      keyword,
    );
  }

  @Get(':productId')
  findOne(@Param('productId') productId: string) {

    return this.productService.findOne(+productId);
  }
}
