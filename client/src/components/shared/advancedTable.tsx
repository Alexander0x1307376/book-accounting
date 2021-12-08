import React from "react";
import { Alert, Button,  Table } from "antd";
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
  recordIdentifier?: string;

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

  actionLinks?: {
    detailsLink?: (id: string) => string,
    editLink?: (id: string) => string,
    deleteLink?: (id: string) => string,
  };
  actionClickHandlers?: {
    detailsClick?: (id: string) => void,
    editClick?: (id: string) => void,
    deleteClick?: (id: string) => void,
  };
}

const NewAdvancedTable: React.FC<AdvancedTableProps> = ({ 
  rowsList,
  error,
  loading,
  pagination,
  headers, 
  actionLinks, 
  actionClickHandlers,
  recordIdentifier = "id"
}) => {

  const actions = {
    title: "Действия",
    key: "action",
    render: (text: any, record: any) => {
      const actionButtonProps: RecordActionButtonsProps = {
        detailsLink: actionLinks?.detailsLink?.(record[recordIdentifier]) || undefined,
        editLink: actionLinks?.editLink?.(record[recordIdentifier]) || undefined,
        deleteLink: actionLinks?.deleteLink?.(record[recordIdentifier]) || undefined,
        onDeleteLinkClick: () => actionClickHandlers?.deleteClick?.(record[recordIdentifier]),
        onDetailsLinkClick: () => actionClickHandlers?.detailsClick?.(record[recordIdentifier]),
        onEditLinkClick: () => actionClickHandlers?.editClick?.(record[recordIdentifier]),
      };
      const actionButtons = <RecordActionButtons {...actionButtonProps} />;
      return actionButtons;
    },
  };

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
  </>
};

export default NewAdvancedTable;