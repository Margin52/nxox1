// import React, { PureComponent } from 'react';
// import { connect } from 'dva';
// import { formatMessage, FormattedMessage } from 'umi/locale';
// import router from 'umi/router';
// import { Map } from 'react-amap';
// import {
//   Form,
//   Input,
//   Button,
//   Card,
//   Radio,
//   Upload,
//   Icon,
//   message
// } from 'antd';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import styles from './Step2.less';

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJPG = file.type === 'image/jpeg';
//   if (!isJPG) {
//     message.error('You can only upload JPG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJPG && isLt2M;
// }

// const FormItem = Form.Item;
// const randomPosition = () => ({
//   longitude: 120 + Math.random() * 20,
//   latitude: 30 + Math.random() * 10,
// });


// @connect(({ loading,shopadd,shop,shopEdit }) => ({
//   submitting: loading.effects['form/submitRegularForm'],
//   shopadd,
//   shop,
//   shopEdit
// }))
// @Form.create()

// class BasicForms extends PureComponent {
//   constructor(props){
//     super(props);
//     this.state = {
//       inpValu:'',
//       phone:'',
//       address:'',
//       adstatus:'',
//       imgurls:'',
//       imgurlsagreen:'',
//       legalname:'',
//       shopeditValue:'',
//       statusvalue:'',
//       mapCenter: randomPosition()
//     }
//   }

//   state = {
//     loading: false,
//   };
  
//   componentDidMount = () => {
//     const {dispatch,location} = this.props;
//     if(location.params !== undefined){
//       new Promise((resolve) => {
//         dispatch({
//           type: 'shopEdit/eidtshop',
//           payload: {
//             resolve,
//             data: location.params,
//           }
//         })
//       }).then((res) => {
//         if(res.code === 1){
//           this.setState({
//             shopeditValue: res.data
//           })
//         }else{
//           // message.error(res.msg)
//         }
//       })
//     }
//   }

//   // 上传营业执照图片
//   handleChange = (info) => {
//     if (info.file.status === 'uploading') {
//       this.setState({ loading: true });
//       return;
//     }
//     if (info.file.status === 'done') {
//       this.setState({
//         imgurls: info.file.response.data.url
//       })
//       getBase64(info.file.originFileObj, imageUrl => this.setState({
//         imageUrl,
//         loading: false,
//       }));
//     }
//   }

//   // 上传运输协议图片
//   handleChangeArgeen = (info) => {
//     if (info.file.status === 'uploading') {
//       this.setState({ loading: true });
//       return;
//     }
//     if (info.file.status === 'done') {
//       this.setState({
//         imgurlsagreen: info.file.response.data.url
//       })
//       getBase64(info.file.originFileObj, imageUrlagreen => this.setState({
//         imageUrlagreen,
//         loading: false,
//       }));
//     }
//   }

//   statusChange = (e) => {
//     this.setState({
//       statusvalue:e.target.value
//     })
//     console.log(e,'status')
//   }
  
