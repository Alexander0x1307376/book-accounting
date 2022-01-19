import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteUserMutation, useUsersQuery } from "../../store/services/usersApi";
import CrudLayout from "../shared/crudLayout";


// const columns = [
//   {
//     key: 'uuid',
//     dataIndex: 'uuid',
//     title: 'ID'
//   },
//   {
//     key: 'name',
//     dataIndex: 'name',
//     title: 'Имя'
//   },
//   {
//     key: 'email',
//     dataIndex: 'email',
//     title: 'Почта'
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

const Users: React.FC = () => {
  
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(page ? +page : 1);
  const { data, error, isLoading, refetch } = useUsersQuery(currentPage);
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  return (<CrudLayout
    title="Список пользователей"
    createLink="/user/create"
    createButtonText="Добавить пользователя"
    // tableHeaders={columns}
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
      details: 'Не удалось загрузить данные пользователей',
      onRetryClick: () => refetch()
    } : undefined}
    actionClickHandlers={{
      editClick: (id) => navigate(`/users/${id}/edit`),
      detailsClick: (id) => navigate(`/users/${id}`),
      deleteClick: async (id) => {
        await deleteUser(id);
      },
    }}
  />);
}

export default Users;