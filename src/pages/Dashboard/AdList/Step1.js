import React, { PureComponent } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { connect } from 'dva';
import {
  Button,
  Modal,
  Form,
  DatePicker,
  Table,
  Row,
  Col,
  message
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './style.less';

const FormItem = Form.Item;

@connect(({ ad }) => ({
  ad,

}))
@Form.create()
class BasicList extends PureComponent {
 
  state = { 
    visible: false, 
    done: false,
    data: [], 
    pageCount: '',
    deleteList: false 
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'ad/fetch',
        payload: {
          resolve,
          data: 1,
        }
      })
    }).then((res) => {
      console.log(res,'分页的res')
      if(res.code === 0){
        this.setState({
          data: res.data
        })
      }else{
        // console.log('删除失败')
      }
    })
  }

  showModal = () => {
    console.log('uuuuuuu')
    this.setState({
      deleteList: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      deleteList: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      deleteList: false,
    });
  }




  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  // handleCancel = () => {
  //   setTimeout(() => this.addBtn.blur(), 0);
  //   this.setState({
  //     visible: false,
  //   });
  // };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = shopId => {
    const { dispatch } = this.props;
    console.log(shopId,'llll')
    dispatch({
      type: 'ad/delete',
      payload: { shopId },
    });
    // console.log(payload,'删除成功')
    dispatch({
      type: 'ad/fetch'
    });
  };

  // 分页
  pageClick = (pages) => {
    const { dispatch } = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'ad/fetch',
        payload: {
          resolve,
          data: pages,
        }
      })
    }).then((res) => {
      console.log(res,'分页的res')
      if(res.code === 0){
        this.setState({
          data: res.data
        })
      }else{
        // console.log('删除失败')
      }
    })
  }

  // 时间戳转日期
  timestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);   //timestamp 为10位需*1000，timestamp 为13位的话不需乘1000
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const D = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) + ' ';
    return Y+M+D;
  }

  render() {
    
    const onValidateForm = () => {
      router.push('/dashboard/ad-list/confirm');
    };
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {},data,pageCount } = this.state;
    const pagination = {
      pageSize: 10,
      showSizeChanger: false,
      total: pageCount,
      onChange: (current, pageSize) => {
        this.pageClick(current,pageSize);
      },
    };
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const editAndDelete = (key) => {
      let shopId = key.ad_id;
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => this.deleteItem(shopId),
      });
    };

    // 编辑
    const carEdit = (key) => {
      const { dispatch } = this.props;
      new Promise((resolve) => {
        dispatch({
          type: 'ad/adedit',
          payload: {
            resolve,
            data: key.ad_id,
          }
        })
      }).then((res) => {
        if(res.code === 200){
          router.push({
            pathname:"/dashboard/ad-list/confirm",
            params: key.ad_id
          });
        }else{
          message.error(res.msg)
        }
      })
    }

    const columns = [{
      title: '广告ID',
      dataIndex: 'ad_id',
    }, {
      title: '广告名称',
      dataIndex: 'name',
    }, {
      title: '广告图片地址',
      dataIndex: 'img',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (text) => (
        <span>
          <a style={{color: 'rgba(0,0,0,.65)'}}>{this.timestampToTime(text)}</a>
        </span>
      ),
    }, {
      title: '操作',
      dataIndex: 'tip',
      render: (text, record) => {
        const list = this.props.ad.data.data;
        return(
          <span>
            <a href="#" onClick={()=>carEdit(record)}>编辑</a>
            <span className="ant-divider" />
            <a type="primary" onClick={()=>editAndDelete(record)}>删除</a>
          </span>
          
        )
      },
    }];

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: '请选择开始时间' }],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
        </Form>
      );
    };
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
            <div className={styles.shoplistname}>广告列表</div>
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: "20px" }}
              icon="plus"
              onClick={onValidateForm}
            >
              添加
            </Button>
            <Table columns={columns} dataSource={data} pagination={pagination} rowKey={data.shopid} />
          </div>
          <Modal
            title={done ? null : `任务${current.id ? '编辑' : '添加'}`}
            className={styles.standardListForm}
            width={640}
            bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
            destroyOnClose
            visible={visible}
            {...modalFooter}
          >
            {getModalContent()}
          </Modal>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;

