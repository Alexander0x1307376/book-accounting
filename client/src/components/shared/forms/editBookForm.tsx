import React, { useEffect, useMemo } from "react";
import { BookInput, FullBookInput } from "../../../types";
import { Form, Input, Button, FormInstance } from "antd";
import CategoryInput from "../relationField/categoryInput";
import AuthorsInput from "../relationField/authorsInput";

type LayoutType = Parameters<typeof Form>[0]['layout'];


interface EditBookFormProps {
  recordData?: FullBookInput;
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

  const onFinish = (values: any): void => {
    onSubmit?.({
      isbn: values.isbn,
      name: values.name,
      description: values.description,
      categoryId: values.category.value,
      authorsIds: values.authors.map(({ value }: any) => value)
    })
  };


  useEffect(() => {

    const initialValues = {
      ...recordData,
      category: {
        value: recordData?.category?.uuid,
        label: recordData?.category?.name,
      },
      authors: recordData?.authors?.map(({ uuid, name }) => ({
        value: uuid,
        label: name
      })) || []
    };

    form?.setFieldsValue(initialValues);

  }, [recordData]);


  return (
    <Form
      {...layout}
      layout={formLayout}
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
        <CategoryInput />
      </Form.Item>
      <Form.Item
        label="Авторы"
        name="authors"
      >
        <AuthorsInput />
      </Form.Item>

      <Form.Item name="description" label="Описание">
        <Input.TextArea autoSize={{
          minRows: 5,
          maxRows: 20
        }}/>
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