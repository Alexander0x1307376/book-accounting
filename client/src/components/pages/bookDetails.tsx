import React, { FC, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import ButtonRouterLink from '../shared/buttonRouterLink';
import { Space, Spin, Descriptions } from 'antd';
import { useBookDetailsQuery } from '../../store/services/booksApi';
const { Item } = Descriptions;

const BookDetails: FC = () => {
  const { id } = useParams<any>();
  const { data, isLoading } = useBookDetailsQuery({
    uuid: id!,
    withAuthors: false,
    withCategory: false,
  });

  const extra = <ButtonRouterLink to={`/book/${id}/edit`} type='primary'>
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
              <Item label='Код'>{data?.uuid}</Item>
              <Item label='Имя'>{data?.name}</Item>
              <Item label='Описание'>{data?.description}</Item>
            </Descriptions>
          </div>
        )
    }
  </>)
}

export default BookDetails