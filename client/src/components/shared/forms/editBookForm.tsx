import React from "react";
import { BookInput } from "../../../types";
import { Form, Input, Button } from "antd";
import OneToManyField from "../foreignFIeld/oneToManyField";
import CategoryForeignField from "../foreignFIeld/categoryForeignField";

type LayoutType = Parameters<typeof Form>[0]['layout'];


const data = [
  {
    id: '111',
    name: 'История'
  },
  {
    id: '222',
    name: 'История России'
  },
  {
    id: '333',
    name: 'Химия'
  },
  {
    id: '444',
    name: 'История химии'
  },
  {
    id: '555',
    name: 'История химии для детей'
  },
]



interface EditBookFormProps {
  recordData?: BookInput;
  onSubmit: (values: BookInput) => void;
  formLayout?: LayoutType;
}

const EditBookForm: React.FC<EditBookFormProps> = ({
  recordData,
  onSubmit,
  formLayout = "horizontal"
}) => {

  const layout = (formLayout === "horizontal") ? {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  } : undefined;
  const tailLayout = (formLayout === "horizontal") ? {
    wrapperCol: { offset: 3, span: 16 },
  } : undefined;

  const onFinish = (values: any): void => {
    // onSubmit(values);
    console.log(values)
  }

  const initialValues = recordData ? {
    name: recordData.name,
    description: recordData.description,
  } : undefined;

  return (
    <Form
      {...layout}
      layout={formLayout}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        label="Название книги"
        name="name"
        rules={[{ required: true, message: "Название книги обязательно!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ISBN"
        name="isbn"
        rules={[{ required: true, message: "ISBN должен быть обязателен!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Категория"
        name="category"
      >
        <CategoryForeignField />
      </Form.Item>

      <Form.Item name="description" label="Описание">
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditBookForm;