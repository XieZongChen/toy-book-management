import { Button, Card, Form, Input, message } from 'antd';
import { login } from '../services';

interface LoginUser {
  username: string;
  password: string;
}

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export function Login() {
  const onFinish = async (values: LoginUser) => {
    try {
      const res = await login(values.username, values.password);

      if (res.status === 201 || res.status === 200) {
        message.success('登录成功');

        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  };

  return (
    <div
      id='login-container'
      className='h-[100vh] flex flex-col justify-center items-center'
    >
      <div className='w-[500px] px-[50px] py-[80px] border border-gray-200 rounded-2xl flex flex-col items-center gap-[60px]'>
        <h1 className='text-4xl font-bold tracking-wider'>图书管理系统</h1>
        <Form
          {...layout1}
          onFinish={onFinish}
          colon={false}
          autoComplete='off'
          className='w-full'
        >
          <Form.Item
            label='用户名'
            name='username'
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...layout2}>
            <div className='flex justify-center'>
              <a href='/register'>没有账号？去注册</a>
            </div>
          </Form.Item>

          <Form.Item {...layout2} className='flex justify-center'>
            <Button className='w-full' type='primary' htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
