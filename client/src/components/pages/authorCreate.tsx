import React, { useState } from "react";
import { Typography, Alert } from "antd";
import EditAuthorForm from "../shared/forms/editAuthorForm";
import { AuthorInput } from "../../types";
import { useCreateAuthorMutation } from "../../store/services/authorsApi";
import { useNavigate } from 'react-router-dom';
import EditEntityLayout from "../shared/editEntityLayout";
const { Title } = Typography;

const AuthorCreate: React.FC = () => {

  const [createAuthor, { error }] = useCreateAuthorMutation();
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState<boolean>(false);

  const handleSubmit = async (values: AuthorInput) => {
    try {
      await createAuthor(values).unwrap();
      navigate('/authors');
    } catch(e) {
      setDisplayError(true);
    }
  };

  return (
    <EditEntityLayout
      title='Добавить автора'
      error={error}
    >
      <EditAuthorForm
        formLayout={'vertical'}
        onSubmit={handleSubmit}
      />
    </EditEntityLayout>
  );
};

export default AuthorCreate;
