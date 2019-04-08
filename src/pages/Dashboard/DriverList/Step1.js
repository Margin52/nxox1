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

@connect(({ driver }) => ({
  driver
}))
@Form.create()
class BasicList extends PureComponent {
 
  state = {
    data: [],
    pageCount: ''
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const params = {
      page: 1,
      limit: 10
    };
    new Promise((resolve) => {
      dispatch({
        type: 'driver/fetchdrvier',
        payload: {
          resolve,
          data: params,
        }
      })
    }).then((res) => {
      this.setState({
        data: res.data.data,
        pageCount: res.data.total
      })
    })
  }

  // 分页
  pageClick = (pages) => {
    const { dispatch } = this.props;
    const params = {
      page: pages,
      limit: 10
    }
    new Promise((resolve) => {
      dispatch({
        type: 'driver/fetchdrvier',
        payload: {
          resolve,
          data: params,
        }
      })
    }).then((res) => {
      if(res.code === 1){
        this.setState({
          data: res.data.data,
        })
      }else{
        message.error(res.msg)
      }
    })
  }


  // 删除司机
  deleteItem = shopId => {
    const { dispatch } = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'driver/deletedriver',
        payload: {
          resolve,
          data: shopId,
        }
      })
    }).then((res) => {
      if(res.code === 1){
        message.success("删除成功")
        const params = {
          page: 1,
          limit: 10
        };
        new Promise((resolve) => {
          dispatch({
            type: 'driver/fetchdrvier',
            payload: {
              resolve,
              data: params,
            }
          })
        }).then((resd) => {
          if(resd.code === 1){
            this.setState({
              data: resd.data.data,
              pageCount: resd.data.total
            })
          }else{
            // message.error(resd.msg)
          }
        })
      }else{
        message.error("删除失败")
      }
    })
  };

  // 时间戳转日期
  // timestampToTime = (timestamp) => {
  //   const date = new Date(timestamp * 1000);   //timestamp 为10位需*1000，timestamp 为13位的话不需乘1000
  //   const Y = date.getFullYear() + '-';
  //   const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  //   const D = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) + ' ';
  //   return Y+M+D;
  // }

  render() {
    // 编辑
    const driverEdit = (key) => {
      const { dispatch } = this.props;
      new Promise((resolve) => {
        dispatch({
          type: 'driver/driveredit',
          payload: {
            resolve,
            data: key.id,
          }
        })
      }).then((res) => {
        if(res.code === 1){
          router.push({
            pathname:"/dashboard/driver-list/confirm",
            params: key.id
          })
        }else{
          message.error(res.msg)
        }
      })
    };
    const onValidateForm = () => {
      router.push('/dashboard/driver-list/confirm');
    };
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { data,pageCount } = this.state;
 

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

    const pagination = {
      pageSize: 10,
      showSizeChanger: false,
      total: pageCount,
      onChange: (current, pageSize) => {
        this.pageClick(current,pageSize);
      },
    };

    const columns = [{
      title: '司机姓名',
      dataIndex: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
    },{
      title: '手机号',
      dataIndex: 'phone',
      // render: (text) => (
      //   <span>
      //     <a style={{color: 'rgba(0,0,0,.65)'}}>{text == 1 ? "工作中" : (text == 2 ? "休息中" : "已离职")}</a>
      //   </span>
      // ),
    },
    // , {
    //   title: '创建时间',
    //   dataIndex: 'create_time',
    // },{
    //   title: '最后登录时间',
    //   dataIndex: 'update_time',
    // }, 
    {
      title: '操作',
      dataIndex: 'tip',
      render: (text, record) => {
        return(
          <span>
            <a href="#" onClick={()=>driverEdit(record)}>编辑</a>
            <span className="ant-divider" />
            <a type="primary" onClick={()=>editAndDelete(record)}>删除</a>
            <span className="ant-divider" />
            <a type="primary">收运记录</a>
          </span>
        )
      },
    }];



    return (
      <PageHeaderWrapper style={{padding:0}}>
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
            <div className={styles.shoplistname}>司机列表</div>
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

