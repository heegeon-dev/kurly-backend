import { Injectable } from '@nestjs/common';
import { Pagination, PaginationOptions } from '../utils/paginate';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/entities/Product';
import { Cart } from '../models/entities/Cart';
import { CreateCart } from './dto/create-cart.dto';
import { CreateProductScrap } from './dto/create-productScrap.dto';
import { ProductScrap } from '../models/entities/ProductScrap';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(ProductScrap)
    private productScrapRepository: Repository<ProductScrap>,
  ) {}

  async findAll(options: PaginationOptions, keyword: string, userId: number) {
    const { take, page } = options;

    let qb = this.productRepository
      .createQueryBuilder('product')
      .select(["product.productId","product.title","product.kurlyOnly","product.subTitle","product.thumbnail"])
      .skip(take * page)
      .take(take);

    if (keyword) {
      qb.andWhere(
        'product.title LIKE :keyword OR product.subTitle LIKE :keyword',
        { keyword: `%${keyword}%` },
      );
    }

    if (userId) {
      qb.leftJoinAndSelect((qb) => 
        qb.select("productScrap.psId")
          .from(ProductScrap, 'productScrap')
          .where('productScrap.userId=:userId', { userId })
      , 'sub', "sub.productScrap_ps_id = product.productId");
    }

    const total = await qb.getCount();
    const results = await qb.getRawMany();
    return new Pagination<Product>({
      results,
      total,
    });
  }

  findOne(productId: number) {
    return this.productRepository.findOneById(productId);
  }

  getCart(userId: number) {
    return this.cartRepository
      .createQueryBuilder('cart')
      .leftJoin('cart.product','product')
      .addSelect(['product.productId','product.title','product.price','product.thumbnail','product.subTitle','product.kurlyOnly'])
      .where('cart.userId=:userId', { userId })
      .getMany();
  }

  addProductInCart(createCart: CreateCart) {
    return this.cartRepository.insert(createCart);
  }

  deleteProductInCart(cartId: number) {
    return this.cartRepository.delete(cartId);
  }

  async scrapProduct(createProductScrap: CreateProductScrap) {
    const scrap = await this.productScrapRepository.findOneBy(createProductScrap);
    if( scrap ){
      return scrap;
    }else{
      return this.productScrapRepository.insert(createProductScrap); 
    }
  }

  deleteProductScrap(scrapId: number) {
    return this.productScrapRepository.delete(scrapId);
  }
}
