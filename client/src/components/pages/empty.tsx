import { Row, Col } from "antd";
import React from "react";

const Empty: React.FC = () => {
  return (
    <Row 
      align="middle"
      justify="center" 
      style={{
        height: '300px'
      }}
    >
      <Col span={10}>
        <div style={{
          textAlign: 'center'
        }}>
          Здесь отобразится запись, которую вы выберите
        </div>
      </Col>
    </Row>
  )
}

export default Empty;