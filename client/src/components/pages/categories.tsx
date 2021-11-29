import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCategoriesQuery } from '../../store/services/categoriesApi';
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

const Categories: FC = () => {

  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(page ? +page : 1);
  const { data, error, isLoading, refetch } = useCategoriesQuery(currentPage);

  return (
    <AdvancedTable
      recordIdentifier='uuid'
      headers={columns}
      rowsList={data?.list || []}
      loading={isLoading}
      error={error ? {
        title: 'Ошибка при получении списка категорий',
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
        detailsLink: identifier => `/category/${identifier}`,
        editLink: identifier => `/category/${identifier}/edit`,
        deleteLink: identifier => `/category/${identifier}/delete`
      }}
      deleteModalWindow={{
        title: 'Удаление категории',
        okText: 'Удалить',
        cancelText: 'Отмена'
      }}
    />
  )
}

export default Categories