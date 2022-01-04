import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthorsQuery, useDeleteAuthorMutation } from '../../store/services/authorsApi';
import CrudList from '../shared/crudList';


const columns = [
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



  const [ deleteAuthor ] = useDeleteAuthorMutation();


  return (<CrudList 
    title="Список авторов"
    createLink="/author/create"
    createButtonText="Добавить автора"

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
      title: 'Ошибка при получении данных авторов',
      details: requestError.error,
      // details: requestError.data.message,
      onRetryClick: () => {
        refetch();
      }
    } : undefined}
    actionLinks={{
      detailsLink: id => `/author/${id}`,
      editLink: id => `/author/${id}/edit`,
      deleteLink: id => `/author/${id}/delete`
    }}
    actionClickHandlers={{
      deleteClick: async (id) => {
        await deleteAuthor(id);
        console.log('DELETED', id);
      },
    }}
  />);
}

export default Authors