import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  list() {}

  findById(id: number) {}

  create(createBookDto: CreateBookDto) {}

  update(updateBookDto: UpdateBookDto) {}

  delete(id: number) {}
}
