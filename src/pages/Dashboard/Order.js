import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  Radio,
  Button,
  Modal,
  Form,
  DatePicker,
  Table,
  Icon,
  Input,
  Badge
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import { menuList } from '../../services/api';
import styles from './Order.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const statusMap = ['success', 'error'];
const status = ['已完成', '待完成'];

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class BasicList extends PureComponent {
 
  state = { visible: false, done: false,selectedRowKeys: [], };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

 

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

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
      type: 'list/submit',
      payload: { id },
    });
  };

  render() {
    // const {
    //   list: { list },
    //   loading,
    // } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const columns = [{
      title: '下单时间',
      dataIndex: 'time',
    }, {
      title: '取餐号',
      dataIndex: 'number',
    }, {
      title: '订单内容',
      dataIndex: 'content',
    },{
      title: '下单人',
      dataIndex: 'people',
    }, {
      title: '手机号',
      dataIndex: 'phone',
    }, {
      title: '方式',
      dataIndex: 'style',
    }, {
      title: '支付',
      dataIndex: 'pay',
    },{
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },{
        title:'操作',
        key: 'action',
        render: () => (
            <span>
                <a href="#">订单详情</a>
                <span className="ant-divider" />
                <a href="#" className="ant-dropdown-link">
                    更多 <Icon type="down" />
                </a>
            </span>
        ),
    }];
    const times = (
      <div className={styles.ordertimes}>
        <span>01.22</span>
        <em>17:44</em>
      </div>
    );
    const contents = (
      <div className={styles.contentbox}>
        <span>订单20</span>
        <div>拉面 等1个菜品</div>
        <div>订单编号：120354654544</div>
      </div>
    );
    const peoples = (
      <div className={styles.peoplesBox}>
        <div>曲丽丽</div>
        <div>财务部</div>
      </div>
    );

    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        key: i,
        time: times,
        number: `${i}`,
        content: contents,
        people: peoples,
        phone: 18302965421,
        style:`外带`,
        pay:`24.8元`,
        status: Math.floor(Math.random() * 10) % 2,
        tip:`这是一个备注`
      });
    };

    const moneyyue = (
      <div className={styles.moneyyuebox}>
        <span>可用余额：</span>
        <em>￥2014.10</em>
      </div>
    );

    const mainSearch = (
        <div style={{ textAlign: 'center' }}>
          <Input.Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={this.handleFormSubmit}
            style={{ width: 522 }}
          />
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
      <PageHeaderWrapper title="订单" style={{padding:0}} content={mainSearch}>
        
        <div className={styles.standardList}>
            <div className={styles.extraContent}>
                <span>全部订单</span>
                <div className={styles.moneyRight}>
                    <RadioGroup defaultValue="all" style={{marginRight:'20px'}}>
                        <RadioButton value="all">全部</RadioButton>
                        <RadioButton value="progress">待完成</RadioButton>
                        <RadioButton value="waiting">已完成</RadioButton>
                    </RadioGroup>    
                    <Button type="primary">新建</Button> 
                </div>     
            </div>
            <Table columns={columns} dataSource={data} />
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
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
