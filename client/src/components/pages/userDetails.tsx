import React, { FC, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import ButtonRouterLink from '../shared/buttonRouterLink';
import { Space, Spin, Descriptions } from 'antd';
import { useUserDetailsQuery } from '../../store/services/usersApi';
const { Item } = Descriptions;

const UserDetails: FC = () => {
  const { id } = useParams<any>();
  const { data, isLoading } = useUserDetailsQuery(id!);

  const extra = <ButtonRouterLink to={`/user/${id}/edit`} type='primary'>
    Изменить
  </ButtonRouterLink>

  const labelStyle: CSSProperties = {
    padding: 0
  }
  const contentStyle: CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 400
  }

  return (<>
    {
      isLoading && !data
        ? (<>
          <Space size='middle'>
            <Spin size='large' />
          </Space>
        </>)
        : (
          <div>
            <Descriptions
              size='middle'
              contentStyle={contentStyle}
              labelStyle={labelStyle}
              title='Информация о пользователе'
              extra={extra}
              layout='vertical'
              column={1}
            >
              <Item label='Код'>{data?.uuid}</Item>
              <Item label='Имя'>{data?.name}</Item>
              <Item label='Email'>{data?.email}</Item>
            </Descriptions>
          </div>
        )
    }
  </>)
}

export default UserDetails