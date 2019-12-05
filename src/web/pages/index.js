import React from 'react';
import { ConfigProvider, DatePicker, message, Alert } from 'antd';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = date => {
    message.info(`您选择的日期是: ${date ? date.format('YYYY-MM-DD') : '未选择'}`);
    this.setState({ date });
  };
  render() {
    const { date } = this.state;
    return (
      <ConfigProvider>
        <div style={{ width: 400, margin: '100px auto' }}>
          <DatePicker onChange={this.handleChange} />
          <div style={{ marginTop: 20 }}>
            <Alert message={`当前日期：${date ? date.format('YYYY-MM-DD') : '未选择'}`} type="success" />
          </div>
        </div>
      </ConfigProvider>
    );
  }
}
