import { Injectable } from '@nestjs/common';
import { Pagination, PaginationOptions } from "../utils/paginate";
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

  async findAll(
    options: PaginationOptions,
    keyword: string
  ) {
    const { take, page } = options;

    let qb = this.productRepository
    .createQueryBuilder("productRepository")
    .skip(take * page)
    .take(take);
    if(keyword){
      qb.andWhere("productRepository.title LIKE :keyword",{ keyword: `%${keyword}%`})
        .andWhere("productRepository.subtitle LIKE :keyword",{ keyword: `%${keyword}%`})
    }
    const [results, total] = await qb.getManyAndCount();

    return new Pagination<Product>({
      results,
      total,
    });
  }

  findOne(productId: number) {
    return this.productRepository.findOneById(productId);
  }

  getCart(userId: number){
    return this.cartRepository.createQueryBuilder("cart")
      .where("cart.userId=:userId",{ userId })
      .getOne();
  }

  addProductInCart(createCart : CreateCart){
    return this.cartRepository.create(createCart);
  }

  deleteProductInCart(cartId : number){
    return this.cartRepository.delete(cartId);
  }

  scrapProduct(createProductScrap: CreateProductScrap){
    return this.productScrapRepository.create(createProductScrap);
  }
  deleteProduct(scrapId: number){
    return this.productScrapRepository.delete(scrapId);
  }
  
}
