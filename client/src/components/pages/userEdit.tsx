import React, { useState } from "react";
import EditUserForm from "../shared/forms/editUserForm";
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useUserDetailsQuery, useEditUserMutation } from "../../store/services/usersApi";
import { UserInput } from "../../types";

const { Title } = Typography;


const UserEdit: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();


  const [displayError, setDisplayError] = useState<boolean>(false);

  const {
    data: userDetails, isLoading: isUserLoading, error: userDetailsError
  } = useUserDetailsQuery(id!);



  const [editUser] = useEditUserMutation();


  const initialData: UserInput | undefined = (!isUserLoading && userDetails) ? {
    name: userDetails.name,
    email: userDetails.email,
    password: ''
  } : undefined

  const handleSubmit = async (value: UserInput) => {
    try {
      await editUser({ id: id!, data: value }).unwrap();
      navigate('/users/1');
    } catch (e) {
      setDisplayError(true);
    }
  };

  return (<div>
    {
      isUserLoading
        ? <LoadingOutlined />
        : <>
          <Title>Редактировать пользователя</Title>
          <EditUserForm
            formLayout="vertical"
            recordData={initialData}
            onSubmit={handleSubmit}
          />
          {
            userDetailsError && displayError
              ? <Alert
                message="Ошибка"
                description="Сетевая ошибка при изменении пользователя"
                type="error"
                closable
                onClose={() => setDisplayError(false)}
              />
              : null
          }
        </>
    }
  </div>)
}

export default UserEdit;