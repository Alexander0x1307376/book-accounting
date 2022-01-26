import { Alert } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../store/services/categoriesApi";
import { CategoryInput } from "../../types";
import EditEntityLayout from "../shared/editEntityLayout";
import EditCategoryForm from "../shared/forms/editCategoryForm";

const CategoryCreate: React.FC = () => {

  const [createCategory, { error }] = useCreateCategoryMutation();
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState<boolean>(false);

  const handleSubmit = async (values: CategoryInput) => {
    try {
      await createCategory(values).unwrap();
      navigate('/categories/1');
    } catch (e) {
      setDisplayError(true);
    }
  };

  return (
    <EditEntityLayout
      title='Добавить категорию'
      error={error}
    >
    <EditCategoryForm 
      withoutCreateParent={false}
      onSubmit={handleSubmit}
      formLayout="vertical"
    />
    </EditEntityLayout>
  )
}

export default CategoryCreate;