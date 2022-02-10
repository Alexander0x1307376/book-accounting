import { message, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import React, { useMemo, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { BASE_API_URL } from '../../../constants/server';



export interface UploadImageProps {
  imageValue?: any[];
  onChange: (value: any) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ imageValue = [], onChange}) => {

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

  // const [imageData, setImageData] = useState<any>([]);
  const isImageLoading = useMemo(() => imageValue[0]?.status === 'uploading', [imageValue]);

  const uploadUrl = BASE_API_URL + 'upload-image';

  const uploadButton = (
    <div>
      {isImageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );

  return (
    <Upload
      name="image"
      listType="picture-card"
      action={uploadUrl}
      beforeUpload={beforeUpload}
      onChange={(info) => onChange(info.fileList)}
      fileList={imageValue}
      onRemove={() => onChange([])}
    >
      {!imageValue.length && uploadButton}
    </Upload>)
}

export default UploadImage;