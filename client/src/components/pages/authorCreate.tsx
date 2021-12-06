import React, { useState } from "react";
import { Typography, Alert } from "antd";
import EditAuthorForm from "../shared/editAuthorForm";
import { AuthorInput } from "../../types";
import { useCreateAuthorMutation } from "../../store/services/authorsApi";
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const AuthorCreate: React.FC = () => {

  const [createAuthor, { isLoading, data, error }] = useCreateAuthorMutation();
  
  const [displayError, setDisplayError] = useState<boolean>(false);

  const navigate = useNavigate();


  console.log(error)

  const handleSubmit = async (values: Partial<AuthorInput>) => {
    console.log('createauthor', values);
    try {
      await createAuthor(values).unwrap();
      navigate('/authors/1');
    } catch(e) {
      setDisplayError(true);
    }
  };

  return (
    <div>
      <Title>Добавить автора</Title>
      <EditAuthorForm formLayout={'vertical'} onSubmit={handleSubmit} />
      {
        error && displayError
        ? <Alert
          message="Ошибка"
          description={(error as any).data.message}
          type="error"
          closable
          onClose={() => setDisplayError(false)}
        /> 
        : null
      }
    </div>
  );
};

export default AuthorCreate;
