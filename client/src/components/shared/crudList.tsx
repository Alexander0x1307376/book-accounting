import React from 'react';
import { Divider, Row, Space, Typography } from 'antd';
import ButtonRouterLink from './buttonRouterLink';
import AdvancedTable from './advancedTable';
const { Title } = Typography;

type Headers = {
  key: string,
  dataIndex: string,
  title: string
}[];

export interface CrudListProps {
  title: string,
  tableHeaders: Headers,

  data: any[],
  pagination: {
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
    onRetryClick: () => void
  },

  actionLinks?: {
    detailsLink?: (id: string) => string,
    editLink?: (id: string) => string,
    deleteLink?: (id: string) => string,
  },
  actionClickHandlers?: {
    detailsClick?: (id: string) => void,
    editClick?: (id: string) => void,
    deleteClick?: (id: string) => void,
  }

}


const CrudList: React.FC<CrudListProps> = ({
  title,
  tableHeaders,
  isLoading,

  data,
  pagination,

  getListError,
  createLink,
  createButtonText,

  actionLinks,
  actionClickHandlers
}) => {
  return (<>
    <Title>{title}</Title>
    <Row justify="start">
      <Space>
        <ButtonRouterLink to={createLink} type="primary">
          {createButtonText}
        </ButtonRouterLink>
      </Space>
      <Divider />
    </Row>
    <AdvancedTable
      recordIdentifier='uuid'
      headers={tableHeaders}
      rowsList={data}
      loading={isLoading}
      error={getListError}
      pagination={pagination}
      actionLinks={actionLinks}
      actionClickHandlers={actionClickHandlers}
    />
  </>);
}

export default CrudList;