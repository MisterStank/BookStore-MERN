import React from 'react';
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Spinner;
