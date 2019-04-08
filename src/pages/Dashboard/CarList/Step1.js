import React, { PureComponent } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import {
  Button,
  Modal,
  Form,
  Table,
  message
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
// import CusBase64 from './basemins.min.js';


var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
   -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
   41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

   function base64encode(str) {
   var out, i, len;
   var c1, c2, c3;
   len = str.length;
   i = 0;
   out = "";
   while(i < len) {
   c1 = str.charCodeAt(i++) & 0xff;
   if(i == len)
   {
       out += base64EncodeChars.charAt(c1 >> 2);
       out += base64EncodeChars.charAt((c1 & 0x3) << 4);
       out += "==";
       break;
   }
   c2 = str.charCodeAt(i++);
   if(i == len)
   {
       out += base64EncodeChars.charAt(c1 >> 2);
       out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
       out += base64EncodeChars.charAt((c2 & 0xF) << 2);
       out += "=";
       break;
   }
   c3 = str.charCodeAt(i++);
   out += base64EncodeChars.charAt(c1 >> 2);
   out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
   out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
   out += base64EncodeChars.charAt(c3 & 0x3F);
   }
   return out;
}


function base64decode(str) {
   var c1, c2, c3, c4;
   var i, len, out;
   len = str.length;
   i = 0;
   out = "";
   while(i < len) {
   
   do {
       c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
   } while(i < len && c1 == -1);
   if(c1 == -1)
       break;
   
   do {
       c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
   } while(i < len && c2 == -1);
   if(c2 == -1)
       break;
   out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
   
   do {
       c3 = str.charCodeAt(i++) & 0xff;
       if(c3 == 61)
       return out;
       c3 = base64DecodeChars[c3];
   } while(i < len && c3 == -1);
   if(c3 == -1)
       break;
   out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
   
   do {
       c4 = str.charCodeAt(i++) & 0xff;
       if(c4 == 61)
       return out;
       c4 = base64DecodeChars[c4];
   } while(i < len && c4 == -1);
   if(c4 == -1)
       break;
   out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
   }
   return out;
}

function utf16to8(str) {
   var out, i, len, c;
   out = "";
   len = str.length;
   for(i = 0; i < len; i++) {
   c = str.charCodeAt(i);
   if ((c >= 0x0001) && (c <= 0x007F)) {
       out += str.charAt(i);
   } else if (c > 0x07FF) {
       out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
       out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
  } else {
      out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
  }
  }
  return out;
}

function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = str.length;
  i = 0;
  while(i < len) {
  c = str.charCodeAt(i++);
  switch(c >> 4)
  { 
    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      // 0xxxxxxx
      out += str.charAt(i-1);
      break;
     case 12: case 13:
      // 110x xxxx   10xx xxxx
      char2 = str.charCodeAt(i++);
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
    case 14:
      // 1110 xxxx  10xx xxxx  10xx xxxx
      char2 = str.charCodeAt(i++);
      char3 = str.charCodeAt(i++);
      out += String.fromCharCode(((c & 0x0F) << 12) |
                     ((char2 & 0x3F) << 6) |
                     ((char3 & 0x3F) << 0));
     break;
  }
  }
  return out;
}

@connect(({ car }) => ({
  car,
}))
@Form.create()
class BasicList extends PureComponent {
 
