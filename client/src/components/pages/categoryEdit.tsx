import React, { useState } from "react";
import EditCategoryForm from "../shared/forms/editCategoryForm";
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryDetailsQuery, useEditCategoryMutation } from "../../store/services/categoriesApi";
import { CategoryInput, FullCategoryInput } from "../../types";
import { useForm } from "antd/lib/form/Form";
import EditEntityLayout from "../shared/editEntityLayout";
import ButtonRouterLink from "../shared/buttonRouterLink";


const CategoryEdit: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();


  const [displayError, setDisplayError] = useState<boolean>(false);

  const {
    data: categoryDetails, isLoading, error
  } = useCategoryDetailsQuery({uuid: id!, withParent: true});

  const [form] = useForm();

  const [editCategory] = useEditCategoryMutation();


  const initialData: FullCategoryInput | undefined = (!isLoading && categoryDetails) ? {
    name: categoryDetails.name,
    description: categoryDetails.description,
    parent: categoryDetails.parent
  } : undefined

  const handleSubmit = async (value: CategoryInput) => {
    try {
      await editCategory({ id: id!, data: value }).unwrap();
      navigate('/categories/1');
    } catch (e) {
      setDisplayError(true);
    }
  };

  return (
    <EditEntityLayout
      title={`Редактировать категорию ${categoryDetails?.name}`}
      error={error}
      isLoading={isLoading}
      extra={
        <ButtonRouterLink to={`../${id}`} type='default'>
          К просмотру
        </ButtonRouterLink>
      }
    >
      <EditCategoryForm
        form={form}
        formLayout="vertical"
        recordData={initialData}
        onSubmit={handleSubmit}
      />
    </EditEntityLayout>
  )
}

export default CategoryEdit;