import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete, Button, Input, Tooltip } from 'antd';
import useThrottledDebouncedCallback from '../../../utils/useThrottledDebouncedCallback';
import { CopyOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = AutoComplete;

type Record = {
  id: string,
  name: string
}

export interface OneToManyFieldProps {
  data: Record[],
  value: string, //поиск
  onSelected: (record: Record) => void,
  onChange: (value: string) => void, //троттленый
  onSearchChange: (value: string) => void,
  onOpenListClick?: () => void,
  onNewRecordClick?: () => void,
}

const OneToManyField: React.FC<OneToManyFieldProps> = ({ 
  data, value, onSelected, onChange, onSearchChange, onOpenListClick, onNewRecordClick
}) => {

  const handleSearchChange = useThrottledDebouncedCallback(onChange, 500);
  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredEntries([]);
    }
    else {
      const filtered = data.filter(item =>
        item.name.toUpperCase().indexOf(value.toUpperCase()) !== -1
      );
      setFilteredEntries(filtered);
      handleSearchChange(value);
    }
  }

  //поле поиска
  // локальные фильтрованные записи
  const [filteredEntries, setFilteredEntries] = useState<Record[]>([]);

  useEffect(() => handleSearchChange(value), [value]);

  return (<>
    <Input.Group compact style={{ display: 'flex' }}>
      <AutoComplete
        style={{ flex: '1' }}
        allowClear
        value={value}
        onChange={onSearchChange}
        onSelect={(data, option) => {
          onSelected({
            id: option.key as string,
            name: option.value
          });
        }}
        onSearch={handleSearch}
      >
        {
          filteredEntries.map(({ id, name }) => 
            <Option key={id} value={name}>
              {name}
            </Option>
          )
        }
      </AutoComplete>
      <Tooltip title="выбрать из списка">
        <Button icon={<CopyOutlined />} onClick={onOpenListClick}/>
      </Tooltip>
      {
        onNewRecordClick
        ? <Tooltip title="новая запись">
          <Button icon={<PlusOutlined />} onClick={onNewRecordClick} />
        </Tooltip>
        : null
      }
      
    </Input.Group>
  </>)
}

export default OneToManyField;