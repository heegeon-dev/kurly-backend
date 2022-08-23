import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateCart } from './dto/create-cart.dto';
import { CreateProductScrap } from './dto/create-productScrap.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(
    @Query("take") take: number,
    @Query("page") page: number,
    @Query("keyword") keyword: string,
    @Query("userId") userId: number
  ) {
    return this.productService.findAll(
      { take: take ? take : 20, page: page ? page : 0 },
      keyword,
      userId
    );
  }

  @Get('/cart')
  getCart(@Query('userId') userId: number){
    return this.productService.getCart(+userId);
  }

  @Post('/cart')
  createProductInCart(@Body() createCart: CreateCart){
    return this.productService.addProductInCart(createCart);
  }

  @Delete('/cart/:cartId')
  deleteProductInCart(@Param('cartId') cartId: number){
    return this.productService.deleteProductInCart(cartId);
  }

  @Get('/:productId')
  findOne(@Param('productId') productId: string) {
    return this.productService.findOne(+productId);
  }

  @Post('/scrap')
  scrapProduct(@Body() createPostScrap: CreateProductScrap){
    console.log(createPostScrap);
    return this.productService.scrapProduct(createPostScrap);
  }

  @Delete('/scrap/:scrapId')
  deleteProduct(@Param('scrapId') scrapId: number ){
    return this.productService.deleteProductScrap(scrapId);
  }
}
