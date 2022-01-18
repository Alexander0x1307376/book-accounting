import React from "react";
import { Alert, Button,  Table, TableProps } from "antd";
import RecordActionButtons, { RecordActionButtonsProps } from "./recordActionButtons";

type Headers = {
  key: string,
  dataIndex: string,
  title: string
}[];

export interface AdvancedTableProps {

  tableProps?: TableProps<any>

  headers: Headers;
  rowsList: any;
  loading: boolean;
  recordIdentifier?: string;

  error?: {
    title: string;
    details: string;
    onRetryClick?: () => void
  };

  pagination?: {
    currentPage: number,
    pageSize: number,
    total: number,
    onChange: (page: number) => void
  };
  actionClickHandlers?: {
    detailsClick?: (id: string) => void,
    editClick?: (id: string) => void,
    deleteClick?: (id: string) => void,
  };
}

const AdvancedTable: React.FC<AdvancedTableProps> = ({ 
  tableProps,
  rowsList,
  error,
  loading,
  pagination,
  headers, 
  actionClickHandlers,
  recordIdentifier = "id"
}) => {

  const actions = {
    title: "Действия",
    key: "action",
    width: 1,
    render: (text: any, record: any) => {
      const actionButtonProps: RecordActionButtonsProps = {
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
        action={error.onRetryClick 
          ? <Button danger onClick={error.onRetryClick}>Перезагрузить</Button> 
          : undefined
        }
      />
      : <Table 
        {...tableProps}
        rowKey={recordIdentifier || "id"}
        columns={[...headers, actions]}
        dataSource={rowsList}
        loading={loading}
        pagination={pagination ? {
          current: pagination.currentPage,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page: number) => pagination.onChange(page),
        }: undefined}
      />
    }
  </>
};

export default AdvancedTable;