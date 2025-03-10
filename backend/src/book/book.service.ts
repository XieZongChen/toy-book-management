import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './my-file-storage';
import * as path from 'path';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject()
  dbService: DbService;

  async list() {
    const books: Book[] = await (this.dbService.read() as Promise<Book[]>);
    return books;
  }

  async findById(id: number) {
    const books: Book[] = await (this.dbService.read() as Promise<Book[]>);
    return books.find((book) => book.id === id);
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await (this.dbService.read() as Promise<Book[]>);

    const book = new Book();
    book.id = randomNum();
    book.author = createBookDto.author;
    book.name = createBookDto.name;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;

    books.push(book);

    await this.dbService.write(books);
    return book;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await (this.dbService.read() as Promise<Book[]>);

    const foundBook = books.find((book) => book.id === updateBookDto.id);

    if (!foundBook) {
      throw new BadRequestException('该图书不存在');
    }

    foundBook.author = updateBookDto.author;
    foundBook.cover = updateBookDto.cover;
    foundBook.description = updateBookDto.description;
    foundBook.name = updateBookDto.name;

    await this.dbService.write(books);
    return foundBook;
  }

  async delete(id: number) {
    const books: Book[] = await (this.dbService.read() as Promise<Book[]>);
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books.splice(index, 1);
      await this.dbService.write(books);
    }
  }

  @Post('upload')
  @UseInterceptors(
    // 通过 FileInterceptor 的拦截器来解析请求里的 file 字段
    FileInterceptor('file', {
      dest: 'uploads', // 保存文件的目录
      storage: storage,
      limits: {
        // 文件限制
        fileSize: 1024 * 1024 * 3,
      },
      fileFilter(req, file, callback) {
        // 自定义文件过滤，这里限制了上传类型只能是图片，且为固定几个类型
        const extname = path.extname(file.originalname);
        if (['.png', '.jpg', '.gif'].includes(extname)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('只能上传图片'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path;
  }
}
