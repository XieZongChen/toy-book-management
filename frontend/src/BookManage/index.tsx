import { Button, Card, Form, Input, message, Image } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { list } from '../services';
import { CreateBookModal } from './CreateBookModal';

interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

export function BookManage() {
  const [bookList, setBookList] = useState<Array<Book>>([]);
  const [name, setName] = useState('');
  const [isCreateBookModalOpen, setCreateBookModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const data = await list(name);

      if (data.status === 201 || data.status === 200) {
        setBookList(data.data);
      }
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  }, [name]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function searchBook(values: { name: string }) {
    setName(values.name);
  }

  return (
    <div id='bookManage' className='flex flex-col'>
      <div className='h-[72px] border-gray-100 border-b-1 flex items-center px-[24px]'>
        <div className='text-2xl font-bold tracking-wider'>图书管理系统</div>
      </div>
      <div className='flex flex-col gap-[24px] p-[24px]'>
        <Form name='search' layout='inline' colon={false} onFinish={searchBook}>
          <Form.Item label='图书名称' name='name'>
            <Input />
          </Form.Item>
          <Form.Item>
            <div className='flex gap-[12px]'>
              <Button color='primary' variant='outlined' htmlType='submit'>
                搜索图书
              </Button>
              <Button
                type='primary'
                onClick={() => setCreateBookModalOpen(true)}
              >
                添加图书
              </Button>
            </div>
          </Form.Item>
        </Form>
        <div className='flex flex-wrap gap-[12px]'>
          {bookList.map((book, idx) => {
            return (
              <Card
                key={`${book.id}+${idx}`}
                className='w-[240px]'
                hoverable
                cover={
                  <Image
                    className='rounded-t-xl'
                    width={'100%'}
                    height={300}
                    src={`http://localhost:3000/${book.cover}`}
                    fallback=''
                  />
                }
              >
                <div className='flex flex-col gap-[8px]'>
                  <div
                    className='text-xl font-bold tracking-wider truncate'
                    title={book.name}
                  >
                    {book.name}
                  </div>
                  <div className='text-x truncate' title={book.author}>
                    {book.author}
                  </div>
                  <div className='mt-auto flex justify-around'>
                    <a href='#'>详情</a>
                    <a href='#'>编辑</a>
                    <a href='#'>删除</a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <CreateBookModal
        isOpen={isCreateBookModalOpen}
        handleClose={() => {
          setCreateBookModalOpen(false);
          fetchData();
        }}
      ></CreateBookModal>
    </div>
  );
}
