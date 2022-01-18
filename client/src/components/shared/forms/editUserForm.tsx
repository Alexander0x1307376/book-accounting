import React from "react";
import { Form, Input, Button, FormInstance } from "antd";
import { UserInput } from "../../../types";

type LayoutType = Parameters<typeof Form>[0]['layout'];

interface EditUserFormProps {
  recordData?: UserInput;
  onSubmit: (values: UserInput) => void;
  formLayout?: LayoutType;
  withoutSubmitButton?: boolean;
  form?: FormInstance<UserInput>;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  recordData, onSubmit, formLayout, form, withoutSubmitButton
}: EditUserFormProps) => {

  const layout = (formLayout === "horizontal") ? {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  } : undefined;
  const tailLayout = (formLayout === "horizontal") ? {
    wrapperCol: { offset: 3, span: 16 },
  } : undefined;


  const onFinish = (values: any): void => {
    onSubmit(values);
  };

  const initialValues = recordData ? {
    name: recordData.name,
    email: recordData.email,
  } : undefined;


  return (
    <Form
      form={form}
      {...layout}
      layout={formLayout || "horizontal"}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        label="Имя пользователя"
        name="name"
        rules={[{ required: true, message: "Имя автора обязательно!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email"
        rules={[
          { required: true, message: "Email обязателен!" },
          { type: 'email', message: "Это должен быть email!" }
        ]}
      >
        <Input />
      </Form.Item>

      {withoutSubmitButton ? null : (
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default EditUserForm;
