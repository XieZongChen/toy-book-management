import { Button, Card, Form, Input, message, Image, Popconfirm } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { deleteBook, IBook, list } from '@/services/book';
import { CreateBookModal } from './CreateBookModal';
import { UpdateBookModal } from './UpdateBookModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export function BookManage() {
  const [bookList, setBookList] = useState<Array<IBook>>([]);
  const [name, setName] = useState('');
  const [isCreateBookModalOpen, setCreateBookModalOpen] = useState(false);
  const [isUpdateBookModalOpen, setUpdateBookModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState(0);

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

  async function handleDelete(id: number) {
    try {
      await deleteBook(id);
      message.success('删除成功');
      fetchData();
    } catch (e: any) {
      message.error(e.response.data.message);
    }
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
                className='w-[240px] overflow-hidden'
                styles={{ body: { padding: '8px 16px' } }}
                hoverable
                cover={
                  <div className='h-[300px] overflow-hidden'>
                    <Image
                      height={300}
                      src={`http://localhost:3000/${book.cover}`}
                      fallback=''
                      placeholder
                    />
                  </div>
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
                  <div className='text-x truncate' title={book.description}>
                    {book.description}
                  </div>
                  <div className='mt-auto flex justify-end gap-[12px]'>
                    <EditOutlined
                      style={{ fontSize: 18, color: '#1677ff' }}
                      onClick={() => {
                        setUpdateId(book.id);
                        setUpdateBookModalOpen(true);
                      }}
                    />
                    <Popconfirm
                      title='图书删除'
                      description='确认删除吗？'
                      onConfirm={() => handleDelete(book.id)}
                      okText='Yes'
                      cancelText='No'
                    >
                      <DeleteOutlined
                        style={{ fontSize: 18, color: '#ff4d4f' }}
                      />
                    </Popconfirm>
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
      <UpdateBookModal
        id={updateId}
        isOpen={isUpdateBookModalOpen}
        handleClose={() => {
          setUpdateBookModalOpen(false);
          fetchData();
        }}
      ></UpdateBookModal>
    </div>
  );
}
