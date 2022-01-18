import React from 'react';
import { Divider, Row, Space, Typography, TableProps } from 'antd';
import ButtonRouterLink from './buttonRouterLink';
import AdvancedTable from './advancedTable';
const { Title } = Typography;

type Headers = {
  key: string,
  dataIndex: string,
  title: string
}[];

export interface CrudListProps {

  tableProps?: TableProps<any>,

  recordIdentifier?: string,

  title: string,
  tableHeaders: Headers,

  data: any[],
  pagination?: {
    currentPage: number,
    pageSize: number,
    total: number,
    onChange: (page: number) => void
  },

  isLoading: boolean,

  createLink: string,
  createButtonText: string,

  getListError?: {
    title: string;
    details: string;
    onRetryClick?: () => void
  },
  
  actionClickHandlers?: {
    detailsClick?: (id: string) => void,
    editClick?: (id: string) => void,
    deleteClick?: (id: string) => void,
  },

  headerSlot?: React.ReactNode

}


const CrudList: React.FC<CrudListProps> = ({
  tableProps,
  recordIdentifier,
  title,
  tableHeaders,
  isLoading,
  data,
  pagination,
  getListError,
  createLink,
  createButtonText,
  actionClickHandlers,
  headerSlot
}) => {
  return (<>
    <Title>{title}</Title>
    <Row justify="end">
      <Space>
        {headerSlot}
        <ButtonRouterLink to={createLink} type="primary">
          {createButtonText}
        </ButtonRouterLink>
      </Space>
      <Divider />
    </Row>
    <AdvancedTable
      tableProps={tableProps}
      recordIdentifier={recordIdentifier || 'uuid'}
      headers={tableHeaders}
      rowsList={data}
      loading={isLoading}
      error={getListError}
      pagination={pagination}
      actionClickHandlers={actionClickHandlers}
    />
  </>);
}

export default CrudList;