import { FC, useState } from "react";
import LoginForm from "../shared/loginForm";
import styled from "styled-components";
import { Alert, Card, Spin } from 'antd';
import { useLoginMutation } from "../../store/services/authService";
import { LoginRequest } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";


const CenterdedBlock = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const Login: FC = () => {

  const [login, {isLoading}] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location as any).state?.from?.pathname || "/";

  const [displayError, setDisplayError] = useState<boolean>(false);

  const onFinish = async (data: LoginRequest) => {
    try {
      await login(data).unwrap();
      navigate(from);
    } catch (err) {
      setDisplayError(true);
    }
  }

  return (
    <CenterdedBlock>
      <Card title="Вход в систему" style={{width: 400}}>
        <Spin spinning={isLoading} tip="Отправка..." delay={100}>
          <LoginForm onFinish={onFinish} />
        </Spin>
        {
          displayError
          ? (
            <Alert
              message="Ошибка входа"
              description="Неверный логин или пароль"
              type="error"
              closable
              showIcon
              afterClose={() => setDisplayError(false)}
            />
          )
          : undefined
        }
      </Card>
    </CenterdedBlock>
  )
}

export default Login;