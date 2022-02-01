import { Button, Input, Select, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { useAuthorSearchQuery, useCreateAuthorMutation } from "../../../store/services/authorsApi";
import { AuthorInput as AuthorInputType, SelectionItem } from "../../../types";
import useThrottledDebouncedCallback from "../../../utils/useThrottledDebouncedCallback";
import CreateAuthorModal from "../modals/createAuthorModal";
import { PlusOutlined } from '@ant-design/icons';

interface InputProps {
  onChange?: (value: SelectionItem[]) => void;
  value?: SelectionItem[];
}

export type AuthorsInputProps = InputProps & {
  withoutCreateLogic?: boolean;
}

const AuthorsInput: React.FC<AuthorsInputProps> = ({
  withoutCreateLogic, onChange, value
}) => {
  return withoutCreateLogic
    ? <AuthorsInputWithoutCreateLogic {...{ onChange, value }} />
    : <AuthorsInputWithCreateLogic {...{ onChange, value }} />
}



const AuthorsInputWithCreateLogic: React.FC<InputProps> = ({ onChange, value = [] }) => {

  // создание категории
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [createAuthor] = useCreateAuthorMutation();


  const handleSubmit = async (values: AuthorInputType) => {
    try {
      const result = await createAuthor(values).unwrap();
      selectAuthors([...value, {
        label: result.name,
        value: result.uuid
      }]);
      setCreateModalVisible(false);
    } catch (e) {
      console.log('ERROR!!!!', e);
    }
  };


  const selectAuthors = (values: SelectionItem[]) => {
    onChange?.(values);
  }

  return (<>
    <AuthorsForeignField
      value={value}
      onChange={selectAuthors}
      onNewRecordClick={() => setCreateModalVisible(true)}
    />
    <CreateAuthorModal 
      visible={createModalVisible}
      onSubmit={handleSubmit}
      onCancel={() => setCreateModalVisible(false)}
    />
  </>)
}


const AuthorsInputWithoutCreateLogic: React.FC<InputProps> = (props) => {
  return (
    <AuthorsForeignField {...props} />
  )
}




const dataToToFieldsData = (data: { uuid: string, name: string }[]): SelectionItem[] => 
  data.map(item => ({
    label: item.name,
    value: item.uuid,
  }));

export interface AuthorsForeignFieldProps {
  value?: SelectionItem[];
  onChange?: (values: SelectionItem[]) => void;
  onNewRecordClick?: () => void;
}

const AuthorsForeignField: React.FC<AuthorsForeignFieldProps> = ({ 
  value = [], onChange, onNewRecordClick 
}) => {

  // throttledSearch - троттленное значение для запроса на сервер
  const [throttledSearch, setThrottledSearch] = useState<string>('');
  const throttledMethod = useThrottledDebouncedCallback((value) => {
    setThrottledSearch(value);
  }, 500);

  const { data } = useAuthorSearchQuery(throttledSearch);
  const searchOptions = useMemo(() => data ? dataToToFieldsData(data) : [], [data]);

  // при каждом изменении ввода
  const handleSearch = (value: string) => {
    throttledMethod(value);
  }

  return (
    <Input.Group compact style={{ display: 'flex' }}>

      <Select
        mode="multiple"
        style={{ flex: '1' }}
        labelInValue
        filterOption={false}
        value={value} //выбранные записи
        options={searchOptions as any} //опции поиска
        onChange={onChange} //возвращает список при изменении
        onSearch={handleSearch} //значение поиска 
        notFoundContent={null}
      >
      </Select>
      {
        onNewRecordClick
          ? <Tooltip title="новая запись">
            <Button icon={<PlusOutlined />} onClick={onNewRecordClick} />
          </Tooltip>
          : null
      }
    </Input.Group>
  )
}

export default AuthorsInput;