//   // 添加店铺
//   submit = () => {
//     const { dispatch,location } = this.props;
//     const { shopeditValue,legalname,inpValu,imgurls,imgurlsagreen,mapCenter,statusvalue } = this.state;
//     console.log(statusvalue,'9999999')
//     if(location.params !==""){
//       const params = {
//         // owner: legalname || shopeditValue.legal,  //法人姓名
//         // name:inpValu || shopeditValue.name,   // 标题
//         // lnt: mapCenter.longitude || shopeditValue.lnt,    // 经度
//         // lat: mapCenter.latitude || shopeditValue.lat,    // 纬度
//         // address: this.state.address || shopeditValue.address,   // 地址
//         // phone: this.state.phone || shopeditValue.phone,      // 电话
//         // business_licence: imgurls || shopeditValue.business_licence,   //营业执照
//         // agreement: imgurlsagreen || shopeditValue.agreement,
//         // id: this.props.location.params,
//         // status: 1,
//         // uaid: 2,
//         // act: "form",
//         status: statusvalue || shopeditValue.status,
//         id: location.params
//       }
//       new Promise((resolve) => {
//         dispatch({
//           type: 'shopadd/fetch',
//           payload: {
//             resolve,
//             data: params,
//           }
//         })
//       }).then((res) => {
//         if(res.code === 1){
//           router.push('/dashboard/step-form/info');
//           // message.success("修改成功")
//         }else{
//           message.error(res.msg)
//         }
//       })
//     } else {
//       const params = {
//         // uaid:2,
//         // owner: legalname,  //法人姓名
//         // name: inpValu,   // 标题
//         // lnt: mapCenter.longitude,    // 经度
//         // lat: mapCenter.latitude,    // 纬度
//         // address: this.state.address,   // 地址
//         // phone: this.state.phone,      // 电话
//         // business_licence: imgurls,   //营业执照
//         // agreement: imgurlsagreen,    //运输协议
//         // status: 1
//         address: "唐延路",
//         agreement: "https://www.nx.tt/uploads/20190319/77745f33f9e3bb5c344dd3876e268d2c.png",

        
//         lat: "34.22259",
//         license: "https://www.nx.tt/uploads/20190319/88ee3d18dae17ef3aa2d6ebf2f63338c.png",
//         lng: "108.94878",
//         name: "清真面馆1111",
//         owner: "张三",
//         phone: "18302934963",
//         status: 1
//       };
//       new Promise((resolve) => {
//         dispatch({
//           type: 'shopadd/fetch',
//           payload: {
//             resolve,
//             data: params,
//           }
//         })
//       }).then((res) => {
//         if(res.code === "200"){
//           router.push('/dashboard/step-form/info');
//           // message.success("添加成功")
//         }else{
//           message.error(res.msg)
//         }
//       })
//     }
    
//   }

//   handelChange = (e) =>{
//     this.setState({
//       inpValu:e.target.value
//     })
//   }

//   // 法人姓名
//   legalChange = (e) => {
//     this.setState({
//       legalname:e.target.value
//     })
//   }

//   phoneChange = (e) => {
//     this.setState({
//       phone:e.target.value
//     })
//   }

//   addressChange = (e) => {
//     this.setState({
//       address:e.target.value
//     })
//   }

  

//   // 地图
//   changeCenter() {
//     this.setState({
//       mapCenter: randomPosition()
//     })
//   }
  
//   render() {
//     const { 
//       submitting,
//       form: { getFieldDecorator },
//     }  = this.props;
//     const { shopeditValue,mapCenter,loading } = this.state;
//     const formItemLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 7 },
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 12 },
//         md: { span: 10 },
//       },
//     };

//     const submitFormLayout = {
//       wrapperCol: {
//         xs: { span: 24, offset: 0 },
//         sm: { span: 10, offset: 7 },
//       },
//     };

//     const uploadButton = (
//       <div>
//         <Icon type={loading ? 'loading' : 'plus'} />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
   
//     // || userEditInfo.face_img
//     const imageUrl = this.state.imageUrl || shopeditValue.license;
//     const imageUrlagreen = this.state.imageUrlagreen || shopeditValue.agreement;

//     return (
//       <PageHeaderWrapper
//         title={<FormattedMessage id="店铺列表" />}
//         content={<FormattedMessage id="app.forms.basic.description" />}
//       >
//         <Card bordered={false}>
          
//           {/* <Button onClick={() => { this.changeCenter() }}>Move Map To A Random Center</Button> */}
//           <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
//             {/* <FormItem {...formItemLayout} label="法人姓名">
//               {getFieldDecorator('lagalname', {
//                 initialValue:shopeditValue.legal,
//                 rules: [
//                   {
//                     required: true,
//                     message: "请输入法人姓名",
//                   },
//                 ],
//               })
//               (<Input 
//                 placeholder="法人姓名" 
//                 onChange={this.legalChange.bind(this)} 
//               />)}
//             </FormItem> */}
//             <FormItem {...formItemLayout} label="商户名称">
//               {getFieldDecorator('title', {
//                 initialValue:shopeditValue.name,
//                 rules: [
//                   {
//                     required: true,
//                     message: "请输入商户名称",
//                   },
//                 ],
//               })
//               (<Input 
//                 placeholder="商户名称" 
//                 onChange={this.handelChange.bind(this)} 
//               />)}
//             </FormItem>
//             <FormItem {...formItemLayout} label="商户电话">
//               {getFieldDecorator('phone', {
//                 initialValue:shopeditValue.phone,
//                 rules: [
//                   {
//                     required: true,
//                     message: "请输入商户电话",
//                   },
//                 ],
//               })(<Input placeholder="商户电话" onChange={this.phoneChange.bind(this)} />)}
//             </FormItem>
            
