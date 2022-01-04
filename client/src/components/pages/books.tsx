import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useBooksQuery, useDeleteBookMutation } from '../../store/services/booksApi';
import CrudList from '../shared/crudList';

const columns = [
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

  const requestError = error as any;


  const [ deleteBook ] = useDeleteBookMutation();


  return (<CrudList
    title="Список книг"
    createLink="/book/create"
    createButtonText="Добавить книгу"

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
      title: 'Ошибка при получении данных книг',
      details: requestError.data.message,
      onRetryClick: () => {
        refetch();
      }
    } : undefined}
    actionLinks={{
      detailsLink: id => `/book/${id}`,
      editLink: id => `/book/${id}/edit`,
      deleteLink: id => `/book/${id}/delete`
    }}
    actionClickHandlers={{
      deleteClick: async (id) => { 
        await deleteBook(id);
        console.log('DELETED', id) 
      },
      editClick: (id) => { console.log('EDITED', id) },
      detailsClick: (id) => { console.log('DETAILS', id) },
    }}
  />);
}

export default Books