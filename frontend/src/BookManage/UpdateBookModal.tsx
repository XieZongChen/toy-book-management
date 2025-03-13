import { useCallback, useEffect } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CoverUpload } from './CoverUpload';
import { detail } from '../services';

interface UpdateBookModalProps {
  id: number;
  isOpen: boolean;
  handleClose: () => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface UpdateBook {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

export function UpdateBookModal(props: UpdateBookModalProps) {
  const [form] = useForm<UpdateBook>();

  const handleOk = async function () {};

  const query = useCallback(async () => {
    if (!props.id) {
      return;
    }
    try {
      const res = await detail(props.id);
      const { data } = res;
      if (res.status === 200 || res.status === 201) {
        form.setFieldValue('id', data.id);
        form.setFieldValue('name', data.name);
        form.setFieldValue('author', data.author);
        form.setFieldValue('description', data.description);
        form.setFieldValue('cover', data.cover);
      }
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  }, [form, props.id]);

  useEffect(() => {
    query();
  }, [query]);

  return (
    <Modal
      title='更新图书'
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={'更新'}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label='图书名称'
          name='name'
          rules={[{ required: true, message: '请输入图书名称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='作者'
          name='author'
          rules={[{ required: true, message: '请输入图书作者!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='描述'
          name='description'
          rules={[{ required: true, message: '请输入图书描述!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label='封面'
          name='cover'
          rules={[{ required: true, message: '请上传图书封面!' }]}
        >
          <CoverUpload></CoverUpload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
