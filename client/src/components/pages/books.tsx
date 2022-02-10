import React, { FC, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useBooksQuery, useDeleteBookMutation } from '../../store/services/booksApi';
import changeListPage from '../../utils/changeListPage';
import CrudLayout from '../shared/crudLayout';


const Books: FC = () => {
  const { id } = useParams<any>();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading, refetch } = useBooksQuery(currentPage);

  const [ deleteBook ] = useDeleteBookMutation();

  return (
    <CrudLayout
      title="Книги"
      createLink="create"
      createButtonText="Добавить книгу"
      tableProps={{
        pagination: {
          showSizeChanger: false,
          position: ['topRight', 'bottomRight'],
          current: data?.page || 1,
          pageSize: data?.rowsPerPage || 1,
          total: data?.total || 1,
          onChange: (changedPage) => {
            const newUrl = changeListPage(location.pathname, changedPage);
            setCurrentPage(changedPage);
            navigate(newUrl);
          }
        },
        rowSelection: {
          type: 'radio',
          selectedRowKeys: [id] as React.Key[],
          renderCell: () => undefined,
          columnWidth: 0
        }
      }}
      isLoading={isLoading}
      data={data?.list || []}
      getListError={error ? {
        title: 'Ошибка!',
        details: 'Не удалось загрузить данные книг',
        onRetryClick: () => refetch()
      } : undefined}
      actionClickHandlers={{
        editClick: (id) => navigate(`${id}/edit`),
        detailsClick: (id) => navigate(`${id}`),
        deleteClick: (id) => deleteBook(id),
      }}
    />
  );
}

export default Books