  state = { 
    data: [], 
    pageCount: '',
    erweimaVisible: false,
    erweima: ''
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'car/fetch',
        payload: {
          resolve,
          data: 1,
        }
      })
    }).then((res) => {
      if(res.code === 1){
        this.setState({
          data: res.data.data,
          pageCount: res.data.total
        })
      }else{
        // console.log('删除失败')
      }
    })
  }

  // 删除车辆
  deleteItem = shopId => {
    const { dispatch } = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'car/delete',
        payload: {
          resolve,
          data: shopId,
        }
      })
    }).then((res) => {
      if(res.code === 1){
        message.success("删除成功")
        new Promise((resolve) => {
          dispatch({
            type: 'car/fetch',
            payload: {
              resolve,
              data: 1,
            }
          })
        }).then((resd) => {
          if(resd.code === 1){
            this.setState({
              data: resd.data.data,
              pageCount: resd.data.total
            })
          }else{
            // console.log('删除失败')
          }
        })
      }else{
        // console.log('删除失败')
      }
    })
  };

  // 分页
  pageClick = (pages) => {
    const { dispatch } = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'car/fetch',
        payload: {
          resolve,
          data: pages,
        }
      })
    }).then((res) => {
      if(res.code === 1){
        this.setState({
          data: res.data.data,
        })
      }else{
        // console.log('删除失败')
      }
    })
  }

  // 小程序码
  handleCancel = () => this.setState({ erweimaVisible: false })

 

  render() {
    const onValidateForm = () => {
      router.push('/dashboard/car-list/confirm');
    };
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { data,pageCount,erweimaVisible,erweima } = this.state;
    const pagination = {
      pageSize: 10,
      showSizeChanger: false,
      total: pageCount,
      onChange: (current, pageSize) => {
        this.pageClick(current,pageSize);
      },
    };

    // 小程序码
    // const handlePreview = () => {
    //   this.setState({
    //     erweimaVisible: true,
    //   });
    // }
    const erweimaClick = (carid) => {
      // var str = base64encode(utf16to8(''))
      // console.log(str,'车牌号')
      const { dispatch } = this.props;
      new Promise((resolve) => {
        dispatch({
          type: 'car/carerweima',
          payload: {
            resolve,
            data: base64encode(utf16to8(carid.license)),
          }
        })
      }).then((res) => {
        console.log(res,'resdddd')
        if(res.code === 1){
          this.setState({
            erweima: res.data.url,
            erweimaVisible: true,
          })
        }else{
          // console.log('删除失败')
        }
      })
    }
    const editAndDelete = (key) => {
      const shopId = key.id;
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => this.deleteItem(shopId),
      });
    };
    const carEdit = (key) => {
      const { dispatch } = this.props;
      const shopId = key.id;
      new Promise((resolve) => {
        dispatch({
          type: 'car/caredit',
          payload: {
            resolve,
            data: shopId,
          }
        })
      }).then((res) => {
        if(res.code === 1){
          router.push({
            pathname:"/dashboard/car-list/confirm",
            params: shopId
          });
        }else{
          // console.log('删除失败')
        }
      })
    }

    const columns = [{
      title: '车牌号',
      dataIndex: 'license',
    }, {
      title: '容量(桶)',
      dataIndex: 'bucket_count',
    }, 
    // {
    //   title: '车辆状态',
    //   dataIndex: 'status',
    //   render: (text) => (
    //     <span>
    //       <a style={{color: 'rgba(0,0,0,.65)'}}>
    //         {text == 1 ? "空闲中" : (text == 2 ? "已被使用" : "暂停使用")}
    //       </a>
    //     </span>
    //   ),
    // },{
    //   title: '创建时间',
    //   dataIndex: 'create_time',
    //   render: (text) => (
    //     <span>
    //       <a style={{color: 'rgba(0,0,0,.65)'}}>{this.timestampToTime(text)}</a>
    //     </span>
    //   ),
    // },
    {
      title: '操作',
      dataIndex: 'tip',
      render: (text,record) => {
        console.log(record,'小程序二维码')
        return(
          <span>
            <a href="#" onClick={()=>carEdit(record)}>编辑</a>
            <span className="ant-divider" />
            <a type="primary" onClick={()=>editAndDelete(record)}>删除</a>
            <span className="ant-divider" />
            {/* onClick={()=>handlePreview(record)} */}
            <a type="primary" onClick={() =>erweimaClick(record)}>小程序码</a>
          </span>
        )
      },
    }];

    return (
      <PageHeaderWrapper style={{padding:0}}>
        <Modal visible={erweimaVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={erweima} />
        </Modal>
        <div>
          {/* <Row style={{background:'#fff',padding:'20px 0'}}>
            <Col sm={8} xs={24}>
              <Info title="我的待办" value="8个任务" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="本周任务平均处理时间" value="32分钟" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="本周完成任务数" value="24个任务" />
            </Col>
          </Row> */}
          <div className={styles.standardList}>
            <div className={styles.shoplistname}>车辆列表</div>
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: "20px" }}
              icon="plus"
              onClick={onValidateForm}
            >
              添加
            </Button>
            <Table columns={columns} dataSource={data} rowKey={data.shopid} pagination={pagination} />
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;

