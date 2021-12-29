import React, { useState } from "react";
import { Typography, Alert } from "antd";
import EditAuthorForm from "../shared/forms/editAuthorForm";
import { AuthorInput } from "../../types";
import { useAuthorDetailsQuery, useEditAuthorMutation } from "../../store/services/authorsApi";
import { useNavigate, useParams } from 'react-router-dom';
const { Title } = Typography;

const AuthorEdit: React.FC = () => {

  const { id } = useParams();
  const {
    data: authorData, 
    isLoading: isAuthorLoading
  } = useAuthorDetailsQuery(id!);

  const [editAuthor, { error }] = useEditAuthorMutation();
  const [displayError, setDisplayError] = useState<boolean>(false);

  const navigate = useNavigate();
  

  const handleSubmit = async (values: AuthorInput) => {
    try {
      await editAuthor({id: id!, data: values}).unwrap();
      navigate('/authors/1');
    } catch (e) {
      setDisplayError(true);
    }
  };

  return (
    <div>
      <Title>Редактировать автора</Title>
      {
        isAuthorLoading 
        ? <p>loading...</p>
          : (<>
            <EditAuthorForm
              recordData={{
                name: authorData?.name || '',
                birthDate: authorData?.birthDate,
                deathDate: authorData?.deathDate,
                description: authorData?.description || ''
              }}
              formLayout={'vertical'}
              onSubmit={handleSubmit}
            />
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
          </>)
      }
    </div>
  );
};

export default AuthorEdit;
