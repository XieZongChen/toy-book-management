import { useCallback, useEffect } from 'react';
import { Form, Input, Modal, message } from 'antd';
import { detail, IBook, update } from '@/services/book';
import { CoverUpload } from './CoverUpload';

interface UpdateBookModalProps {
  id: number;
  isOpen: boolean;
  handleClose: () => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export function UpdateBookModal(props: UpdateBookModalProps) {
  const [form] = Form.useForm<IBook>();

  const handleOk = async function () {
    await form.validateFields();

    const values = form.getFieldsValue();

    try {
      const res = await update({ ...values, id: props.id });

      if (res.status === 201 || res.status === 200) {
        message.success('更新成功');
        props.handleClose();
      }
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  };

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
