import React from "react";
import ButtonRouterLink from "./buttonRouterLink";
import { EditOutlined, DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import { Space } from "antd";

export interface RecordActionButtonsProps {
  editLink: string;
  deleteLink: string;
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
        detailsLink ?
          (<ButtonRouterLink to={detailsLink || ''} onClick={handleDetailsLinkClick} type="ghost">
            <FileTextOutlined />
          </ButtonRouterLink>) : null
      }
      <ButtonRouterLink to={editLink} onClick={handleEditLinkClick} type="primary">
        <EditOutlined />
      </ButtonRouterLink>
      <ButtonRouterLink
        to={deleteLink}
        type="primary"
        danger
        onClick={handleDeleteLinkClick}
      >
        <DeleteOutlined />
      </ButtonRouterLink>
    </Space>
  );
};

export default RecordActionButtons;
