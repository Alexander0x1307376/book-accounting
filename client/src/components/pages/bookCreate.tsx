import React, { useState } from "react"; 
import { useNavigate } from 'react-router-dom';
import { useCreateBookMutation } from "../../store/services/booksApi";
import { BookInput } from "../../types";
import { Typography, Alert } from "antd";
import EditBookForm from "../shared/forms/editBookForm";
const { Title } = Typography;


const BookCreate: React.FC = () => {

  const [createAuthor, { isLoading, data, error }] = useCreateBookMutation();
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState<boolean>(false);

  const handleSubmit = async (values: BookInput) => {
    try {
      await createAuthor(values).unwrap();
      navigate('/books/1');
    } catch (e) {
      setDisplayError(true);
    }
  };

  return (
    <div>
      <Title>Добавить книгу</Title>
      <EditBookForm formLayout={'vertical'} onSubmit={handleSubmit} />
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
}

export default BookCreate;