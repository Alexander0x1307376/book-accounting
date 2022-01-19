import React, { useEffect, useMemo } from "react";
import { Form, Input, Button, DatePicker, FormInstance, Row, Col, Space } from "antd";
import { AuthorInput } from "../../../types";
import moment from 'moment';
import { useForm } from "antd/lib/form/Form";

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
  recordData, onSubmit, formLayout, withoutSubmitButton, form
}: EditAuthorFormProps) => {

  // #region лейаут
  const layout = (formLayout === "horizontal") ? {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  } : undefined;
  const tailLayout = (formLayout === "horizontal") ? {
    wrapperCol: { offset: 3, span: 16 },
  } : undefined;
  // #endregion


  const onFinish = (values: any): void => {
    const submitData = {
      ...values,
      birthDate: values.birthDate ? values.birthDate.format(dateFormat) : undefined,
      deathDate: values.deathDate ? values.deathDate.format(dateFormat) : undefined
    };
    onSubmit(submitData);
  };

  useEffect(() => {
    
    const initialValues = recordData ? {
      name: recordData.name,
      description: recordData.description,
      birthDate: recordData.birthDate ? moment(recordData.birthDate) : undefined,
      deathDate: recordData.deathDate ? moment(recordData.deathDate) : undefined
    } : undefined;

    form?.setFieldsValue(initialValues as Partial<AuthorInput>);

  }, [recordData, form]);




  return (
    <Form
      form={form}
      {...layout}
      layout={formLayout || "horizontal"}
      onFinish={onFinish}
    >
      <Form.Item
        label="Имя автора"
        name="name"
        rules={[{ required: true, message: "Имя автора обязательно!" }]}
      >
        <Input />
      </Form.Item>

      <Row>
        <Col span={12}>
          <Form.Item name="birthDate" label="Дата рождения" style={{ paddingRight: '6px' }}>
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="deathDate" label="Дата смерти" style={{ paddingLeft: '6px' }}>
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Описание">
        <Input.TextArea autoSize={{
          minRows: 5,
          maxRows: 20
        }} />
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
