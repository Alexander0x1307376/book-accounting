import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooksQuery, useDeleteBookMutation } from '../../store/services/booksApi';
import CrudLayout from '../shared/crudLayout';


const Books: FC = () => {
  const { id } = useParams<any>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading, refetch } = useBooksQuery(currentPage);

  const requestError = error as any;

  const navigate = useNavigate();

  const [ deleteBook ] = useDeleteBookMutation();


  return (
    <CrudLayout
      title="Книги"
      createLink="/books/create"
      createButtonText="Добавить книгу"
      tableProps={{
        rowSelection: {
          type: 'radio',
          selectedRowKeys: [id] as React.Key[],
          renderCell: () => undefined,
          columnWidth: 0
        }
      }}
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
        editClick: (id) => navigate(`/books/${id}/edit`),
        detailsClick: (id) => navigate(`/books/${id}`),
        deleteClick: (id) => deleteBook(id),
      }}
    />
  );
}

export default Books