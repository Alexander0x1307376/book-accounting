import React, { FC, CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonRouterLink from '../shared/buttonRouterLink';
import { Descriptions, Typography, List } from 'antd';
import { useBookDetailsQuery } from '../../store/services/booksApi';
import EntityDetailsLayout from '../shared/entityDetailsLayout';

const { Item } = Descriptions;

const BookDetails: FC = () => {
  const { id } = useParams<any>();
  const { data, isLoading } = useBookDetailsQuery({
    uuid: id!,
    withAuthors: true,
    withCategory: true,
  });

  const labelStyle: CSSProperties = {
    padding: 0
  }
  const contentStyle: CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 400
  }

  console.log('book', data);

  return (
    <EntityDetailsLayout
      title='О книге'
      isLoading={isLoading}
      extra={
        <ButtonRouterLink to={`edit`} type='primary'>
          Изменить
        </ButtonRouterLink>
      }
    >
      <Descriptions
        // size='middle'
        contentStyle={contentStyle}
        labelStyle={labelStyle}
        layout='vertical'
        column={1}
      >
        <Item label='Код'>{data?.uuid}</Item>
        <Item label='Имя'>
          {data?.name}
        </Item>
        <Item label='Категория'>
          <Link to={`/categories/${data?.category?.uuid}`}>
            <Typography.Text underline>{data?.category?.name}</Typography.Text>
          </Link>
        </Item>
        <Item label='Авторы'>
          <List
            style={{
              width: '100%'
            }}
            size="small"
            bordered
            dataSource={data?.authors}
            renderItem={({name, uuid}) => <List.Item>
              <Link to={`/authors/${uuid}`}>
                <Typography.Text underline>{name}</Typography.Text>
              </Link>
            </List.Item>}
          />
        </Item>
        <Item label='Описание'>{data?.description}</Item>
      </Descriptions>
    </EntityDetailsLayout>
  );
}

export default BookDetails