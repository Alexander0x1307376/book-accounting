import React from "react";
import ButtonRouterLink from "./buttonRouterLink";
import { EditOutlined, DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export interface RecordActionButtonsProps {
  editLink?: string;
  deleteLink?: string;
  detailsLink?: string;
  onDetailsLinkClick?: () => void;
  onEditLinkClick?: () => void;
  onDeleteLinkClick?: () => void;
}
const RecordActionButtons: React.FC<RecordActionButtonsProps> = ({
  editLink,
  deleteLink,
  detailsLink,
  onEditLinkClick,
  onDetailsLinkClick,
  onDeleteLinkClick,
}: RecordActionButtonsProps) => {

  const handleEditLinkClick = (event: Event) => {
    if (!editLink)
      event.preventDefault();
    onEditLinkClick?.();
  }
  const handleDeleteLinkClick = (event: Event) => {
    if (!deleteLink)
      event.preventDefault();

    if (deleteLink && !!onDeleteLinkClick)
      event.preventDefault();

    onDeleteLinkClick?.();
  }
  const handleDetailsLinkClick = (event: Event) => {
    if (!detailsLink)
      event.preventDefault();
    onDetailsLinkClick?.();
  }

  return (
    <Space size="middle">
      {
        detailsLink 
        ? <RenderButton to={detailsLink} onClick={handleDetailsLinkClick} type="ghost">
          <FileTextOutlined />
        </RenderButton>
        : null
      }
      <RenderButton 
        to={editLink} 
        onClick={handleEditLinkClick} 
        type="primary"
      >
        <EditOutlined />
      </RenderButton>
      
      <RenderButton
        to={deleteLink}
        type="primary"
        danger
        onClick={handleDeleteLinkClick}
      >
        <DeleteOutlined />
      </RenderButton>
    </Space>
  );
};


interface RenderButtonProps {
  children: React.ReactNode,
  type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default",
  danger?: boolean,
  to?: string,
  onClick: (event: any) => void
}

const RenderButton: React.FC<RenderButtonProps> = ({ 
  to, onClick, children, danger, type = "primary"}) => {
  return (
    !to
    ? <Button type={type} onClick={onClick} danger={danger}>
      {children}
    </Button>

    : <ButtonRouterLink to={to} onClick={onClick} type={type} danger={danger}>
      {children}
    </ButtonRouterLink>
  );
}



export default RecordActionButtons;
