import React, { PureComponent, Fragment } from 'react';
import { Card } from 'antd';


export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  

  render() {
    const { children } = this.props;
    return (
      // <PageHeaderWrapper title="小程序列表" content={content} extraContent={extraContent}>
        <Card bordered={false}>
          <Fragment>
            {children}
          </Fragment>
        </Card>
      // </PageHeaderWrapper>
    );
  }
}
