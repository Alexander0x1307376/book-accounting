import React from "react";
import { Modal, Button, Form } from "antd";
import EditCategoryForm from "../forms/editCategoryForm";

export interface CreateCategoryModalProps {
  visible: boolean;
  onSubmit: (value: any) => void;
  onCancel: () => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  visible,
  onSubmit,
  onCancel,
}: CreateCategoryModalProps) => {

  const [form] = Form.useForm();

  // при тыке по "Создать категорию"
  const handleCreateCategory = () => { 
    form
      .validateFields()
      .then((values: any) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  return (
    <Modal 
      title="Добавить категорию" 
      visible={visible}
      maskClosable={false}
      closable={false}
      footer={[
        <Button key="accept" type="primary" onClick={handleCreateCategory}>Создать категорию</Button>,
        <Button key="cancel" onClick={onCancel}>Отмена</Button>,
      ]}
    >
      <EditCategoryForm 
        form={form}
        onSubmit={onSubmit}
        withoutSubmitButton
        formLayout="vertical"
      />
    </Modal>
  );
}

export default CreateCategoryModal;