//             <FormItem {...formItemLayout} label={<FormattedMessage id="经纬度" />}>
//               {getFieldDecorator('lataddress', {
//                 initialValue:shopeditValue.address,
//                 rules: [
//                   {
//                     required: true,
//                     message: "经纬度",
//                   },
//                 ],
//               })(
//                 <div style={{ width: "100%", height: 300, margin:'0 auto' }}>
//                   <Map center={mapCenter} />
//                 </div>
//               )}
//             </FormItem>
//             <FormItem {...formItemLayout} label={<FormattedMessage id="商户地址" />}>
//               {getFieldDecorator('address', {
//                 initialValue:shopeditValue.address,
//                 rules: [
//                   {
//                     required: true,
//                     message: "请输入商户地址",
//                   },
//                 ],
//               })(<Input placeholder="请输入商户地址" onChange={this.addressChange.bind(this)} />)}
//             </FormItem>
//             <FormItem {...formItemLayout} label="请上传营业执照">
//               <Upload
//                 name="avatar"
//                 listType="picture-card"
//                 className="avatar-uploader"
//                 showUploadList={false}
//                 action="/files/api/upload/"
//                 beforeUpload={beforeUpload}
//                 onChange={this.handleChange}
//               >
//                 {imageUrl ? <img src={imageUrl} alt="avatar" className={styles.uploadImg} /> : uploadButton}
//               </Upload>
//             </FormItem>
//             <FormItem {...formItemLayout} label="请上传运输协议">
//               <Upload
//                 name="avatar"
//                 listType="picture-card"
//                 className="avatar-uploader"
//                 showUploadList={false}
//                 action="/files/api/upload/"
//                 beforeUpload={beforeUpload}
//                 onChange={this.handleChangeArgeen}
//               >
//                 {imageUrlagreen ? <img src={imageUrlagreen} alt="avatar" className={styles.uploadImg} /> : uploadButton}
//               </Upload>
//             </FormItem>
//             <FormItem
//               {...formItemLayout}
//               label="审核状态"
//             >
//               <div>
//                 {getFieldDecorator('public', {
//                   initialValue: shopeditValue.status,
//                 })(
//                   <Radio.Group value={shopeditValue.status} onChange={this.statusChange}>
//                     <Radio value={1}>
//                       <FormattedMessage id="已认证" />
//                     </Radio>
//                     <Radio value={2}>
//                       <FormattedMessage id="审核中" />
//                     </Radio>
//                     <Radio value={0}>
//                       <FormattedMessage id="未认证" />
//                     </Radio>
//                   </Radio.Group>
//                 )}
//               </div>
//             </FormItem>
//             <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
//               <Button type="primary" htmlType="submit" loading={submitting} onClick={this.submit.bind(this)}>
//                 <FormattedMessage id="form.submit" />
//               </Button>
//             </FormItem>
//           </Form>
//         </Card>
//       </PageHeaderWrapper>
//     );
//   }
// }

// export default BasicForms;







import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
  Modal,
  message,
  Input
} from 'antd';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Step2.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

