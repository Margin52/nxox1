import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import router from 'umi/router';
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  Radio,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Step2.less';

const { Option } = Select;
const FormItem = Form.Item;

@connect(({ loading,driver }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  driver
}))
@Form.create()
class BasicForms extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      dname:'',
      dphone:'',
      statusdrvier:'',
      driverData: '',
      age: ''
    }
  }
  
  componentDidMount(){
    const { dispatch,location } = this.props;
    if(location.params !== undefined){
      new Promise((resolve) => {
        dispatch({
          type: 'driver/driveredit',
          payload: {
            resolve,
            data: location.params,
          }
        })
      }).then((res) => {
        if(res.code === 1){
          this.setState({
            driverData: res.data
          })
        }else{
          // message.error(res.msg)
        }
      })
    }
  }

  // 提交司机
  submitDriver = () => {
    const { dispatch,location } = this.props;
    const { driverData } = this.state;
    
    if(location.params !== ""){
      const params = {
        name:this.state.dname || driverData.name,   // 司机名称
        phone:this.state.dphone || driverData.phone,    // 司机电话
        age: this.state.age || driverData.age,
        // status: this.state.statusdrvier || driverData.status,  //司机状态
        id: location.params
      };
      new Promise((resolve) => {
        dispatch({
          type: 'driver/driveradd',
          payload: {
            resolve,
            data: params,
          }
        })
      }).then((res) => {
        if(res.code === 1){
          router.push('/dashboard/driver-list/info');
        }else{
          message.error(res.msg)
        }
      })
    } else {
      const params = {
        driver_name:this.state.dname,   // 司机名称
        phone:this.state.dphone,    // 司机电话
        age: this.state.age
        // status: this.state.statusdrvier,  //司机状态
      };
      new Promise((resolve) => {
        dispatch({
          type: 'driver/driveradd',
          payload: {
            resolve,
            data: params,
          }
        })
      }).then((res) => {
        if(res.code === 1){
          router.push('/dashboard/driver-list/info');
        }else{
          // message.error(res.msg)
        }
      })
    }
  }

  handelChange = (e) => {
    this.setState({
      dname:e.target.value
    })
  }

  ageChange = (e) => {
    this.setState({
      age: e.target.value
    })
  }

  phoneChange = (e) => {
    this.setState({
      dphone:e.target.value
    })
  }

  statusChange = (e) => {
    this.setState({
      statusdrvier:e.target.value
    })
  }


  render() {
    const { 
      submitting,
      driver: { driver }, 
    }  = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {driverData} = this.state;
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
        title={<FormattedMessage id="司机列表" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="司机姓名">
              {getFieldDecorator('title', {
                initialValue: driverData.name,
                rules: [
                  {
                    required: true,
                    message: "请输入司机姓名",
                  },
                ],
              })(<Input placeholder="司机姓名" onChange={this.handelChange.bind(this)} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="司机年龄">
              {getFieldDecorator('age', {
                initialValue: driverData.age,
                rules: [
                  {
                    required: true,
                    message: "请输入司机年龄",
                  },
                ],
              })(<Input placeholder="司机年龄" onChange={this.ageChange} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="司机电话">
              {getFieldDecorator('phone', {
                initialValue: driverData.phone,
                rules: [
                  {
                    required: true,
                    message: "请输入司机电话",
                  },
                ],
              })(<Input placeholder="司机电话" onChange={this.phoneChange.bind(this)} />)}
            </FormItem>
            {/* <FormItem
              {...formItemLayout}
              label="司机状态"
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: driverData.status,
                })(
                  <Radio.Group onChange={this.statusChange} value={driverData.status}>
                    <Radio value={1}>
                      <FormattedMessage id="form.public.radio.driver" />
                    </Radio>
                    <Radio value={2}>
                      <FormattedMessage id="form.public.radio.driverone" />
                    </Radio>
                    <Radio value={3}>
                      <FormattedMessage id="form.public.radio.drivertwo" />
                    </Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem> */}
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting} onClick={this.submitDriver.bind(this)}>
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
