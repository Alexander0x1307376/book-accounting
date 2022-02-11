import { FC, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import ButtonRouterLink from '../shared/buttonRouterLink';
import { Descriptions } from 'antd';
import { useCategoryDetailsQuery } from '../../store/services/categoriesApi';
import EntityDetailsLayout from '../shared/entityDetailsLayout';


const { Item } = Descriptions;

const CategoryDetails: FC = () => {
  const { id } = useParams<any>();

  const { data, isLoading } = useCategoryDetailsQuery({uuid: id!, withParent: true});

  const labelStyle: CSSProperties = {
    padding: 0
  }
  const contentStyle: CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 400
  }


  return (
    <EntityDetailsLayout
      title='О категории'
      isLoading={isLoading}
      extra={
        <ButtonRouterLink to={`edit`} type='primary'>
          Изменить
        </ButtonRouterLink>
      }
    >
      <Descriptions
        size='middle'
        contentStyle={contentStyle}
        labelStyle={labelStyle}
        layout='vertical'
        column={1}
      >
        <Item label='Код'>{data?.uuid}</Item>
        <Item label='Имя'>{data?.name}</Item>
        <Item label='Описание'>{data?.description || 'нет'}</Item>
      </Descriptions>
    </EntityDetailsLayout>
  );
}

export default CategoryDetails;