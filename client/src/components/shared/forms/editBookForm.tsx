import React from "react";
import { BookInput } from "../../../types";
import { Form, Input, Button, FormInstance } from "antd";
import CategoryForeignField from "../foreignFIeld/categoryForeignField";

type LayoutType = Parameters<typeof Form>[0]['layout'];


interface EditBookFormProps {
  recordData?: BookInput;
  onSubmit?: (values: BookInput) => void;
  formLayout?: LayoutType;
  withoutSubmitButton?: boolean;
  form?: FormInstance<any>;
}


const EditBookForm: React.FC<EditBookFormProps> = ({
  recordData,
  onSubmit,
  formLayout = "horizontal",
  withoutSubmitButton,
  form
}) => {


  const layout = (formLayout === "horizontal") ? {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  } : undefined;
  const tailLayout = (formLayout === "horizontal") ? {
    wrapperCol: { offset: 3, span: 16 },
  } : undefined;

  const onFinish = (values: any): void => onSubmit?.(values);

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
      form={form}
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

      {
        !withoutSubmitButton
          ? (<Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>) 
        : null
      }
      
    </Form>
  );
}

export default EditBookForm;