import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Card,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Step2.less';

const FormItem = Form.Item;

@connect(({ loading,shopadd }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  shopadd
}))
@Form.create()
class BasicForms extends PureComponent {

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { dispatch } = this.props;
  //   const params = {
  //     title:this.state.inpValu,   // 标题
  //     lnt:'',    // 经度
  //     lat:'',    // 纬度
  //     address:this.state.address,   // 地址
  //     phone:this.state.phone,      // 电话
  //   };
  //   form.validateFieldsAndScroll((err, params) => {
  //     if (!err) {
  //       dispatch({
  //         type: 'shopadd/fetch',
  //         payload: params,
  //     });
  //     }
  //   });
  // };

  
  
  
  constructor(props){
    super(props);
    this.state = {
        inpValu:'',
        phone:'',
        address:'',
    }
  }
  
  submit() {
    const { dispatch } = this.props;
    const params = {
      title:this.state.inpValu,   // 标题
      lnt:'',    // 经度
      lat:'',    // 纬度
      address:this.state.address,   // 地址
      phone:this.state.phone,      // 电话
    };
    dispatch({
        type: 'shopadd/fetch',
        payload: params,
    });
  }

  handelChange(e){
    this.setState({
      inpValu:e.target.value
    })
  }

  phoneChange(e){
    this.setState({
      phone:e.target.value
    })
  }

  addressChange(e){
    this.setState({
      address:e.target.value
    })
  }

  render() {
    const { 
      submitting,
      shopadd: { shopadd }, 
    }  = this.props;
    console.log(this.props,'shopshops')
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {inpValu,phone,address} = this.state;
    console.log(this.state,'gggggggg')
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.title.label" />}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })
              (<Input 
                placeholder={formatMessage({ id: 'form.title.placeholder' })} 
                onChange={this.handelChange.bind(this)} 
              />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.phone-number.placeholder" />}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.phone-number.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.phone-number.placeholder' })} onChange={this.phoneChange.bind(this)} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.address.label" />}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.address.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.address.placeholder' })} onChange={this.addressChange.bind(this)} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.date.label" />}
            >
              {getFieldDecorator('date-picker')(
                <DatePicker style={{width:"100%"}} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting} onClick={this.submit.bind(this)}>
                <FormattedMessage id="form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
