import { Button, Modal } from 'antd';
import React from 'react';



export interface CommonModalProps {
  visible: boolean;
  title: string;
  acceptButtonText?: string;
  isAcceptButtonDisabled?: boolean;
  onAcceptClick?: () => void;
  onCancelClick?: () => void;
  children: React.ReactNode;
}

const CommonModal: React.FC<CommonModalProps> = ({
  visible, title,
  isAcceptButtonDisabled, 
  acceptButtonText = "Принять", 
  onAcceptClick, onCancelClick, 
  children
}) => {
  return <Modal
    title={title}
    visible={visible}
    maskClosable={false}
    closable={false}
    footer={[
      <Button key="accept" type="primary" disabled={isAcceptButtonDisabled} onClick={onAcceptClick}>{acceptButtonText}</Button>,
      <Button key="cancel" onClick={onCancelClick}>Отмена</Button>,
    ]}
  >
    {children}
  </Modal>
}

export default CommonModal;