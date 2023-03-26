import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';

const UploadImage = ({title, setImage}) => (
  <Space direction="vertical" style={{ width: '100%' }} size="large">
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={1}
      onChange={(e)=> {
        if(e.file.status=== "done") {
            setImage(e.file)
        }
      }}
    >
      <Button icon={<UploadOutlined />}>{title}</Button>
    </Upload>
  </Space>
);

export default UploadImage;