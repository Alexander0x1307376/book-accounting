import { Form, Input, Button, Checkbox } from 'antd';
import { FC } from 'react';


type FieldsData = {
  login: string,
  password: string,
  rememberMe: boolean
}

export interface LoginFormProps {
  onFinish: (values: FieldsData) => void,
  onError?: (error: any) => void
} 

const LoginForm: FC<LoginFormProps> = ({onFinish, onError}) => {

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      // wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onError}
      autoComplete="off"
    >
      <Form.Item
        label="Логин"
        name="login"
        rules={[{ required: true, message: 'Поле логина должно быть заполнено' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Поле пароля должно быть заполнено' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item 
        name="remember" 
        valuePropName="checked" 
        // wrapperCol={{ 
        //   // offset: 4, 
        //   // span: 8
        // }}
      >
        <Checkbox>Запомнить меня</Checkbox>
      </Form.Item>

      <Form.Item 
        // wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;