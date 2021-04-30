import { Module } from '@nestjs/common';
import { BookEntity } from './entity/book.entity';
import { BookController } from './controller/book/book.controller';
import { BookService } from './service/book/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
