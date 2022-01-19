import React, { useState } from "react";
import EditUserForm from "../shared/forms/editUserForm";
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useUserDetailsQuery, useEditUserMutation } from "../../store/services/usersApi";
import { UserInput } from "../../types";
import EditEntityLayout from "../shared/editEntityLayout";
import ButtonRouterLink from "../shared/buttonRouterLink";

const { Title } = Typography;


const UserEdit: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();


  const [displayError, setDisplayError] = useState<boolean>(false);

  const {
    data: userDetails, isLoading, error
  } = useUserDetailsQuery(id!);



  const [editUser] = useEditUserMutation();


  const initialData: UserInput | undefined = (!isLoading && userDetails) ? {
    name: userDetails.name,
    email: userDetails.email,
    password: ''
  } : undefined;

  const handleSubmit = async (value: UserInput) => {
    try {
      await editUser({ id: id!, data: value }).unwrap();
      navigate('/users');
    } catch (e) {
      setDisplayError(true);
    }
  };


  return (
    <EditEntityLayout
      title={`Редактировать пользователя`}
      error={error}
      isLoading={isLoading}
      extra={
        <ButtonRouterLink to={`/users/${id}`} type='default'>
          К просмотру
        </ButtonRouterLink>
      }
    >
      <EditUserForm
        formLayout="vertical"
        recordData={initialData}
        onSubmit={handleSubmit}
      />
    </EditEntityLayout>
  );
}

export default UserEdit;