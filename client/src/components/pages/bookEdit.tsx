import React, { useState } from "react"; 
import { useNavigate, useParams } from 'react-router-dom';
import { useBookDetailsQuery, useEditBookMutation } from "../../store/services/booksApi";
import { BookInput, FullBookInput } from "../../types";
import { Typography, Alert } from "antd";
import EditBookForm from "../shared/forms/editBookForm";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;


const BookEdit: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [displayError, setDisplayError] = useState<boolean>(false);

  const {
    data: bookDetails, isLoading: isBookLoading, error: bookDetailsError
  } = useBookDetailsQuery({
    uuid: id!, withAuthors: true, withCategory: true
  });

  const [ editBook ] = useEditBookMutation();

  const handleSubmit = async (values: BookInput) => {
    try {
      await editBook({ id: id!, data: values }).unwrap();
      navigate('/books/1');
    } catch (e) {
      setDisplayError(true);
    }
  };


  // зачем?!
  const initialData: FullBookInput | undefined = (isBookLoading || !bookDetails) 
    ? undefined : {
      isbn: bookDetails.isbn,
      name: bookDetails.name,
      description: bookDetails.description,
      category: bookDetails.category,
      authors: bookDetails.authors
    }

  console.log('book init', initialData);

  return (
    <div>
      {
        isBookLoading
          ? <LoadingOutlined />
          : <>
          <Title>Редактировать книгу</Title>
          <EditBookForm 
            formLayout="vertical" 
            recordData={initialData} 
            onSubmit={handleSubmit} 
          />
          {
            bookDetailsError && displayError
              ? <Alert
                message="Ошибка"
                description="Сетевая ошибка при изменении книги"
                type="error"
                closable
                onClose={() => setDisplayError(false)}
              />
              : null
          }
        </>
      }      
    </div>
  );
}

export default BookEdit;