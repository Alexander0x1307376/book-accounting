import { Form } from "antd";
import React from "react";
// import { AuthorInput } from "../../../types";
import EditAuthorForm from "../forms/editAuthorForm";
import CommonModal from "./commonModal";

export interface CreateAuthorModalProps {
  visible: boolean;
  onSubmit: (value: any) => void;
  onCancel: () => void;
}

const dateFormat = "YYYY-MM-DD";

const CreateAuthorModal: React.FC<CreateAuthorModalProps> = ({
  visible, onSubmit, onCancel
}) => {


  const [form] = Form.useForm();

  // при тыке по "Создать категорию"
  const handleCreateCategory = () => {
    form
      .validateFields()
      .then((values) => {

        const submitData = {
          ...values,
          birthDate: values.birthDate ? values.birthDate.format(dateFormat) : undefined,
          deathDate: values.deathDate ? values.deathDate.format(dateFormat) : undefined
        };

        onSubmit(submitData);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }


  return (
    <CommonModal 
      visible={visible}
      title="Создать автора"
      acceptButtonText="Создать автора"
      onAcceptClick={handleCreateCategory}
      onCancelClick={onCancel}
    >
      <EditAuthorForm 
        form={form}
        onSubmit={onSubmit}
        withoutSubmitButton
        formLayout="vertical"
      />
    </CommonModal>
  )
}

export default CreateAuthorModal;