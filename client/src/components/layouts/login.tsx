import { FC } from "react";
import LoginForm from "../shared/loginForm";
import styled from "styled-components";
import { Card } from 'antd';


const CenterdedBlock = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const Login: FC = () => {
  return (
    <CenterdedBlock>
      <Card title="Вход в систему" style={{width: 400}}>
        <LoginForm onFinish={() => {}}/>
      </Card>
    </CenterdedBlock>
  )
}

export default Login;