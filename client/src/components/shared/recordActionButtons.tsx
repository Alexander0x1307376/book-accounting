import React from "react";
import { EditOutlined, DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export interface RecordActionButtonsProps {
  onDetailsLinkClick?: () => void;
  onEditLinkClick: () => void;
  onDeleteLinkClick: () => void;
}
const RecordActionButtons: React.FC<RecordActionButtonsProps> = ({
  onEditLinkClick,
  onDetailsLinkClick,
  onDeleteLinkClick,
}: RecordActionButtonsProps) => {

  return (
    <Space size="middle">
      {
        onDetailsLinkClick
        ? <Button 
          onClick={onDetailsLinkClick} type="ghost"
          icon={<FileTextOutlined />}
          shape="circle"
        /> 
        : null
      }
      <Button 
        onClick={onEditLinkClick} 
        icon={<EditOutlined />}
        type="primary"
        shape="circle"
      />
      
      <Button
        type="primary"
        danger
        onClick={onDeleteLinkClick}
        icon={<DeleteOutlined />}
        shape="circle"
      />
        
    </Space>
  );
};

export default RecordActionButtons;
