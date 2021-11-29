import React, { FC, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import ButtonRouterLink from '../shared/buttonRouterLink';
import { Space, Spin, Descriptions } from 'antd';
import { useAuthorDetailsQuery } from '../../store/services/authorsApi';
const { Item } = Descriptions;


const AuthorDetails: FC = () => {
  const { id } = useParams<any>();
  const { data, isLoading } = useAuthorDetailsQuery(id);

  const extra = <ButtonRouterLink to={`/author/${id}/edit`} type='primary'>
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
              title='Об авторе'
              extra={extra}
              layout='vertical'
              column={1}
            >
              <Item label='UUID'>{data?.uuid}</Item>
              <Item label='Имя'>{data?.name}</Item>
              <Item label='Годы жизни'>{`${data?.birthDate} - ${data?.deathDate}`}</Item>
              <Item label='Описание'>{data?.description}</Item>
            </Descriptions>
          </div>
        )
    }
  </>)
}

export default AuthorDetails