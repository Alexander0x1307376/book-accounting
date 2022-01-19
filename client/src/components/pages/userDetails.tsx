import React, { FC, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import ButtonRouterLink from '../shared/buttonRouterLink';
import { Descriptions } from 'antd';
import { useUserDetailsQuery } from '../../store/services/usersApi';
import EntityDetailsLayout from '../shared/entityDetailsLayout';
const { Item } = Descriptions;

const UserDetails: FC = () => {
  const { id } = useParams<any>();
  const { data, isLoading } = useUserDetailsQuery(id!);

  const labelStyle: CSSProperties = {
    padding: 0
  }
  const contentStyle: CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 400
  }

  return (
    <EntityDetailsLayout
      title='Информация о пользователе'
      isLoading={isLoading}
      extra={
        <ButtonRouterLink to={`/users/${id}/edit`} type='primary'>
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
        <Item label='Email'>{data?.email}</Item>
      </Descriptions>
    </EntityDetailsLayout>
  )
}

export default UserDetails