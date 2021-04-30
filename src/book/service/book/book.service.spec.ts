import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookEntity } from '../../entity/book.entity';
import { Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BookService', () => {
  let service: BookService;
  let bookRepository: Repository<BookEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(BookEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);

    bookRepository = module.get<Repository<BookEntity>>(
      getRepositoryToken(BookEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const testBook: BookEntity = {
      id: '8defd9c5-b079-4227-806d-7283b951c52d',
      title: 'Prazeres Malditos',
      isbn: '9788532522498',
      author: 'Laurell K. Hamilton',
      publisher: 'Rocco',
      year: 2013,
      language: 'Portugês Brasileiro',
      weight: 200,
      length: 25,
      width: 5,
      height: 15,
    };

    jest
      .spyOn(bookRepository, 'save')
      .mockReturnValueOnce(Promise.resolve(testBook));

    const result = await service.create({ ...testBook });

    expect(result).toMatchObject(testBook);
  });

  it('should update book', async () => {
    const testBook: BookEntity = {
      id: '8defd9c5-b079-4227-806d-7283b951c52d',
      title: 'Prazeres Malditos',
      isbn: '9788532522498',
      author: 'Laurell K. Hamilton',
      publisher: 'Rocco',
      year: 2013,
      language: 'Portugês Brasileiro',
      weight: 200,
      length: 25,
      width: 5,
      height: 15,
    };

    jest.spyOn(bookRepository, 'update').mockImplementationOnce((id, book) => {
      if (id !== testBook.id) {
        return Promise.resolve(null);
      }

      return Promise.resolve({
        raw: [],
        affected: 1,
        generatedMaps: [book],
      });
    });

    jest
      .spyOn(bookRepository, 'findOne')
      .mockReturnValueOnce(Promise.resolve(testBook));

    const result = await service.update(testBook.id, { ...testBook });

    expect(result).toMatchObject(testBook);
  });

  it('should delete a book', async () => {
    const testBook: BookEntity = {
      id: '8defd9c5-b079-4227-806d-7283b951c52d',
      title: 'Prazeres Malditos',
      isbn: '9788532522498',
      author: 'Laurell K. Hamilton',
      publisher: 'Rocco',
      year: 2013,
      language: 'Portugês Brasileiro',
      weight: 200,
      length: 25,
      width: 5,
      height: 15,
    };

    jest.spyOn(bookRepository, 'delete').mockImplementationOnce((id) => {
      if (testBook.id == id) return Promise.resolve({ raw: [], affected: 1 });
    });

    const result = await service.delete(testBook.id);

    expect(result).toMatchObject({ raw: [], affected: 1 });
  });

  // it('should find a books', async () => {
  //   const testBook: BookEntity = {
  //     id: '8defd9c5-b079-4227-806d-7283b951c52d',
  //     title: 'Prazeres Malditos',
  //     isbn: '9788532522498',
  //     author: 'Laurell K. Hamilton',
  //     publisher: 'Rocco',
  //     year: 2013,
  //     language: 'Portugês Brasileiro',
  //     weight: 200,
  //     length: 25,
  //     width: 5,
  //     height: 15,
  //   };
  //
  //   jest.spyOn(bookRepository, 'find').mockImplementationOnce((id) => {
  //     if (testBook.id == id) return Promise.resolve({ raw: [], affected: 1 });
  //   });
  //
  //   const result = await service.findAll(testBook.id);
  //
  //   expect(result).toMatchObject({ raw: [], affected: 1 });
  // });
});
