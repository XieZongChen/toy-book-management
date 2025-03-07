import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  /**
   * 读取文件内容
   * @returns 文件存储对象
   */
  async read() {
    const filePath = this.options.path;

    try {
      await access(filePath);
    } catch (e) {
      console.error(e);
      return [];
    }

    const str = await readFile(filePath, {
      encoding: 'utf-8',
    });

    if (!str) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(str);
  }

  /**
   * 将参数写入文件
   */
  async write(obj: Record<string, any>) {
    await writeFile(this.options.path, JSON.stringify(obj || []), {
      encoding: 'utf-8',
    });
  }
}
