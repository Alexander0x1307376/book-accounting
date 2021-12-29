import { Alert } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../store/services/categoriesApi";
import { CategoryInput } from "../../types";
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

  return (<div>
    <EditCategoryForm 
      withoutCreateParent={false}
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
  </div>)
}

export default CategoryCreate;