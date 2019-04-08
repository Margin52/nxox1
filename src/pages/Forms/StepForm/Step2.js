// import React from 'react';
// import { connect } from 'dva';
// import { Form, Input, Button, Alert, Divider } from 'antd';
// import router from 'umi/router';
// import { digitUppercase } from '@/utils/utils';
// import styles from './style.less';

// const formItemLayout = {
//   labelCol: {
//     span: 5,
//   },
//   wrapperCol: {
//     span: 19,
//   },
// };

// @connect(({ form, loading }) => ({
//   submitting: loading.effects['form/submitStepForm'],
//   data: form.step,
// }))
// @Form.create()
// class Step2 extends React.PureComponent {
//   render() {
//     const { form, data, dispatch, submitting } = this.props;
//     const { getFieldDecorator, validateFields } = form;
//     const onPrev = () => {
//       router.push('/form/step-form/info');
//     };
//     const onValidateForm = e => {
//       e.preventDefault();
//       validateFields((err, values) => {
//         if (!err) {
//           dispatch({
//             type: 'form/submitStepForm',
//             payload: {
//               ...data,
//               ...values,
//             },
//           });
//         }
//       });
//     };
//     return (
//       <Form layout="horizontal" className={styles.stepForm}>
//         <Alert
//           closable
//           showIcon
//           message="确认转账后，资金将直接打入对方账户，无法退回。"
//           style={{ marginBottom: 24 }}
//         />
//         <Form.Item {...formItemLayout} className={styles.stepFormText} label="付款账户">
//           {data.payAccount}
//         </Form.Item>
//         <Form.Item {...formItemLayout} className={styles.stepFormText} label="收款账户">
//           {data.receiverAccount}
//         </Form.Item>
//         <Form.Item {...formItemLayout} className={styles.stepFormText} label="收款人姓名">
//           {data.receiverName}
//         </Form.Item>
//         <Form.Item {...formItemLayout} className={styles.stepFormText} label="转账金额">
//           <span className={styles.money}>{data.amount}</span>
//           <span className={styles.uppercase}>（{digitUppercase(data.amount)}）</span>
//         </Form.Item>
//         <Divider style={{ margin: '24px 0' }} />
//         <Form.Item {...formItemLayout} label="支付密码" required={false}>
//           {getFieldDecorator('password', {
//             initialValue: '123456',
//             rules: [
//               {
//                 required: true,
//                 message: '需要支付密码才能进行支付',
//               },
//             ],
//           })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
//         </Form.Item>
//         <Form.Item
//           style={{ marginBottom: 8 }}
//           wrapperCol={{
//             xs: { span: 24, offset: 0 },
//             sm: {
//               span: formItemLayout.wrapperCol.span,
//               offset: formItemLayout.labelCol.span,
//             },
//           }}
//           label=""
//         >
//           <Button type="primary" onClick={onValidateForm} loading={submitting}>
//             提交
//           </Button>
//           <Button onClick={onPrev} style={{ marginLeft: 8 }}>
//             上一步
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }

// export default Step2;


import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';
import router from 'umi/router';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class CardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 2,
      },
    });
    
  }

  render() {
    const {
      list: { list },
      loading,
    } = this.props;

    // const onValidateForm = () => {
    //   router.push('/dashboard/Workplace');
    // };
    // const onPrev = () => {
    //   router.push('/form/step-form/info');
    // };
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          该列表为保绿特小程序所有分区管理列表，按照创建时间顺序依次排列，您可随时添加新的分区。
        </p>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    // const onNext = () => {
    //   router.push('/dashboard/monitor/cardListDetail');
    // };

    return (
      <PageHeaderWrapper title="保绿特" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={[<a>编辑</a>,<a>删除</a>]}>
                    <Card.Meta
                      title={<a>{item.detailtitle}</a>}
                      description={
                        <Ellipsis className={styles.itemdetail} lines={3}>
                          <Icon type="environment-o" className={styles.detailDescIcon} />
                          {item.detailDescription}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 添加分区
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CardList;

