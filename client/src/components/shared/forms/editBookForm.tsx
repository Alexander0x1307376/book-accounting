import React, { useEffect, useMemo, useState } from "react";
import { BookInput, FullBookInput } from "../../../types";
import { Form, Input, Button, FormInstance, Upload, message } from "antd";
import CategoryInput from "../relationField/categoryInput";
import AuthorsInput from "../relationField/authorsInput";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from "antd/lib/upload";


type LayoutType = Parameters<typeof Form>[0]['layout'];


interface EditBookFormProps {
  recordData?: FullBookInput;
  onSubmit?: (values: BookInput) => void;
  formLayout?: LayoutType;
  withoutSubmitButton?: boolean;
  form?: FormInstance<any>;
}



const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('Только файлы в формате PNG или JPG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Только изображения меньше 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const baseUrl = 'http://localhost:8000/';


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
  const isImageLoading = useMemo(() => imageData[0]?.status === 'uploading', [imageData]);

  const handleChange = (info: UploadChangeParam<any>) => {
    setImageData(info.fileList);
  }

  const onFinish = (values: any): void => {
    const submitData = {
      isbn: values.isbn,
      name: values.name,
      imageUrl: imageData[0].response.path,
      description: values.description,
      categoryId: values.category.value,
      authorsIds: values.authors.map(({ value }: any) => value)
    };
    onSubmit?.(submitData);
  };

  useEffect(() => {


    setImageData([{
      uid: '-1',
      name: recordData?.imageUrl,
      status: 'done',
      url: baseUrl + recordData?.imageUrl
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


  const uploadButton = (
    <div>
      {isImageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );

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
        <Upload 
          name="image"
          listType="picture-card"
          action={baseUrl + 'upload'}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          fileList={imageData}
          onRemove={() => setImageData([])}
        >
          { !imageData.length && uploadButton }
        </Upload>
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