@connect(({ profile,shopadd, loading }) => ({
  profile,
  shopadd,
  loading: loading.effects['profile/fetchAdvanced'],
}))
class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
    shopeStatusInfo: '',
    visible: false,
    refucedInfo: '',
    logData: []
  };

  componentDidMount = () => {
    const {dispatch,location} = this.props;
    if(location.params !== undefined){
      new Promise((resolve) => {
        dispatch({
          type: 'shopEdit/eidtshop',
          payload: {
            resolve,
            data: location.params,
          }
        })
      }).then((res) => {
        if(res.code === 1){
          this.setState({
            shopeStatusInfo: res.data
          })
        }else{
          // message.error(res.msg)
        }
      })

      // new Promise((resolve) => {
      //   dispatch({
      //     type:'shopadd/fetchlog',
      //     payload: {
      //       resolve,
      //       data: location.params
      //     }
      //   })
      // }).then((res) => {
      //   if(res.code == 1){
      //     this.setState({
      //       logData: res.data.data
      //     })
      //   }
      // })
    }
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  // 拒绝审核
  refuedConfirm = () => {
    this.setState({
      visible: true
    })
  }

  // 拒绝审核的理由
  refucedChange = (e) => {
    this.setState({
      refucedInfo: e.target.value
    })
  }

  // 确认拒绝
  handleOk = (e) => {
    const { location,dispatch } = this.props;
    const { refucedInfo } = this.state;
    if(refucedInfo == ""){
      message.error("请输入拒绝的理由")
    } else { 
      new Promise((resolve) => {
        dispatch({
          type: 'shopadd/fetch',
          payload: {
            resolve,
            data: {
              status: 3,
              id: location.params,
              reason: refucedInfo
            },
          }
        })
      }).then((res) => {
        if(res.code == 1){
          this.setState({
            visible: false,
          });
        }
      })
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  // 通过审核
  showConfirm = () => {
    const { location,dispatch } = this.props;
    confirm({
      title: '您确定要通过审核吗？',
      onOk() {
        new Promise((resolve) => {
          dispatch({
            type: 'shopadd/fetch',
            payload: {
              resolve,
              data: {
                status: 1,
                id: location.params
              },
            }
          })
        }).then((res) => {
          // if(res.code === 1){
          //   router.push('/dashboard/step-form/info');
          //   // message.success("修改成功")
          // }else{
          //   message.error(res.msg)
          // }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  
 

  render() {
    const { stepDirection, operationkey,shopeStatusInfo } = this.state;
    const { profile, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = profile;
    const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.showConfirm}>通过</Menu.Item>
        <Menu.Item key="2" onClick={this.refuedConfirm}>拒绝</Menu.Item>
      </Menu>
    );

    const action = (
      <Fragment>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button type="primary">审核 <Icon type="down" /></Button>
        </Dropdown>
      </Fragment>
    );


    const user = localStorage.getItem("user");

    const columns = [
      {
        title: '操作人',
        dataIndex: 'user',
        key: 'user',
      },
      {
        title: '执行结果',
        dataIndex: 'status',
        key: 'status',
        render: text =>
          text === 'agree' ? (
            <Badge status="success" text="成功" />
          ) : (
            <Badge status="error" text="驳回" />
          ),
      },
      {
        title: '操作时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
      },
      {
        title: '备注',
        dataIndex: 'memo',
        key: 'memo',
      },
    ];
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };

    const shopnames = `商户：${shopeStatusInfo.name == undefined ? '暂无商户名称' : shopeStatusInfo.name}`

    return (
      <PageHeaderWrapper
        title={shopnames}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={action}
        // content={description}
        // extraContent={extra}
        // tabList={tabList}
      >
        <Modal
          title="拒绝审核"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="请输入拒绝审核的理由" onChange={this.refucedChange} />
        </Modal>
        <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="用户姓名">{shopeStatusInfo.name}</Description>
            <Description term="店铺地址">{shopeStatusInfo.address}</Description>
            <Description term="营业执照">
              <img src={shopeStatusInfo.license} alt="" style={{width: 200,height: 200,objectFit: 'cover'}} />
            </Description>
            <Description term="收运协议">
              <img src={shopeStatusInfo.agreement} alt="" style={{width: 200,height: 200,objectFit: 'cover'}} />
            </Description>
            <Description term="店铺名称" style={{marginTop:"-150px"}}>{shopeStatusInfo.name}</Description>
            <Description term="店铺电话" style={{marginTop:'-150px',marginLeft: '25%'}}>{shopeStatusInfo.phone}</Description>
            <Description term="店铺地址" style={{marginTop: '-110px'}}>{shopeStatusInfo.address}</Description>
          </DescriptionList>
        </Card>
        <Card
          bordered={false}
          title="操作日志"
          onTabChange={this.onOperationTabChange}
        >
          {contentList[operationkey]}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedProfile;
