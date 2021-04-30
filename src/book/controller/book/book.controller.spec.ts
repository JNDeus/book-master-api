import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookEntity } from '../../entity/book.entity';
import { BookService } from '../../service/book/book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ControllerController', () => {
  let service: BookService;
  let controller: BookController;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(BookEntity),
          useClass: Repository,
        },
      ],
      controllers: [BookController],
    }).compile();
    service = module.get<BookService>(BookService);

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create in service', async () => {
    jest
      .spyOn(service, 'create')
      .mockReturnValueOnce(Promise.resolve(testBook));

    const result = await controller.create({ ...testBook });

    expect(result).toMatchObject(testBook);
  });

  it('should call update in service', async () => {
    jest
      .spyOn(service, 'update')
      .mockReturnValueOnce(Promise.resolve(testBook));

    const result = await controller.update(testBook.id, { ...testBook });

    expect(result).toMatchObject(testBook);
  });

  it('should return a book when get by id', async () => {
    jest.spyOn(service, 'get').mockImplementationOnce((id) => {
      if (id === testBook.id) return Promise.resolve(testBook);
    });

    const result = await controller.getById(testBook.id);

    expect(result).toMatchObject(testBook);
  });

  it('should delete a book when call delete', async () => {
    jest.spyOn(service, 'delete').mockImplementationOnce((id: string) => {
      if (id === testBook.id) return Promise.resolve({ raw: [], affected: 1 });
      return Promise.resolve({ raw: [], affected: 0 });
    });

    const result = await controller.delete(testBook.id);

    expect(result).toBe('');
  });

  it('should return not found exception when get by id not exists', async () => {
    jest.spyOn(service, 'get').mockImplementationOnce((id) => {
      if (id === testBook.id) return Promise.resolve(testBook);
      return Promise.resolve(undefined);
    });

    const result = async () => {
      await controller.getById('227814c5-b7e8-4f6d-aa4b-dd8de9978107');
    };

    await expect(result).rejects.toThrowError('Not Found');
  });

  it('should return not found exception when delete id not exists', async function () {
    jest.spyOn(service, 'delete').mockImplementationOnce((id: string) => {
      if (id === testBook.id) return Promise.resolve({ raw: [], affected: 1 });
      return Promise.resolve({ raw: [], affected: 0 });
    });

    const result = async () => {
      await controller.delete('227814c5-b7e8-4f6d-aa4b-dd8de9978107');
    };

    await expect(result).rejects.toThrowError('Not Found');
  });

  it('should return books when call findAll in service', async () => {});
});
