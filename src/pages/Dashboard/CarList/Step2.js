import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import router from 'umi/router';
import {
  Form,
  Input,
  Button,
  Card,
  Radio,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Step2.less';

const FormItem = Form.Item;

@connect(({ loading,car }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  car
}))
@Form.create()
class BasicForms extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      carnum:'',   
      carstatus:'',    
      carData: '',
      numebrvalue: ''
    }
  }

  componentDidMount(){
    const { dispatch,location } = this.props;
    if( location.params !== undefined){
      new Promise((resolve) => {
        dispatch({
          type: 'car/caredit',
          payload: {
            resolve,
            data: location.params,
          }
        })
      }).then((res) => {
        if(res.code === 1){
          this.setState({
            carData: res.data
          })
        }else{
          // message.error(res.msg)
        }
      })
    }
  }
  
  submitCar = () => {
    const { dispatch,location } = this.props;
    const { carData,carnum,numebrvalue } = this.state;
    if( location.params !== ""){
      const params = {
        license: carnum || carData.license,   // 车牌号
        bucket_count: numebrvalue || carData.bucket_count,   // 车辆状态
        id: location.params
      };
      new Promise((resolve) => {
        dispatch({
          type: 'car/caradd',
          payload: {
            resolve,
            data: params,
          }
        })
      }).then((res) => {
        if(res.code === 1){
          router.push('/dashboard/car-list/info')
        }else{
          message.error(res.msg)
        }
      })
    }else{
      const params = {
        license: carnum,   // 车牌号
        bucket_count: numebrvalue    // 车辆状态
      };
      new Promise((resolve) => {
        dispatch({
          type: 'car/caradd',
          payload: {
            resolve,
            data: params,
          }
        })
      }).then((res) => {
        if(res.code === 1){
          router.push('/dashboard/car-list/info')
        }else{
          message.error(res.msg)
        }
      })
    }
  }

 

  handelChange = (e) => {
    this.setState({
      carnum:e.target.value
    })
  }

  numberChange = (e) => {
    this.setState({
      numebrvalue: e.target.value
    })
  }

  phoneChange = (e) => {
    this.setState({
      carstatus:e.target.value
    })
  }

  render() {
    const { 
      submitting,
    }  = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {carData} = this.state;
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
        title={<FormattedMessage id="汽车列表" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="车牌号">
              {getFieldDecorator('title', {
                initialValue:carData.license,
                rules: [
                  {
                    required: true,
                    message: "请输入车牌号",
                  },
                ],
              })(<Input placeholder="车牌号" onChange={this.handelChange} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="装载容量(桶)">
              {getFieldDecorator('number', {
                initialValue:carData.bucket_count,
                rules: [
                  {
                    required: true,
                    message: "请输入装载容量",
                  },
                ],
              })(<Input placeholder="容量" onChange={this.numberChange} />)}
            </FormItem>
            {/* <FormItem
              {...formItemLayout}
              label="车辆状态"
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: carData.status,
                })(
                  <Radio.Group onChange={this.phoneChange.bind(this)} value={carData.status}>
                    <Radio value={1}>
                      <FormattedMessage id="form.public.radio.car" />
                    </Radio>
                    <Radio value={2}>
                      <FormattedMessage id="form.public.radio.carone" />
                    </Radio>
                    <Radio value={3}>
                      <FormattedMessage id="form.public.radio.cartwo" />
                    </Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem> */}
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting} onClick={this.submitCar}>
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
