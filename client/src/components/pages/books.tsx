import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useBooksQuery } from '../../store/services/booksApi';
import AdvancedTable from '../shared/advancedTable';

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
  }
];

const Books: FC = () => {

  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(page ? +page : 1);
  const { data, error, isLoading, refetch } = useBooksQuery(currentPage);

  return (
    <AdvancedTable
      recordIdentifier='uuid'
      headers={columns}
      rowsList={data?.list || []}
      loading={isLoading}
      error={error ? {
        title: 'Ошибка при получении списка книг',
        details: 'Ошибка',
        onRetryClick: () => {
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
        detailsLink: identifier => `/book/${identifier}`,
        editLink: identifier => `/book/${identifier}/edit`,
        deleteLink: identifier => `/book/${identifier}/delete`
      }}
      deleteModalWindow={{
        title: 'Удаление книги',
        okText: 'Удалить',
        cancelText: 'Отмена'
      }}
    />
  )
}

export default Books