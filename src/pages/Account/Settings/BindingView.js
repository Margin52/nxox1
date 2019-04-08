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
          data: "blts",
        }
      })
    }).then((res) => {
      if(res.code === 1){
        this.setState({
          setData:res.data.value[0]
        })
      }
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
  mWorkChange = (time,timeString) => {
    this.setState({
      mwork: timeString
    })
  }

  mWorkChange1 = (time,timeString) => {
    this.setState({
      mwork1: timeString
    })
  }
  
  // 下午上班时间
  aWorkChange = (time,timeString) => {
    this.setState({
      awork: timeString
    })
  }

  aWorkChange1 = (time,timeString) => {
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
      template,
      signname,
      akeysecret,
      setData,
      akeyid,
    } = this.state;
    if(setData.template !=="" && setData.signname !== "" && setData.akeysecret!=="" && setData.akeyid !==""){
      console.log(111111)
      new Promise((resolve) => {
        dispatch({
          type: 'configs/configEdit',
          payload: {
            resolve,
            data: 
            {
              value:[
                {
                  template: template || setData.template,
                  sign_name: signname || setData.sign_name,
                  access_key_secret: akeysecret || setData.access_key_secret,
                  access_key_id: akeyid || setData.access_key_id,
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
                data: "blts",
              }
            })
          }).then(() => {
          })
        } else {
          message.error("提交失败")
        }
      })
    } else {
      console.log(222222)
      new Promise((resolve) => {
        dispatch({
          type: 'set/configAdd',
          payload: {
            resolve,
            data: {
              uaid: 2,
              udid: 0,
              key:'blts',
              act: 'form',
              value:[
                {
                  template: template,
                  sign_name: signname,
                  access_key_secret: akeysecret,
                  access_key_id: akeyid,
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
                data: "blts",
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

 

  render() {
    const { 
      submitting,
      form: { getFieldDecorator },
    }  = this.props;
    const { setData } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
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
