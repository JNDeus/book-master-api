import { Injectable } from '@nestjs/common';
import { BookDto } from '../../dto/book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../../entity/book.entity';
import { Repository } from 'typeorm';
import { QueryBookDto } from '../../dto/query-book.dto';
import { PaginatedBooksResultDto } from '../../dto/paginated-books-result.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  create(book: BookDto): Promise<BookDto> {
    return this.bookRepository.save(book);
  }

  async findAll(query: QueryBookDto): Promise<PaginatedBooksResultDto> {
    const totalCount = await this.bookRepository.count();
    const booksQuery = this.bookRepository.createQueryBuilder();

    if (query.busca) {
      booksQuery
        .where('author like :busca')
        .orWhere('title like :busca')
        .orWhere('publisher like :busca')
        .orWhere('isbn like :busca');
    }

    if (query.anoInicial > 0 && query.anoFinal > 0) {
      booksQuery.andWhere('year BETWEEN :anoInicial AND :anoFinal');
    }

    const books: BookEntity[] = await booksQuery
      .setParameters({
        busca: `%${query.busca}%`,
        anoInicial: query.anoInicial,
        anoFinal: query.anoFinal,
      })
      .orderBy(query.sorting || 'year', 'ASC')
      .offset(query.skipCount || 0)
      .limit(query.maxResultCount || 10)
      .getMany();

    return {
      totalCount: totalCount,
      items: books,
    };
  }

  get(id) {
    return this.bookRepository.findOne({ id: id });
  }

  update(id: string, book: BookDto) {
    return this.bookRepository.update({ id: id }, book).then(() => {
      return this.bookRepository.findOne(id);
    });
  }

  delete(id: string) {
    return this.bookRepository.delete(id);
  }
}
