import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { AuthorInput } from "../../types";
import moment from 'moment';

type LayoutType = Parameters<typeof Form>[0]['layout'];

interface EditAuthorFormProps {
  recordData?: Partial<AuthorInput>;
  onSubmit: (values: Partial<AuthorInput>) => void;
  formLayout?: LayoutType;
  form?: any;
  hiddenSubmitButton?: boolean
}

const dateFormat = "YYYY-MM-DD";

const EditAuthorForm: React.FC<EditAuthorFormProps> = ({
  recordData,
  onSubmit,
  formLayout,
  form
}: EditAuthorFormProps) => {

  const layout = (formLayout === "horizontal") ? {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  } : undefined;
  const tailLayout = (formLayout === "horizontal") ? {
    wrapperCol: { offset: 3, span: 16 },
  } : undefined;

  const onFinish = (values: any): void => {
    onSubmit({...values,
      birthDate: values.birthDate ? values.birthDate.format(dateFormat) : '',
      deathDate: values.deathDate ? values.deathDate.format(dateFormat) : ''
    } as Partial<AuthorInput>);
  };
  const onFinishFailed = () => { };

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
      onFinishFailed={onFinishFailed}
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

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditAuthorForm;
