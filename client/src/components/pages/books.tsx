import React, { FC, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

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
    getListError={error ? {
      title: 'Ошибка!',
      details: 'Не удалось загрузить данные книг',
      onRetryClick: () => refetch()
    } : undefined}
    actionClickHandlers={{
      editClick: (id) => navigate(`/book/${id}/edit`),
      detailsClick: (id) => navigate(`/book/${id}`),
      deleteClick: (id) => deleteBook(id),
    }}
  />);
}

export default Books