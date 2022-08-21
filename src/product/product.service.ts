import { Injectable } from '@nestjs/common';
import { Pagination, PaginationOptions } from "../utils/paginate";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/entities/Product';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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

  async findOne(productId: number) {
    let result = await this.productRepository.findOneById(productId);
    console.log(result)
    return result;
  }
}
