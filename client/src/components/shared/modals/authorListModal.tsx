import React from "react";
import CommonModal from "./commonModal";

export interface AuthorListModalProps {
  visible: boolean;
  onSubmit: (value: any) => void;
  onCancel: () => void;
}

const AuthorListModal: React.FC<AuthorListModalProps> = ({
  visible, onSubmit, onCancel
}) => {
  return (
    <CommonModal
      visible={visible}
      title="Выбрать автора"
      acceptButtonText="Выбрать"
      onAcceptClick={() => onSubmit('atata')}
      onCancelClick={onCancel}
    >
      AuthorListModal
    </CommonModal>
  )
}

export default AuthorListModal;