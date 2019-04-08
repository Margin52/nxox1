import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import { Icon, List,Form,
  Input,
  Button,
  Card,
  Select,
  Upload,
  TimePicker,
  message } from 'antd';

  const FormItem = Form.Item;

  @connect(({ loading,set,user,configs }) => ({
    submitting: loading.effects['form/submitRegularForm'],
    configs,
    currentUser: user.currentUser,
    set
  }))
  @Form.create()
class BindingView extends Component {

  state = {
    setData: '',
    phone:'',
    address:'',
    loading: false,
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
    mwork1:'',
    awork1: '',
    moringtime: ''
  }

  componentDidMount(){
    const {dispatch} = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'configs/congigList',
        payload: {
          resolve,
          data: "bltsec",
        }
      })
    }).then((res) => {
      console.log(res,'res')
      if(res.code === 1){
        this.setState({
          setData:res.data.value[0]
        })
      }
      
    })
  }

  getData = () => [
    {
      title: formatMessage({ id: 'app.settings.binding.taobao' }, {}),
      description: formatMessage({ id: 'app.settings.binding.taobao-description' }, {}),
      actions: [
        <a>
          <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="taobao" className="taobao" />,
    },
    {
      title: formatMessage({ id: 'app.settings.binding.alipay' }, {}),
      description: formatMessage({ id: 'app.settings.binding.alipay-description' }, {}),
      actions: [
        <a>
          <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="alipay" className="alipay" />,
    },
    {
      title: formatMessage({ id: 'app.settings.binding.dingding' }, {}),
      description: formatMessage({ id: 'app.settings.binding.dingding-description' }, {}),
      actions: [
        <a>
          <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="dingding" className="dingding" />,
    },
  ];


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
  mWorkChange = (time,timeString) => {
    console.log(time,'time')
    console.log(timeString,'111111')
    this.setState({
      mwork: timeString
    })
  }

  mWorkChange1 = (time,timeString) => {
    console.log(timeString,'222222')
    this.setState({
      mwork1: timeString
    })
  }
  
  // 下午上班时间
  aWorkChange = (time,timeString) => {
    console.log(timeString,'kkkkk')
    this.setState({
      awork: timeString
    })
  }

  aWorkChange1 = (time,timeString) => {
    console.log(timeString,'mmmmmm')
    this.setState({
      awork1: timeString
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
      orderdistance,
      sumbucket,
      maxbucket,
      timesecond,
    } = this.state;
    if(setData.order_distance !=="" && setData.sum_bucket !== "" && setData.max_bucket!=="" && setData.receipt_second !==""){
      console.log(111111)
      new Promise((resolve) => {
        dispatch({
          type: 'configs/configEditSec',
          payload: {
            resolve,
            data: 
            {
              value:[
                {
                  order_distance: orderdistance || setData.order_distance,
                  sum_bucket: sumbucket || setData.sum_bucket,
                  max_bucket: maxbucket || setData.max_bucket,
                  receipt_second: timesecond || setData.receipt_second
                }
              ]
            }
          }
        })
      }).then((res) => {
        if(res.code === 1){
          message.success("提交成功")
          new Promise((resolve) => {
            dispatch({
              type: 'configs/congigList',
              payload: {
                resolve,
                data: "bltsec",
              }
            })
          }).then(() => {
          })
        } else {
          message.error("提交失败")
        }
      })
    } else {
      new Promise((resolve) => {
        dispatch({
          type: 'configs/configAdd',
          payload: {
            resolve,
            data: {
              key: 'bltsec',
              uaid: 2,
              udid: 0,
              value: [
                {
                  order_distance: orderdistance,
                  sum_bucket: sumbucket,
                  max_bucket: maxbucket,
                  receipt_second: timesecond
                }
              ]
            },
          }
        })
      }).then((res) => {
        if(res.code === 1){
          message.success("提交成功")
          new Promise((resolve) => {
            dispatch({
              type: 'configs/congigList',
              payload: {
                resolve,
                data: "bltsec",
              }
            })
          }).then(() => {
          })
        } else {
          message.error("提交失败")
        }
      })
    }
   
  }
 

  render() {
    const { 
      submitting,
      form: { getFieldDecorator },
    }  = this.props;
    const { setData } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
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
        <FormItem style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={submitting} onClick={this.setSubmit}>
            <FormattedMessage id="form.submit" />
          </Button>
        </FormItem>
      </Form>
    );
  }
}

// export default BindingView;


const WrappedRegistrationForm = Form.create()(BindingView);
export default WrappedRegistrationForm;
