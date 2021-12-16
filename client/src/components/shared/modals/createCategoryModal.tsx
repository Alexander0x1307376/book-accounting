import React from "react";
import { Modal, Button, Form, Input } from "antd";
import CategoryForeignField from "../foreignFIeld/categoryForeignField";

export interface CreateCategoryModalProps {
  visible: boolean;
  onSubmit: (value: any) => void;
  onCancel: () => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  visible,
  onSubmit,
  onCancel
}: CreateCategoryModalProps) => {


  // при тыке по "Создать категорию"
  const handleCreateCategory = () => {
    
  }

  const handleCancel = () => onCancel();

  return (
    <Modal 
      title="Добавить категорию" 
      visible={visible}
      maskClosable={false}
      closable={false}
      footer={[
        <Button key="accept" type="primary" onClick={handleCreateCategory}>Создать категорию</Button>,
        <Button key="cancel" onClick={handleCancel}>Отмена</Button>,
      ]}
    >
      <Form
        layout="vertical"
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
          name="category"  
        >
          <CategoryForeignField withoutCreateButton/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateCategoryModal;