import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Setting.less';


const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ loading,shopadd,shop,shopEdit,set }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  shopadd,
  shop,
  shopEdit,
  set
}))
@Form.create()
class BasicForms extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      phone:'',
      address:'',
      loading: false,
      setData:'',
      template:'',
      signname:'',
      akeysecret:'',
      akeyid:'',
      awork:'',
      mwork:'',
      orderdistance:'',
      sumbucket:'',
      maxbucket:'',
      timesecond:'',
    }
  }

  componentDidMount(){
    const {dispatch} = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'set/setedit',
        payload: {
          resolve,
          data: "",
        }
      })
    }).then((res) => {
      console.log(res,'res')
      this.setState({
        setData:res.data
      })
    })
  }

  // 重新呼叫司机的时间间隔
  timeChange = (e) => {
    this.setState({
      timesecond: e.target.value
    })
  }

  // 商户最大能选择多少桶
  maxBucketChange = (e) => {
    this.setState({
      maxbucket: e.target.value
    })
  }
  

  // 汽车最多能拉多少桶
  sumBucketChange = (e) => {
    this.setState({
      sumbucket: e.target.value
    })
  }

  // 司机显示多少米以内的商户
  orderDistanceChange = (e) => {
    this.setState({
      orderdistance: e.target.value
    })
  }

  // 上午上班时间
  mWorkChange = (value) => {
    this.setState({
      mwork: value
    })
  }
  
  // 下午上班时间
  aWorkChange = (value) => {
    this.setState({
      awork: value
    })
  }

  // 阿里云短信key
  akeyIdChange = (e) => {
    this.setState({
      akeyid: e.target.value
    })
  }
  
  //  阿里云短信secret
  akeysecretChange = (e) => {
    this.setState({
      akeysecret: e.target.value
    })
  }

  //  阿里云短信签名
  signnameChange = (e) => {
    this.setState({
      signname: e.target.value
    })
  }
  
  //  短信模板
  templateChange = (e) => {
    this.setState({
      template: e.target.value
    })
  }

  setSubmit = () => {
    const {dispatch} = this.props;
    const {
      setData,
      template,
      signname,
      akeysecret,
      akeyid,
      awork,
      mwork,
      orderdistance,
      sumbucket,
      maxbucket,
      timesecond,
    } = this.state;
    const params = {
      template: template || setData.template,
      sign_name: signname || setData.sign_name,
      access_key_secret: akeysecret || setData.access_key_secret,
      access_key_id: akeyid || setData.access_key_id,
      afternoon_work_time: awork || setData.afternoon_work_time,
      morning_work_time: mwork || setData.morning_work_time,
      order_distance: orderdistance || setData.order_distance,
      sum_bucket: sumbucket || setData.sum_bucket,
      max_bucket: maxbucket || setData.max_bucket,
      receipt_second: timesecond || setData.receipt_second
    }
    new Promise((resolve) => {
      dispatch({
        type: 'set/setadd',
        payload: {
          resolve,
          data: params,
        }
      })
    }).then((res) => {
      if(res.code === "200"){
        message.success("提交成功")
        new Promise((resolve) => {
          dispatch({
            type: 'set/setedit',
            payload: {
              resolve,
              data: "",
            }
          })
        }).then(() => {
        })
      } else {
        message.error("提交失败")
      }
      console.log(res,'系统设置的添加')
    })
  }


  render() {
    const { 
      submitting,
      form: { getFieldDecorator },
    }  = this.props;
    const { setData } = this.state;
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
        title={<FormattedMessage id="系统设置" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }} className={styles.setboxs}>
            <FormItem label="重新呼叫司机的时间间隔">
              {getFieldDecorator('drivertime', {
                initialValue: setData.receipt_second,
                rules: [
                  {
                    required: true,
                    message: "时间间隔",
                  },
                ],
              })
              (<Input 
                placeholder="时间间隔" 
                onChange={this.timeChange} 
              />)}
            </FormItem>
            <FormItem label="商户最大能选择多少桶">
              {getFieldDecorator('shopnum', {
                initialValue: setData.max_bucket,
                rules: [
                  {
                    required: true,
                    message: "商户最大能选择多少桶",
                  },
                ],
              })
              (<Input 
                placeholder="商户最大能选择多少桶" 
                onChange={this.maxBucketChange} 
              />)}
            </FormItem>
            <FormItem label="汽车最多能拉多少桶">
              {getFieldDecorator('carnum', {
                initialValue: setData.sum_bucket,
                rules: [
                  {
                    required: true,
                    message: "汽车最多能拉多少桶",
                  },
                ],
              })(<Input placeholder="汽车最多能拉多少桶" onChange={this.sumBucketChange} />)}
            </FormItem>
            <FormItem label="司机显示多少米以内的商户">
              {getFieldDecorator('meter', {
                initialValue: setData.order_distance,
                rules: [
                  {
                    required: true,
                    message: "司机显示多少米以内的商户",
                  },
                ],
              })(<Input placeholder="司机显示多少米以内的商户" onChange={this.orderDistanceChange} />)}
            </FormItem>
            {/* <FormItem {...formItemLayout} label="上午上班时间">
              {getFieldDecorator('worktime', {
                initialValue: setData.morning_work_time,
                rules: [
                  {
                    required: true,
                    message: "上午上班时间",
                  },
                ],
              })(<Input placeholder="上午上班时间" onChange={this.mWorkChange} />)}
            </FormItem> */}
            <FormItem label="上午上班时间">
              {getFieldDecorator('worktime', {
                initialValue: setData.morning_work_time,
                rules: [
                  {
                    required: true,
                    message: "上午上班时间",
                  },
                ],
              })(
                <Select defaultValue={setData.morning_work_time} onChange={this.mWorkChange}>
                  <Option value="8:00~11:00">8:00~11:00</Option>
                  <Option value="8:30~11:30">8:30~11:30</Option>
                  <Option value="9:00~11:00">9:00~11:00</Option>
                  <Option value="9:00~12:00">9:00~12:00</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="下午上班时间">
              {getFieldDecorator('upworktime', {
                initialValue: setData.afternoon_work_time,
                rules: [
                  {
                    required: true,
                    message: "下午上班时间",
                  },
                ],
              })(
                <Select defaultValue={setData.afternoon_work_time} onChange={this.aWorkChange}>
                  <Option value="13:00~18:00">13:00~18:00</Option>
                  <Option value="13:30~18:30">13:30~18:30</Option>
                  <Option value="14:00~17:30">14:00~17:30</Option>
                  <Option value="14:00~18:00">14:00~18:00</Option>
                </Select>
              )}
            </FormItem>
            
            {/* <FormItem {...formItemLayout} label="下午上班时间">
              {getFieldDecorator('upworktime', {
                initialValue: setData.afternoon_work_time,
                rules: [
                  {
                    required: true,
                    message: "下午上班时间",
                  },
                ],
              })(<Input placeholder="下午上班时间" onChange={this.aWorkChange} />)}
            </FormItem> */}
            <FormItem label="阿里云短信key">
              {getFieldDecorator('dxkey', {
                initialValue: setData.access_key_id,
                rules: [
                  {
                    required: true,
                    message: "阿里云短信key",
                  },
                ],
              })(<Input placeholder="阿里云短信key" onChange={this.akeyIdChange} />)}
            </FormItem>
            <FormItem label="阿里云短信secret">
              {getFieldDecorator('secret', {
                initialValue: setData.access_key_secret,
                rules: [
                  {
                    required: true,
                    message: "阿里云短信secret",
                  },
                ],
              })(<Input placeholder="阿里云短信secret" onChange={this.akeysecretChange} />)}
            </FormItem>
            <FormItem label="短信签名">
              {getFieldDecorator('dxsign', {
                initialValue: setData.sign_name,
                rules: [
                  {
                    required: true,
                    message:"短信签名"
                  },
                ],
              })(<Input placeholder="短信签名" onChange={this.signnameChange} />)}
            </FormItem>
            <FormItem label="短信模板">
              {getFieldDecorator('dxmb', {
                initialValue: setData.template,
                rules: [
                  {
                    required: true,
                    message: "短信模板",
                  },
                ],
              })(<Input placeholder="短信模板" onChange={this.templateChange} />)}
            </FormItem>
            <FormItem style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting} onClick={this.setSubmit.bind(this)}>
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
