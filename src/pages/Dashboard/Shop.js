import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  Card,
  Radio,
  Button,
  Modal,
  Form,
  DatePicker,
  Table,
  Badge,
  Row,
  Col
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './Shop.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const statusMap = ['success', 'error'];
const status = ['已完成', '待完成'];

@connect(({ shop }) => ({
  shop,
}))
@Form.create()
class BasicList extends PureComponent {
 
  state = { visible: false, done: false,selectedRowKeys: [], delete: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  showModal = () => {
    console.log('uuuuuuu')
    this.setState({
      delete: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      delete: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      delete: false,
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const params = {
       aa:1,
    };
    dispatch({
        type: 'shop/fetch',
        payload: params,
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

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/delete',
      payload: { id },
    });
  };

  render() {
    
    const { selectedRowKeys } = this.state;
    const {
      shop: { shop },
      loading,
    } = this.props;
    console.log(this.props.shop.data.data,'mmmmm')
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const columns = [{
      title: '店铺ID',
      dataIndex: 'shopId',
    }, {
      title: '店铺名称',
      dataIndex: 'shopName',
    }, {
      title: '店铺电话',
      dataIndex: 'shopPhone',
    },{
      title: '店铺状态',
      dataIndex: 'shopStatus',
    }, {
      title: '创建时间',
      dataIndex: 'beginTime',
    },{
      title: '店铺地址',
      dataIndex: 'shopAddress',
    }, {
      title: '操作',
      dataIndex: 'tip',
      render: (text, record) => (
        <span>
          <a href="#">编辑</a>
          <span className="ant-divider" />
          {/* <a href="#">删除</a> */}
          <a type="primary" onClick={this.showModal}>删除</a>
          <Modal 
            title="删除" 
            visible={this.state.delete}
            style={{background:'rgba(0,0,0,0.1)',padding:0}}
            wrapClassName="vertical-center-modal"
            onOk={this.handleOk} onCancel={this.handleCancel}
          >
            <p>确定要删除此条信息吗？</p>
          </Modal>
        </span>
      ),
    }];
    const data = [];
    const shopList = this.props.shop.data.data?this.props.shop.data.data:'[]';
    for (let i = 0; i < shopList.length; i++) {
      data.push({
        key: i,
        shopId: shopList[i].shop_id,
        shopName: shopList[i].title,
        shopPhone: shopList[i].phone,
        shopStatus: shopList[i].status,
        beginTime: shopList[i].create_time,
        shopAddress: shopList[i].address
      });
    };

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
        <Row style={{background:'#fff',padding:'20px 0'}}>
          <Col sm={8} xs={24}>
            <Info title="我的待办" value="8个任务" bordered />
          </Col>
          <Col sm={8} xs={24}>
            <Info title="本周任务平均处理时间" value="32分钟" bordered />
          </Col>
          <Col sm={8} xs={24}>
            <Info title="本周完成任务数" value="24个任务" />
          </Col>
        </Row>
        <div className={styles.standardList}>
          
          {/* <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24, padding:'0' }}
            // title='店铺列表'
            
          /> */}
          <div className={styles.shoplistname}>店铺列表</div>
          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: "20px" }}
            icon="plus"
          >
            添加
          </Button>
          <Table columns={columns} dataSource={data} />
        </div>
        {/* <Modal
          title={done ? null : `任务${current.id ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal> */}
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
