import React, { useMemo, useState } from "react";
import { useCategoriesSearchQuery, useCreateCategoryMutation } from "../../../store/services/categoriesApi";
import OneToManyField from "./oneToManyField";
import CreateCategoryModal from "../modals/createCategoryModal";
import CategoryListModal from "../modals/categoryListModal";


export interface CategoryForeignFieldProps {
  onChange?: (id: any) => void;
  value?: string; //uuid записи
  label?: string; //представление записи (по сути - просто имя записи)
  withoutCreateButton?: boolean;
}

const CategoryForeignField: React.FC<CategoryForeignFieldProps> = ({ 
  onChange, value, label, withoutCreateButton
}) => {

  // search - поиск и представление записи (значение инпута)
  // throttledSearch - троттленное значение для запроса на сервер
  const [search, setSearch] = useState<string>('');
  const [throttledSearch, setThrottledSearch] = useState<string>('');


  // хук записей поиска
  const { data } = useCategoriesSearchQuery(throttledSearch);


  // централизованный метод установления состояния записи
  const selectCategory = (id: string, name: string) => {
    setSearch(name);
    onChange?.(id);
  }

  
  // приведённые к правильной формы результаты поиска для поля автопоиска (?)
  const categoryRecords = useMemo(() => 
    data?.length 
    ? data.map(item => ({
      id: item.uuid,
      name: item.name
    })) 
    : [], [data]
  );


  // создание категории
  const [
    createCategory, 
    { 
      isLoading: isCategoryCreating, 
      data: createCategoryData, 
      error: createCategoryError 
    }
  ] = useCreateCategoryMutation();

  const handleSubmit = async (values: any) => {
    try {
      const result = await createCategory(values).unwrap();
      selectCategory(result.uuid, result.name);
      setCreateModalVisible(false);
    } catch (e) {
      console.log('ERROR!!!!', e);
    }
  };



  // видимости модальных окон
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [listVisible, setListVisible] = useState<boolean>(false);


  return <>
    <OneToManyField 
      data={categoryRecords}
      value={search}
      onOpenListClick={() => setListVisible(true)}
      onNewRecordClick={
        !withoutCreateButton 
        ? () => setCreateModalVisible(true) 
        : undefined
      }
      onSearchChange={(value) => setSearch(value)}
      onChange={(value) => setThrottledSearch(value)}
      onSelected={(record) => selectCategory(record.id, record.name)}
    />
    <CreateCategoryModal
      visible={createModalVisible}
      onSubmit={handleSubmit}
      onCancel={() => setCreateModalVisible(false)}
    />
    <CategoryListModal
      visible={listVisible}
      onCancelClick={() => setListVisible(false)}
      onSelectClick={(row) => {
        setListVisible(false);
        selectCategory(row.id, row.name);
      }}
    />
  </>
}

export default CategoryForeignField;