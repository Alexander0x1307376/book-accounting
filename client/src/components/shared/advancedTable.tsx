import React, { useState } from "react";
import { Alert, Button, Modal, ModalProps, Table } from "antd";
import RecordActionButtons, { RecordActionButtonsProps } from "./recordActionButtons";

type Headers = {
  key: string,
  dataIndex: string,
  title: string
}[];

export interface AdvancedTableProps {
  headers: Headers;
  rowsList: any;
  loading: boolean;
  recordIdentifier?: string,
  error?: {
    title: string;
    details: string;
    onRetryClick: () => void
  };
  pagination: {
    currentPage: number,
    pageSize: number,
    total: number,
    onChange: (page: number) => void
  };
  rowActions: {
    detailsLink: (identifier: string) => string,
    editLink: (identifier: string) => string,
    deleteLink: (identifier: string) => string,
  };
  deleteModalWindow: {
    title: string;
    okText: string;
    cancelText: string;
  };
}

const AdvancedTable: React.FC<AdvancedTableProps> = ({ 
  rowsList,
  error,
  loading,
  pagination,
  headers, 
  rowActions, 
  deleteModalWindow,
  recordIdentifier = "id"
}) => {

  const actions = {
    title: "Действия",
    key: "action",
    render: (text: any, record: any) => {
      const actionButtonProps: RecordActionButtonsProps = {
        detailsLink: rowActions.detailsLink(record[recordIdentifier]),
        editLink: rowActions.editLink(record[recordIdentifier]),
        deleteLink: rowActions.deleteLink(record[recordIdentifier]),
        onDeleteLinkClick: () => setIsModalVisible(true),
      };
      const actionButtons = <RecordActionButtons {...actionButtonProps} />;
      return actionButtons;
    },
  };

  //#region модальное окно
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const modalViewData: ModalProps = {
    title: deleteModalWindow.title,
    okText: deleteModalWindow.okText,
    cancelText: deleteModalWindow.cancelText,
    onOk: () => {
      setIsModalVisible(false);
    },
    onCancel: () => {
      setIsModalVisible(false);
    },
  };
  //#endregion

  return <>
    {
      (error)
      ? <Alert 
        type="error" 
        message={error.title} 
        showIcon
        description={error.details}
        action={
          <Button danger onClick={error.onRetryClick}>Перезагрузить</Button>
        }
      />
      : <Table 
        rowKey={recordIdentifier || "id"}
        columns={[...headers, actions]}
        dataSource={rowsList}
        loading={loading}
        pagination={{
          current: pagination.currentPage,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page: number) => pagination.onChange(page),
        }}
      />
    }
    <Modal visible={isModalVisible} {...modalViewData}>
      <p>Удалить запись?</p>
    </Modal>
  </>
};

export default AdvancedTable;