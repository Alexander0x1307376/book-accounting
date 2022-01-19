import React, { useState } from "react";
import { Typography, Alert } from "antd";
const { Title } = Typography;



export interface EditEntityLayoutProps {
  title: string;
  children: React.ReactNode;
  error: any;
  isLoading?: boolean;
  extra?: React.ReactNode;
}

const EditEntityLayout: React.FC<EditEntityLayoutProps> = ({ 
  title, children, error, isLoading, extra
}) => {

  const [displayError, setDisplayError] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: 'flex' }} >
        <Title level={4} style={{ flexGrow: 1 }}>{title}</Title>
        {extra}
      </div>
      {
        isLoading
          ? <p>loading...</p>
          : (<>
            {children}
            {
              error && displayError
                ? <Alert
                  message="Ошибка"
                  description="Сетевая ошибка при изменении автора"
                  type="error"
                  closable
                  onClose={() => setDisplayError(false)}
                />
                : null
            }
          </>)
      }
    </div>
  );
};

export default EditEntityLayout;
