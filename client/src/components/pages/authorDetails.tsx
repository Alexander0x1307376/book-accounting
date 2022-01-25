import React, { FC, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import ButtonRouterLink from '../shared/buttonRouterLink';
import { Descriptions } from 'antd';
import { useAuthorDetailsQuery } from '../../store/services/authorsApi';
import EntityDetailsLayout from '../shared/entityDetailsLayout';
const { Item } = Descriptions;


const AuthorDetails: FC = () => {
  const { id } = useParams<any>();
  const { data, isLoading } = useAuthorDetailsQuery(id!);

  const labelStyle: CSSProperties = {
    padding: 0
  }
  const contentStyle: CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 400
  }

  return (
    <EntityDetailsLayout
      title='Об авторе'
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
        <Item label='UUID'>{data?.uuid}</Item>
        <Item label='Имя'>{data?.name}</Item>
        <Item label='Годы жизни'>{`${data?.birthDate} - ${data?.deathDate}`}</Item>
        <Item label='Описание'>{data?.description}</Item>
      </Descriptions>
    </EntityDetailsLayout>
  )
}

export default AuthorDetails