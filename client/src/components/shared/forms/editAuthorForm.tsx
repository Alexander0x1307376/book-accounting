import React from "react";
import { Form, Input, Button, DatePicker, FormInstance } from "antd";
import { AuthorInput } from "../../../types";
import moment from 'moment';

type LayoutType = Parameters<typeof Form>[0]['layout'];

interface EditAuthorFormProps {
  recordData?: AuthorInput;
  onSubmit: (values: AuthorInput) => void;
  formLayout?: LayoutType;
  withoutSubmitButton?: boolean;
  form?: FormInstance<AuthorInput>;
}

const dateFormat = "YYYY-MM-DD";


const EditAuthorForm: React.FC<EditAuthorFormProps> = ({
  recordData, onSubmit, formLayout, form, withoutSubmitButton
}: EditAuthorFormProps) => {

  const layout = (formLayout === "horizontal") ? {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  } : undefined;
  const tailLayout = (formLayout === "horizontal") ? {
    wrapperCol: { offset: 3, span: 16 },
  } : undefined;


  const onFinish = (values: any): void => {
    const submitData = {
      ...values,
      birthDate: values.birthDate ? values.birthDate.format(dateFormat) : undefined,
      deathDate: values.deathDate ? values.deathDate.format(dateFormat) : undefined
    };
    onSubmit(submitData);
  };




  const initialValues = recordData ? {
    name: recordData.name,
    description: recordData.description,
    birthDate: moment(recordData.birthDate),
    deathDate: moment(recordData.deathDate)
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
        label="Имя автора"
        name="name"
        rules={[{ required: true, message: "Имя автора обязательно!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="birthDate" label="Дата рождения">
        <DatePicker format={dateFormat} />
      </Form.Item>

      <Form.Item name="deathDate" label="Дата смерти">
        <DatePicker format={dateFormat} />
      </Form.Item>

      <Form.Item name="description" label="Описание">
        <Input.TextArea />
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

export default EditAuthorForm;
