// import React, { Fragment } from 'react';
// import { connect } from 'dva';
// import { Form, Input, Button, Select, Divider } from 'antd';
// import router from 'umi/router';
// import styles from './style.less';

// const { Option } = Select;

// const formItemLayout = {
//   labelCol: {
//     span: 5,
//   },
//   wrapperCol: {
//     span: 19,
//   },
// };

// @connect(({ form }) => ({
//   data: form.step,
// }))
// @Form.create()
// class Step1 extends React.PureComponent {
//   render() {
//     const { form, dispatch, data } = this.props;
//     const { getFieldDecorator, validateFields } = form;
//     const onValidateForm = () => {
//       validateFields((err, values) => {
//         if (!err) {
//           dispatch({
//             type: 'form/saveStepFormData',
//             payload: values,
//           });
//           router.push('/form/step-form/confirm');
//         }
//       });
//     };
//     return (
//       <Fragment>
//         <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
//           <Form.Item {...formItemLayout} label="付款账户">
//             {getFieldDecorator('payAccount', {
//               initialValue: data.payAccount,
//               rules: [{ required: true, message: '请选择付款账户' }],
//             })(
//               <Select placeholder="test@example.com">
//                 <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
//               </Select>
//             )}
//           </Form.Item>
//           <Form.Item {...formItemLayout} label="收款账户">
//             <Input.Group compact>
//               <Select defaultValue="alipay" style={{ width: 100 }}>
//                 <Option value="alipay">支付宝</Option>
//                 <Option value="bank">银行账户</Option>
//               </Select>
//               {getFieldDecorator('receiverAccount', {
//                 initialValue: data.receiverAccount,
//                 rules: [
//                   { required: true, message: '请输入收款人账户' },
//                   { type: 'email', message: '账户名应为邮箱格式' },
//                 ],
//               })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />)}
//             </Input.Group>
//           </Form.Item>
//           <Form.Item {...formItemLayout} label="收款人姓名">
//             {getFieldDecorator('receiverName', {
//               initialValue: data.receiverName,
//               rules: [{ required: true, message: '请输入收款人姓名' }],
//             })(<Input placeholder="请输入收款人姓名" />)}
//           </Form.Item>
//           <Form.Item {...formItemLayout} label="转账金额">
//             {getFieldDecorator('amount', {
//               initialValue: data.amount,
//               rules: [
//                 { required: true, message: '请输入转账金额' },
//                 {
//                   pattern: /^(\d+)((?:\.\d+)?)$/,
//                   message: '请输入合法金额数字',
//                 },
//               ],
//             })(<Input prefix="￥" placeholder="请输入金额" />)}
//           </Form.Item>
//           <Form.Item
//             wrapperCol={{
//               xs: { span: 24, offset: 0 },
//               sm: {
//                 span: formItemLayout.wrapperCol.span,
//                 offset: formItemLayout.labelCol.span,
//               },
//             }}
//             label=""
//           >
//             <Button type="primary" onClick={onValidateForm}>
//               下一步
//             </Button>
//           </Form.Item>
//         </Form>
//         <Divider style={{ margin: '40px 0 24px' }} />
//         <div className={styles.desc}>
//           <h3>说明</h3>
//           <h4>转账到支付宝账户</h4>
//           <p>
//             如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
//           </p>
//           <h4>转账到银行卡</h4>
//           <p>
//             如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
//           </p>
//         </div>
//       </Fragment>
//     );
//   }
// }

// export default Step1;


import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Tooltip } from 'antd';
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
        count: 5,
      },
    });
    
  }

  render() {
    const {
      list: { list },
      loading,
    } = this.props;

    const onValidateForm = () => {
      // const { dispatch } = this.props;
      // dispatch({
      //   type: 'dashboard/saveStepFormData',
      //   payload: values,
      // });
      router.push('/form/step-form/confirm');
    };

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          该小程序列表为您创建得了所有小程序，按照创建时间顺序依次排列，您可随时创建新的小程序。
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
    const cardContent = (
      <div className={styles.card_content}>
        <span><Icon type="message" /><em>微信</em></span>
        <span><Icon type="pay-circle" /><em>支付宝</em></span>
        <span><Icon type="rocket" /><em>熊掌管</em></span>
      </div>
    );

    // const onNext = () => {
    //   router.push('/dashboard/monitor/cardListDetail');
    // };

    return (
      <PageHeaderWrapper title="小程序列表" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable onClick={onValidateForm} className={styles.card} actions={[<Tooltip placement="bottomLeft" title={cardContent}><a href="#">授权</a></Tooltip>, <a>数据</a>,<a>扫码</a>, <a>...</a>]}>
                    <Button type="primary" ghost className={styles.btnPrimary}>{item.name}</Button>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a>{item.title}</a>}
                      name={<Button>{item.name}</Button>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.description}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 创建小程序
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

