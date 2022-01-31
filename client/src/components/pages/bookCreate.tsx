import React from "react"; 
import { useNavigate } from 'react-router-dom';
import { useCreateBookMutation } from "../../store/services/booksApi";
import { BookInput } from "../../types";
import EditBookForm from "../shared/forms/editBookForm";
import EditEntityLayout from "../shared/editEntityLayout";
import { useForm } from "antd/lib/form/Form";


const BookCreate: React.FC = () => {

  const [createAuthor, { error }] = useCreateBookMutation();
  const navigate = useNavigate();
  const [form] = useForm();

  const handleSubmit = async (values: BookInput) => {
    try {
      await createAuthor(values).unwrap();
      navigate('/books/1');
    } catch (e) {
      console.log('BookCreate error!', e);
    }
  };


  return (
    <EditEntityLayout
      title='Добавить книгу'
      error={error}
    >
      <EditBookForm 
        form={form}
        formLayout={'vertical'} 
        onSubmit={handleSubmit} 
      />
    </EditEntityLayout>
  )
}

export default BookCreate;