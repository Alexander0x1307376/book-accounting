import React from "react";
import { Form } from "antd";
import EditCategoryForm from "../forms/editCategoryForm";
import CommonModal from "./commonModal";
import { CategoryInput } from "../../../types";

export interface CreateCategoryModalProps {
  visible: boolean;
  onSubmit: (value: CategoryInput) => void;
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
      .then((values: CategoryInput) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  return (
    <CommonModal 
      title="Добавить категорию" 
      visible={visible}
      acceptButtonText="Создать категорию"
      onAcceptClick={handleCreateCategory}
      onCancelClick={onCancel}
    >
      <EditCategoryForm 
        form={form}
        onSubmit={onSubmit}
        withoutSubmitButton
        formLayout="vertical"
      />
    </CommonModal>
  );
}

export default CreateCategoryModal;