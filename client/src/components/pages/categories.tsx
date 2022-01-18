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
import CrudList, { CrudListProps } from '../shared/crudList';


const columns = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Имя'
  }
];

const Categories: FC = () => {

  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(page ? +page : 1);
  const { data, error, isLoading, refetch } = useCategoriesQuery(currentPage);
  
  const requestError = error as any;


  const [ deleteCategory ] = useDeleteCategoryMutation();

  const navigate = useNavigate();


  const categories = useSelector(selectCategoriesTree);
  useCategoriesRootsQuery();
  const [fetchChildren] = useLazyCategoryChildrenQuery();
  const categoriesTree = useMemo(() => generateTreeForTable(categories), [categories]);

  const crudListParams: CrudListProps = {
    recordIdentifier: 'key',
    title: 'Список категорий',
    createLink: '/category/create',
    createButtonText: 'Добавить категорию',
    tableHeaders: columns,
    isLoading,
    data: categoriesTree || [],
    actionClickHandlers: {
      editClick: (id) => navigate(`/category/${id}/edit`),
      detailsClick: (id) => navigate(`/category/${id}`),
      deleteClick: (id) => deleteCategory(id)
    },
  }


  return (
    <CrudList
      {...crudListParams}
      tableProps={{
        expandable: {
          onExpand: (expanded, record) => {
            fetchChildren(record.key);
          }
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