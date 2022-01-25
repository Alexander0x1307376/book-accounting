import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCategoriesTree } from '../../store/categoriesSlice';
import { 
  useCategoriesQuery, 
  useCategoriesRootsQuery, 
  useDeleteCategoryMutation, 
  useLazyCategoryChildrenQuery 
} from '../../store/services/categoriesApi';
import { generateTreeForTable } from '../../utils/generateCategoryTreeDataView';
import CrudLayout, { CrudLayoutProps } from '../shared/crudLayout';


const columns = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Имя'
  }
];

const Categories: FC = () => {

  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading, refetch } = useCategoriesQuery(currentPage);
  

  const [ deleteCategory ] = useDeleteCategoryMutation();

  const navigate = useNavigate();


  const categories = useSelector(selectCategoriesTree);
  useCategoriesRootsQuery();
  const [fetchChildren] = useLazyCategoryChildrenQuery();
  const categoriesTree = useMemo(() => generateTreeForTable(categories), [categories]);

  const crudListParams: CrudLayoutProps = {
    recordIdentifier: 'key',
    title: 'Категории',
    createLink: '/categories/create',
    createButtonText: 'Добавить категорию',
    tableHeaders: columns,
    isLoading,
    data: categoriesTree || [],
    actionClickHandlers: {
      editClick: (id) => navigate(`${id}/edit`),
      detailsClick: (id) => navigate(`${id}`),
      deleteClick: (id) => deleteCategory(id)
    },
  }

  return (
    <CrudLayout
      {...crudListParams}
      tableProps={{
        expandable: {
          onExpand: (expanded, record) => {
            fetchChildren(record.key);
          }
        },
        rowSelection: {
          type: 'radio',
          selectedRowKeys: [id] as React.Key[],
          renderCell: () => undefined,
          columnWidth: 0
        }
      }}
      getListError={error ? {
        title: 'Ошибка!',
        details: 'Не удалось загрузить данные категорий',
        onRetryClick: () => refetch()
      } : undefined}
    />
  )
}

export default Categories