import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  Button,
  TimePicker,
  message
} from 'antd';
import styles from './BaseView.less';


const FormItem = Form.Item;
const format = 'HH:mm';

@connect(({ loading,shopadd,shop,shopEdit,set,user,configs }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  shopadd,
  shop,
  shopEdit,
  currentUser: user.currentUser,
  set,
  configs
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
      mwork1:'',
      awork1: '',
      moringtime: ''
    }
  }

  componentDidMount = () => {
    const {dispatch} = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'configs/congigList',
        payload: {
          resolve,
          data: "bltbasic",
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
      setData,
      awork,
      awork1,
      mwork1,
      mwork,
    } = this.state;
    
    if(setData.awork !=="" && setData.awork1 !== "" && setData.mwork1!=="" && setData.mwork !==""){
      console.log(111111)
      new Promise((resolve) => {
        dispatch({
          type: 'configs/configEditBasic',
          payload: {
            resolve,
            data: 
            {
              value:[
                {
                  afternoon_work_time: awork + '~' + awork1 || setData.afternoon_work_time,
                  morning_work_time: mwork + '~' + mwork1 || setData.morning_work_time
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
                data: "bltbasic",
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
              uaid: 2,
              udid: 0,
              key:'bltbasic',
              value:[
                {
                  afternoon_work_time: awork + '~' + awork1,
                  morning_work_time: mwork + '~' + mwork1
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
                data: "bltbasic",
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

  getViewDom = ref => {
    this.view = ref;
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  render() {
    const { 
      submitting,
      form: { getFieldDecorator },
    }  = this.props;
    const { setData } = this.state;


    const moring = setData.morning_work_time;
    if(moring !== undefined){
      this.setState({
        moringtime: moring.substring(0,5)
      })
      console.log(typeof(this.state.moringtime),"moringtime")
      // const moringgo = this.state.moringtime
      // let testdata = moment(moringgo, "HH:mm");
      // console.log(moringgo,testdata,'gsagsu')
    }
    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }} className={styles.setboxs}>
        <FormItem label="上午上班时间">
          {getFieldDecorator('worktime', {
            initialValue: setData.morning_work_time,
            // initialValue: [moment(setData.morning_work_time, format), moment(setData.morning_work_time, format)],
            rules: [
              {
                required: true,
                message: "上午上班时间",
              },
            ],
          })(
            <div>
              <TimePicker onChange={this.mWorkChange} defaultValue={moment(setData.morning_work_time !== undefined ? (setData.morning_work_time).substring(0,5) : '09:00',format)} format={format} />
              <span style={{fontSize:'18px',margin:'0 15px'}}>~</span>
              <TimePicker onChange={this.mWorkChange1} defaultValue={moment(setData.morning_work_time !== undefined ? (setData.morning_work_time).substring(7,11) : '12:00', format)} format={format} />
            </div>
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
            <div>
              <TimePicker onChange={this.aWorkChange} defaultValue={moment(setData.afternoon_work_time !== undefined ? (setData.afternoon_work_time).substring(0,5): '13:00', format)} format={format} />
              <span style={{fontSize:'18px',margin:'0 15px'}}>~</span>
              <TimePicker onChange={this.aWorkChange1} defaultValue={moment(setData.afternoon_work_time !== undefined ? (setData.afternoon_work_time).substring(7,11) : '18:00', format)} format={format} />
            </div>
          )}
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

export default BasicForms;
