import React from 'react';
import { Spin, Space } from 'antd';

import './spinner.scss';

const Spinner = () => (
  <Space size="middle">
    <Spin size="large" />
  </Space>
);

export default Spinner;
