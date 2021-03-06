import React, { useEffect, useState } from "react";
import { BookInput, FullBookInput } from "../../../types";
import { Form, Input, Button, FormInstance } from "antd";
import CategoryInput from "../complexInputFields/categoryInput";
import AuthorsInput from "../complexInputFields/authorsInput";
import UploadImage from "../complexInputFields/uploadImage";
import { UploadFile } from "antd/lib/upload/interface";
import { BASE_API_URL } from "../../../constants/server";


type LayoutType = Parameters<typeof Form>[0]['layout'];


interface EditBookFormProps {
  recordData?: FullBookInput;
  onSubmit?: (values: BookInput) => void;
  formLayout?: LayoutType;
  withoutSubmitButton?: boolean;
  form?: FormInstance<any>;
}

const EditBookForm: React.FC<EditBookFormProps> = ({
  recordData,
  onSubmit,
  formLayout = "horizontal",
  withoutSubmitButton,
  form
}) => {

  // #region стилизация
  const layout = (formLayout === "horizontal") ? {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  } : undefined;
  const tailLayout = (formLayout === "horizontal") ? {
    wrapperCol: { offset: 3, span: 16 },
  } : undefined;
  // #endregion

  const [imageData, setImageData] = useState<any>([]);

  useEffect(() => {

    if(recordData?.image) 
      setImageData([{
        uid: '-1',
        name: recordData.image.path,
        status: 'done',
        url: BASE_API_URL + recordData.image.path
      }]);


    const initialValues = {
      ...recordData,
      category: {
        value: recordData?.category?.uuid,
        label: recordData?.category?.name,
      },
      authors: recordData?.authors?.map(({ uuid, name }) => ({
        value: uuid,
        label: name
      })) || []
    };

    form?.setFieldsValue(initialValues);

  }, [recordData, form]);


  const setImageUuid = ([imageState]: UploadFile[]) => {
    if (!imageState || imageState?.status === 'removed') {
      return undefined;
    } 
      
    if (imageState?.status === 'done') {
      if (!imageState?.response) {
        return recordData?.image?.uuid;
      }
      else {
        return imageState?.response.uuid;
      }
    }
    
    return undefined;
  }

  const onFinish = (values: any): void => {

    const submitData = {
      isbn: values.isbn,
      name: values.name,
      imageId: setImageUuid(imageData),
      description: values.description,
      categoryId: values.category?.value,
      authorsIds: values.authors.map(({ value }: any) => value)
    };

    // console.log('editBookSubmit', submitData);
    onSubmit?.(submitData);
  };

  return (
    <Form
      {...layout}
      layout={formLayout}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        label="Изображение"
        name="imageUrl"
      >
        <UploadImage 
          imageValue={imageData} 
          onChange={(value) => {
            setImageData(value);
          }} 
        />
      </Form.Item>

      <Form.Item
        label="Название книги"
        name="name"
        rules={[{ required: true, message: "Название книги обязательно!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ISBN"
        name="isbn"
        rules={[{ required: true, message: "ISBN должен быть обязателен!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Категория"
        name="category"
      >
        <CategoryInput />
      </Form.Item>
      <Form.Item
        label="Авторы"
        name="authors"
      >
        <AuthorsInput />
      </Form.Item>

      <Form.Item name="description" label="Описание">
        <Input.TextArea autoSize={{
          minRows: 5,
          maxRows: 20
        }}/>
      </Form.Item>

      {
        !withoutSubmitButton
          ? (<Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>) 
        : null
      }
      
    </Form>
  );
}

export default EditBookForm;