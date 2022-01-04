import { Button, Input, Select, Tooltip } from 'antd';
import React, { useState, useMemo } from 'react';
import { useCreateCategoryMutation } from '../../../store/services/categoriesApi';
import { CategoryInput as CategoryInputType, SelectionItem } from '../../../types';
import CreateCategoryModal from '../modals/createCategoryModal';
import { PlusOutlined, CopyOutlined } from '@ant-design/icons';
import { useCategoriesSearchQuery } from "../../../store/services/categoriesApi";
import useThrottledDebouncedCallback from "../../../utils/useThrottledDebouncedCallback";
import CategoryListModal from '../modals/categoryListModal';


interface InputProps {
  onChange?: (value: SelectionItem) => void;
  value?: SelectionItem;
} 

export type CategoryInputProps = InputProps & {
  withoutCreateLogic?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ 
  withoutCreateLogic, onChange, value 
}) => {
  return withoutCreateLogic 
  ? <CategoryInputWithoutCreateLogic {...{onChange, value}} /> 
  : <CategoryInputWithCreateLogic {...{ onChange, value }} />
}



// с кнопой "Создать"
const CategoryInputWithCreateLogic: React.FC<InputProps> = ({onChange, value}) => {
  
  
  // создание категории
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [createCategory] = useCreateCategoryMutation();
  

  const [listModalVisible, setListModalVisible] = useState<boolean>(false);
  
  
  const handleSubmit = async (values: any) => {
    try {

      const categoryData: CategoryInputType = {
        name: values.name,
        parentId: values.parent.value,
        description: values.description,
      };

      const result = await createCategory(categoryData).unwrap();
      selectCategory({
        value: result.uuid,
        label: result.name
      });
      setCreateModalVisible(false);
    } catch (e) {
      console.log('ERROR!!!!', e);
    }
  };


  const selectCategory = (value: SelectionItem) => {
    onChange?.(value);
  }

  return (<>
    <CategoryForeignField
      value={value} 
      onChange={selectCategory} 
      onNewRecordClick={() => setCreateModalVisible(true)}
      onSelectFromListClick={() => setListModalVisible(true)}
    />
    <CreateCategoryModal
      visible={createModalVisible}
      onSubmit={handleSubmit}
      onCancel={() => setCreateModalVisible(false)}
    />
    <CategoryListModal 
      visible={listModalVisible}
      onSelectClick={({id, name}) => {
        selectCategory({
          label: name,
          value: id
        });
        setListModalVisible(false);
      }}
      onCancelClick={() => setListModalVisible(false)}
    />
  </>);
}


// без кнопы "Создать"
const CategoryInputWithoutCreateLogic: React.FC<InputProps> = ({value, onChange}) => {
  return (<CategoryForeignField 
    value={value} 
    onChange={onChange} 
  />);
}







interface CategoryForeignFieldProps {
  onChange?: (value: SelectionItem) => void; //возвращается только uuid
  value?: SelectionItem;
  withoutCreateButton?: boolean;
  onNewRecordClick?: () => void;
  onSelectFromListClick?: () => void;
}

const CategoryForeignField: React.FC<CategoryForeignFieldProps> = ({
  onChange, value, onNewRecordClick, onSelectFromListClick
}) => {

  // throttledSearch - троттленное значение для запроса на сервер
  const [throttledSearch, setThrottledSearch] = useState<string>('');
  const throttledMethod = useThrottledDebouncedCallback((value) => {
    if (value) setThrottledSearch(value);
  }, 500);


  // хук записей поиска
  const { data } = useCategoriesSearchQuery(throttledSearch, { skip: !throttledSearch });
  const searchOptions = useMemo(() => data ? dataToToFieldsData(data) : [], [data]);

  // при выборе итема
  const handleChange = (value: any) => {
    onChange?.(value);
  }

  // при каждом изменении ввода
  const handleSearch = (value: string) => {
    throttledMethod(value);
  }

  return <>
    <Input.Group compact style={{ display: 'flex' }}>
      <Select
        style={{ flex: '1' }}
        showSearch
        labelInValue
        filterOption={false}
        value={value} //выбранная запись
        options={searchOptions as any} //опции поиска
        onChange={handleChange} //возвращает список при изменении
        onSearch={handleSearch} //значение поиска 
        notFoundContent={null}
      />
      {
        onSelectFromListClick
        ? <Tooltip title="выбор из списка">
            <Button icon={<CopyOutlined />} onClick={onSelectFromListClick} />
          </Tooltip> 
          : null
      }
      {
        onNewRecordClick
          ? <Tooltip title="новая запись">
            <Button icon={<PlusOutlined />} onClick={onNewRecordClick} />
          </Tooltip>
          : null
      }
    </Input.Group>
  </>
}

const dataToToFieldsData = (data: { uuid: string, name: string }[]): SelectionItem[] => data.map(item => ({
  label: item.name,
  value: item.uuid,
}));

export default CategoryInput;