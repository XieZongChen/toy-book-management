import { Form, Input, message, Modal } from 'antd';
import { create, ICreateBook } from '@/services/book';
import { CoverUpload } from './CoverUpload';

interface CreateBookModalProps {
  isOpen: boolean;
  handleClose: () => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export function CreateBookModal(props: CreateBookModalProps) {
  const [form] = Form.useForm<ICreateBook>();

  const handleOk = async function () {
    await form.validateFields();

    const values = form.getFieldsValue();

    try {
      const res = await create(values);

      if (res.status === 201 || res.status === 200) {
        message.success('创建成功');
        form.resetFields();
        props.handleClose();
      }
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  };

  return (
    <Modal
      title='新增图书'
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={'创建'}
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
