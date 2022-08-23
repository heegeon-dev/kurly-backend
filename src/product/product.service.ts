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
  ) { }

  async findAll(options: PaginationOptions, keyword: string, userId: number) {
    const { take, page } = options;

    let qb = this.productRepository
      .createQueryBuilder('product')
      .select(["product.productId", "product.title", "product.kurlyOnly", "product.subTitle", "product.thumbnail"])
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
      .leftJoin('cart.product', 'product')
      .addSelect(['product.productId', 'product.title', 'product.price', 'product.thumbnail', 'product.subTitle', 'product.kurlyOnly'])
      .where('cart.userId=:userId', { userId })
      .getMany();
  }

  async addProductInCart(createCart: CreateCart) {
    let cart = await this.cartRepository
      .createQueryBuilder("cart")
      .where("cart.userId=:userId AND cart.productId=:productId", { userId: createCart.userId, productId: createCart.productId })
      .getOne();

    if (cart) {
      cart.count = cart.count + createCart.count;
      return this.cartRepository.update(cart.cartId, cart);
    } else {
      return this.cartRepository.insert(createCart);
    }
  }

  deleteProductInCart(userId: number) {
    return this.cartRepository
      .createQueryBuilder("cart")
      .delete()
      .where("userId=:userId", { userId })
      .execute();
  }

  async scrapProduct(createProductScrap: CreateProductScrap) {
    const scrap = await this.productScrapRepository.findOneBy(createProductScrap);
    if (scrap) {
      return scrap;
    } else {
      return this.productScrapRepository.insert(createProductScrap);
    }
  }

  deleteProductScrap(scrapId: number) {
    return this.productScrapRepository.delete(scrapId);
  }

  async bulkAddProductInCart(createCarts: CreateCart[]) {
    let addProductIds = createCarts.map(cart => cart.productId);
    let userId = createCarts[0].userId;
    let carts = await this.cartRepository
      .createQueryBuilder("cart")
      .where("cart.productId IN (:...addProductIds)", { addProductIds })
      .andWhere("cart.userId=:userId", { userId })
      .getMany();
    let productIds = carts.map(cart => cart.productId);
    let newCarts = [];
    createCarts.map(createCart => {
      if (productIds.includes(createCart.productId)) {
        let cart = carts[productIds.indexOf(createCart.productId)];
        cart.count += createCart.count;
        this.cartRepository.update(cart.cartId, cart);
      } else {
        newCarts.push(createCart);
      }
    })
    this.cartRepository.insert(newCarts);
    return true;
  }
}
