import React from 'react';
import { Row, TableProps, Col, Card, PageHeader, notification, Button } from 'antd';
import ButtonRouterLink from './buttonRouterLink';
import AdvancedTable from './advancedTable';
import { Outlet } from 'react-router-dom';
import moment from 'moment';

type Headers = {
  key: string,
  dataIndex: string,
  title: string
}[];

export interface CrudLayoutProps {

  tableProps?: TableProps<any>,

  recordIdentifier?: string,

  title: string,
  tableHeaders?: Headers,

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


const renderDate = (text: string) => {
  const formatDate = 'DD-MM-YYYY, hh:mm:ss';
  const result = moment(text).format(formatDate);
  return result;
}

const defaultTableHeaders = [
  {
    key: 'uuid',
    dataIndex: 'uuid',
    title: 'UUID'
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Имя'
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Дата создания',
    render: renderDate
  },
  {
    key: 'updatedAt',
    dataIndex: 'updatedAt',
    title: 'Дата обновления',
    render: renderDate
  },
];


const CrudLayout: React.FC<CrudLayoutProps> = ({
  tableProps,
  recordIdentifier = 'uuid',
  title,
  tableHeaders = defaultTableHeaders,
  isLoading,
  data,
  pagination,
  getListError,
  createLink,
  createButtonText,
  actionClickHandlers,
  headerSlot
}) => {

  const openNotificationWithIcon = () => {
    notification.error({
      message: 'Ошибка',
      description:
        'При выполнении операции произошла ошибка.',
    });
  };

  return (<>
    <PageHeader 
      title={title} 
      style={{
        paddingLeft: '0',
        paddingRight: '0'
      }}
      extra={[
        <ButtonRouterLink key="1" to={createLink} type="primary">
          {createButtonText}
        </ButtonRouterLink>,
        <Button key="2" onClick={openNotificationWithIcon}>ошибка</Button>
      ]} 
    />
    <Row gutter={[16, 16]}>
      <Col span={14}>
        <AdvancedTable
          tableProps={tableProps}
          recordIdentifier={recordIdentifier}
          headers={tableHeaders}
          rowsList={data}
          loading={isLoading}
          error={getListError}
          pagination={pagination}
          actionClickHandlers={actionClickHandlers}
        />
      </Col>
      <Col span={10}>
        <Card>
          <Outlet />
        </Card>
      </Col>
    </Row>
  </>);
}

export default CrudLayout;