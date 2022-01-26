import React, { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthorsQuery, useDeleteAuthorMutation } from '../../store/services/authorsApi';
import CrudLayout from '../shared/crudLayout';


// const columns = [
//   {
//     key: 'name',
//     dataIndex: 'name',
//     title: 'Имя'
//   },
//   {
//     key: 'birthDate',
//     dataIndex: 'birthDate',
//     title: 'Дата рождения'
//   },
//   {
//     key: 'deathDate',
//     dataIndex: 'deathDate',
//     title: 'Дата смерти'
//   },
//   {
//     key: 'createdAt',
//     dataIndex: 'createdAt',
//     title: 'Дата создания'
//   },
//   {
//     key: 'updatedAt',
//     dataIndex: 'updatedAt',
//     title: 'Дата обновления'
//   },
// ];

const Authors: FC = () => {

  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading, refetch } = useAuthorsQuery(currentPage);

  const navigate = useNavigate();


  const [ deleteAuthor ] = useDeleteAuthorMutation();


  return (<CrudLayout 
    title="Авторы"
    createLink="create"
    createButtonText="Добавить автора"
    // tableHeaders={columns}
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
        setCurrentPage(changedPage);
      }
    }}
    getListError={error ? {
      title: 'Ошибка!',
      details: 'Не удалось загрузить данные авторов',
      onRetryClick: () => refetch()
    } : undefined}
    actionClickHandlers={{
      editClick: (id) => navigate(`${id}/edit`),
      detailsClick: (id) => navigate(`${id}`),
      deleteClick: (id) => deleteAuthor(id)
    }}
  />);
}

export default Authors