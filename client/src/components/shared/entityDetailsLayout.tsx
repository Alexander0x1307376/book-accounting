import React, { FC, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import ButtonRouterLink from '../shared/buttonRouterLink';
import { Space, Spin, Descriptions, Typography, Row } from 'antd';

const { Item } = Descriptions;
const { Title } = Typography;


export interface EntityDetailsLayoutProps {
  title: string;
  isLoading: boolean;
  children?: React.ReactNode;
  extra?: React.ReactNode;
}

const EntityDetailsLayout: FC<EntityDetailsLayoutProps> = ({ isLoading, title, children, extra}) => {
  return (<>
    {
      isLoading
        ? (<>
          <Space size='middle'>
            <Spin size='large' />
          </Space>
        </>)
        : (
          <div>
            <div style={{ display: 'flex' }} >
              <Title level={4} style={{ flexGrow: 1 }}>{title}</Title>
              {extra}
            </div>
            {children}
          </div>
        )
    }
  </>)
}

export default EntityDetailsLayout