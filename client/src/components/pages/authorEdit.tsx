import React, { useState } from "react";
import { Typography } from "antd";
import EditAuthorForm from "../shared/forms/editAuthorForm";
import { AuthorInput } from "../../types";
import { useAuthorDetailsQuery, useEditAuthorMutation } from "../../store/services/authorsApi";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "antd/lib/form/Form";
import EditEntityLayout from "../shared/editEntityLayout";
import ButtonRouterLink from "../shared/buttonRouterLink";


const AuthorEdit: React.FC = () => {

  const { id } = useParams();
  const {
    data: authorData, 
    isLoading: isAuthorLoading
  } = useAuthorDetailsQuery(id!);

  const [editAuthor, { error }] = useEditAuthorMutation();
  const [displayError, setDisplayError] = useState<boolean>(false);

  const navigate = useNavigate();
  
  const [form] = useForm();

  const handleSubmit = async (values: AuthorInput) => {
    try {
      await editAuthor({id: id!, data: values}).unwrap();
      navigate(`/authors/${id}`);
    } catch (e) {
      setDisplayError(true);
    }
  };


  return (
    <EditEntityLayout 
      title={`Редактировать автора ${authorData?.name || ''}`}
      error={error}
      isLoading={isAuthorLoading}
      extra={
        <ButtonRouterLink to={`/authors/${id}`} type='default'>
          К просмотру
        </ButtonRouterLink>
      }
    >
      <EditAuthorForm
        form={form}
        recordData={{
          name: authorData?.name || '',
          birthDate: authorData?.birthDate,
          deathDate: authorData?.deathDate,
          description: authorData?.description
        }}
        formLayout={'vertical'}
        onSubmit={handleSubmit}
      />
    </EditEntityLayout>
  );
};

export default AuthorEdit;
