import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCategoriesQuery } from '../../store/services/categoriesApi';
import CrudList from '../shared/crudList';

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

  const requestError = error as any;

  return (<CrudList
    title="Список категорий"
    createLink="/category/create"
    createButtonText="Добавить категорию"

    tableHeaders={columns}
    isLoading={isLoading}
    data={data?.list || []}
    pagination={{
      currentPage: data?.page || 1,
      pageSize: data?.rowsPerPage || 1,
      total: data?.total || 1,
      onChange: (changedPage) => {
        window.history.replaceState(null, '', `${changedPage}`);
        setCurrentPage(changedPage);
      }
    }}
    getListError={requestError ? {
      title: 'Ошибка при получении данных категорий',
      details: requestError.data.message,
      onRetryClick: () => {
        refetch();
      }
    } : undefined}
    actionLinks={{
      detailsLink: id => `/category/${id}`,
      editLink: id => `/category/${id}/edit`,
      deleteLink: id => `/category/${id}/delete`
    }}
    actionClickHandlers={{
      deleteClick: (id) => { console.log('DELETED', id) },
      editClick: (id) => { console.log('EDITED', id) },
      detailsClick: (id) => { console.log('DETAILS', id) },
    }}
  />);
}

export default Categories