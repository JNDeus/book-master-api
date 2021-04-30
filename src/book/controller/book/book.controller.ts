import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpException,
  Query,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from '../../service/book/book.service';
import { BookDto } from '../../dto/book.dto';
import { QueryBookDto } from '../../dto/query-book.dto';
import { PaginatedBooksResultDto } from '../../dto/paginated-books-result.dto';
import { ApiOperation } from '@nestjs/swagger';
import { validate } from 'class-validator';

@Controller('api/livros')
export class BookController {
  constructor(private booksService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'Create a book' })
  create(@Body(ValidationPipe) book: BookDto): Promise<BookDto> {
    return validate(book).then((errors) => {
      console.log(errors);
      if (errors.length > 0) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      return this.booksService.create(book);
    });
  }

  @Get()
  @ApiOperation({ summary: 'Search books' })
  findAll(
    @Query(ValidationPipe) query: QueryBookDto,
  ): Promise<PaginatedBooksResultDto> {
    return this.booksService.findAll({
      ...query,
      maxResultCount: query.maxResultCount > 10 ? 10 : query.maxResultCount,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a book by id' })
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<BookDto> {
    return this.booksService.get(id).then((book) => {
      if (!book) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return book;
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) book: BookDto,
  ): Promise<BookDto> {
    return this.booksService.update(id, book).then((book) => {
      if (!book) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return book;
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.booksService.delete(id).then((deleteResult) => {
      if (deleteResult.affected === 0) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return '';
    });
  }
}
