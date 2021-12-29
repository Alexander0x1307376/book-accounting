import React from "react";
import { Form, Button, Input, FormInstance } from "antd";
import moment from 'moment';
import { CategoryInput as CategoryInputType, FullCategoryInput } from "../../../types";
import CategoryInput from "../foreignField/categoryInput";

type LayoutType = Parameters<typeof Form>[0]['layout'];

interface EditCategoryFormProps {
  recordData?: any;
  onSubmit: (values: CategoryInputType) => void;
  formLayout?: LayoutType;
  withoutSubmitButton?: boolean;
  form?: FormInstance<FullCategoryInput>;
  withoutCreateParent?: boolean;
}


const EditCategoryForm: React.FC<EditCategoryFormProps> = ({
  recordData,
  onSubmit,
  formLayout,
  withoutSubmitButton,
  withoutCreateParent,
  form
}: EditCategoryFormProps) => {

  const layout = (formLayout === "horizontal") ? {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  } : undefined;
  const tailLayout = (formLayout === "horizontal") ? {
    wrapperCol: { offset: 3, span: 16 },
  } : undefined;

  
  const initialValues = recordData ? {
    name: recordData.name,
    description: recordData.description,
    birthDate: moment(recordData.birthDate),
    deathDate: moment(recordData.deathDate)
  } : undefined;


  return (
    <Form
      {...layout}
      layout={formLayout || "horizontal"}
      initialValues={initialValues}
      onFinish={onSubmit}
      form={form}
    >
      <Form.Item
        label="Имя категории"
        name="name"
        rules={[{ required: true, message: "Имя категории обязательно!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Родительская категория"
        name="parent"  
      >
        <CategoryInput withoutCreateLogic={withoutCreateParent} />
      </Form.Item>

      <Form.Item name="description" label="Описание">
        <Input.TextArea />
      </Form.Item>

      {
        !withoutSubmitButton
        ? <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
        : null
      }
      
    </Form>
  );
};

export default EditCategoryForm;
