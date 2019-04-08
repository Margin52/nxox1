import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import router from 'umi/router';
import {
  Form,
  Input,
  Radio,
  Card,
  Button,
  Upload, 
  Icon, 
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Step2.less';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

const FormItem = Form.Item;

@connect(({ loading,ad }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  ad
}))
@Form.create()
class BasicForms extends PureComponent {
  
  constructor(props){
    super(props);
    this.state = {
      adName:'',   //广告名称
      adImg:'',   //广告图片
      adstatus: 1,   //是否展示
      previewVisible: false,
      previewImage: '',
      fileList: [],
      imgurls: '',
      adData: ''
    }
  }

  state = {
    loading: false,
  };

  componentDidMount(){
    console.log(this.props,'广告的编辑id')
    if(this.props.location.params !== undefined){
      const { dispatch } = this.props;
      new Promise((resolve) => {
        dispatch({
          type: 'ad/adedit',
          payload: {
            resolve,
            data: this.props.location.params,
          }
        })
      }).then((res) => {
        if(res.code === 200){
          this.setState({
            adData: res.data
          })
        }else{
          // message.error(res.msg)
        }
      })
    }
  }

  // 上传广告图片
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imgurls: info.file.response.data.url
      })
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  adsubmit = () => {
    const { dispatch } = this.props;
    const { adData } = this.state;
    if(this.props.location.params !== ""){
      const params = {
        name:this.state.adName || adData.name,   // 广告名称
        img: this.state.imgurls || adData.img,   //广告图片
        status: this.state.adstatus || adData.status,   //是否展示
        ad_id: this.props.location.params
      };
      new Promise((resolve) => {
        dispatch({
          type: 'ad/adadd',
          payload: {
            resolve,
            data: params,
          }
        })
      }).then((res) => {
        if(res.code === "200"){
          message.success(res.msg)
          router.push('/dashboard/ad-list/info')
        }else{
          // message.error(res.msg)
        }
      })
    } else {
      const params = {
        name:this.state.adName,   // 广告名称
        img: this.state.imgurls,   //广告图片
        status: this.state.adstatus   //是否展示
      };
      new Promise((resolve) => {
        dispatch({
          type: 'ad/adadd',
          payload: {
            resolve,
            data: params,
          }
        })
      }).then((res) => {
        if(res.code === "200"){
          message.success(res.msg)
          router.push('/dashboard/ad-list/info')
        }else{
          // message.error(res.msg)
        }
      })
    }
  }

  nameChange = (e) => {
    this.setState({
      adName:e.target.value
    })
  }

  statusChange = (e) =>{
    this.setState({
      adstatus:e.target.value
    })
  }

  render() {
    const { 
      submitting,
      form: { getFieldDecorator },
    }  = this.props;
    const { adData } = this.state;

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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const imageUrl = this.state.imageUrl || adData.img;

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="广告列表" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="广告名称">
              {getFieldDecorator('title', {
                initialValue: adData.name,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })
              (<Input 
                placeholder="广告名称"
                onChange={this.nameChange.bind(this)} 
              />)}
            </FormItem>
            <FormItem {...formItemLayout} label="请上传广告图片">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/files/api/upload/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" className={styles.uploadImg} /> : uploadButton}
              </Upload>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否展示"
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: adData.status,
                })(
                  <Radio.Group onChange={this.statusChange.bind(this)} value={adData.status}>
                    <Radio value={1}>
                      <FormattedMessage id="form.public.radio.show" />
                    </Radio>
                    <Radio value={2}>
                      <FormattedMessage id="form.public.radio.hide" />
                    </Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting} onClick={this.adsubmit.bind(this)}>
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
