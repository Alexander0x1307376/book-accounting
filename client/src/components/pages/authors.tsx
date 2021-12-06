import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthorsQuery } from '../../store/services/authorsApi';
import AdvancedTable from '../shared/advancedTable';
import { Divider, Row, Space, Typography } from 'antd';
import ButtonRouterLink from '../shared/buttonRouterLink';
const { Title } = Typography;


const columns = [
  {
    key: 'uuid',
    dataIndex: 'uuid',
    title: 'ID'
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Имя'
  },
  {
    key: 'birthDate',
    dataIndex: 'birthDate',
    title: 'Дата рождения'
  },
  {
    key: 'deathDate',
    dataIndex: 'deathDate',
    title: 'Дата смерти'
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: 'Дата создания'
  },
  {
    key: 'updatedAt',
    dataIndex: 'updatedAt',
    title: 'Дата обновления'
  },
];

const Authors: FC = () => {

  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(page ? +page : 1);
  const { data, error, isLoading, refetch } = useAuthorsQuery(currentPage);

  const requestError = error as any;

  return (<>
    <Title>Список авторов</Title>
    <Row justify="start">
      <Space>
        <ButtonRouterLink to="/author/create" type="primary">
          Добавить автора
        </ButtonRouterLink>
      </Space>
      <Divider />
    </Row>
    <AdvancedTable
      recordIdentifier='uuid'
      headers={columns}
      rowsList={data?.list || []}
      loading={isLoading}
      error={requestError ? {
        title: 'Ошибка при получении данных авторов',
        details: requestError.data.message,
        onRetryClick: () => {
          console.log(error);
          refetch();
        }
      } : undefined}
      pagination={{
        currentPage: data?.page || 1,
        pageSize: data?.rowsPerPage || 1,
        total: data?.total || 1,
        onChange: (changedPage) => {
          window.history.replaceState(null, '', `${changedPage}`);
          setCurrentPage(changedPage);
        }
      }}
      rowActions={{
        detailsLink: identifier => `/author/${identifier}`,
        editLink: identifier => `/author/${identifier}/edit`,
        deleteLink: identifier => `/author/${identifier}/delete`
      }}
      deleteModalWindow={{
        title: 'Удаление автора',
        okText: 'Удалить',
        cancelText: 'Отмена'
      }}
    />
  </>)
}

export default Authors