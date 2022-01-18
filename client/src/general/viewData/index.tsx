import { Input } from "antd"
import CategoryInput from "../../components/shared/relationField/categoryInput"

const defaultEtityViewData: EntityViewData = {
  titles: {
    create: 'Создать запись',
    edit: 'Редактировать запись',
    show: 'Запись',
    remove: 'Удалить запись',
    list: 'Список записей'
  },
  attributes: {
    default: {
      label: 'атрибут записи',
      input: <Input />
    }
  }
}

type LabeledValue = {
  label: string;
  value: string;
}

type EntityViewData = {
  titles: {
    create: string,
    edit: string | ((value: string) => string),
    show: string | ((value: string) => string),
    remove: string | ((value: string) => string),
    list: string,
  },
  attributes: {
    [key: string]: {
      label: string;
      input?: React.ReactNode;
    }
  }
}

export const categoryViewData: EntityViewData = {
  titles: {
    create: 'Создать категорию',
    show: 'Запись категории',
    edit: value => `Редактировать категорию ${value}`,
    remove: value => `Удалить категорию ${value}`,
    list: 'Список категорий'
  },
  attributes: {
    name: {
      label: 'имя',
    },
    parent: {
      label: 'родительская категория',
      input: <CategoryInput />
    },
  }
}
 