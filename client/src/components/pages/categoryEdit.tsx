import React, { useState } from "react";
import EditCategoryForm from "../shared/forms/editCategoryForm";
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useCategoryDetailsQuery, useEditCategoryMutation } from "../../store/services/categoriesApi";
import { CategoryInput, FullCategoryInput } from "../../types";

const { Title } = Typography;


const CategoryEdit: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();


  const [displayError, setDisplayError] = useState<boolean>(false);

  const {
    data: categoryDetails, isLoading: isCategoryLoading, error: categoryDetailsError
  } = useCategoryDetailsQuery({uuid: id!, withParent: true});

  console.log('categoryDetails', categoryDetails);


  const [editCategory] = useEditCategoryMutation();


  const initialData: FullCategoryInput | undefined = (!isCategoryLoading && categoryDetails) ? {
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

  return (<div>
    {
      isCategoryLoading
        ? <LoadingOutlined />
        : <>
          <Title>Редактировать категорию</Title>
          <EditCategoryForm
            formLayout="vertical"
            recordData={initialData}
            onSubmit={handleSubmit}
          />
          {
            categoryDetailsError && displayError
              ? <Alert
                message="Ошибка"
                description="Сетевая ошибка при изменении категории"
                type="error"
                closable
                onClose={() => setDisplayError(false)}
              />
              : null
          }
        </>
    }
  </div>)
}

export default CategoryEdit;