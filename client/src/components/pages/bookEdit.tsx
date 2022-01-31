import React, { useState } from "react"; 
import { useNavigate, useParams } from 'react-router-dom';
import { useBookDetailsQuery, useEditBookMutation } from "../../store/services/booksApi";
import { BookInput, FullBookInput } from "../../types";
import EditBookForm from "../shared/forms/editBookForm";
import { useForm } from "antd/lib/form/Form";
import EditEntityLayout from "../shared/editEntityLayout";
import ButtonRouterLink from "../shared/buttonRouterLink";

const BookEdit: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [displayError, setDisplayError] = useState<boolean>(false);

  const [form] = useForm();

  const {
    data: bookDetails, isLoading, error
  } = useBookDetailsQuery({
    uuid: id!, withAuthors: true, withCategory: true, withImage: true
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


  const initialData: FullBookInput | undefined = (isLoading || !bookDetails) 
    ? undefined : {
      isbn: bookDetails.isbn,
      name: bookDetails.name,
      image: bookDetails.image,
      description: bookDetails.description,
      category: bookDetails.category,
      authors: bookDetails.authors
    };


  return (
    <EditEntityLayout
      title={`Редактировать книгу ${bookDetails?.name || ''}`}
      error={error}
      isLoading={isLoading}
      extra={
        <ButtonRouterLink to={`../${id}`} type='default'>
          К просмотру
        </ButtonRouterLink>
      }
    >
      <EditBookForm
        form={form}
        formLayout="vertical"
        recordData={initialData}
        onSubmit={handleSubmit}
      />
    </EditEntityLayout>
  );
}

export default BookEdit;