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
  Badge
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './Money.less';

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
    console.log('selectedRowKeys changed: ', selectedRowKeys);
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
    const { selectedRowKeys } = this.state;
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
      title: '时间',
      dataIndex: 'name',
    }, {
      title: '类型',
      dataIndex: 'class',
    }, {
      title: '金额',
      dataIndex: 'money',
    },{
      title: '入账前金额',
      dataIndex: 'beforemoney',
    }, {
      title: '入账后的金额',
      dataIndex: 'aginmoney',
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
    }, {
      title: '备注',
      dataIndex: 'tip',
    }];

    // const listMoney = [
    //   {
    //     class:'退款',
    //     money:'120',
    //     beforemoney:'3401',
    //     aginmoney:'7850',
    //     tips:'这是备注1'
    //   },
    //   {
    //     class:'取货员接单',
    //     money:'340',
    //     beforemoney:'5401',
    //     aginmoney:'9950',
    //     tips:'哈哈哈哈哈'
    //   },
    //   {
    //     class:'申请审批通过',
    //     money:'567',
    //     beforemoney:'9520',
    //     aginmoney:'4321',
    //     tips:'他他他他他他'
    //   },
    //   {
    //     class:'发起退货申请',
    //     money:'4545',
    //     beforemoney:'7654',
    //     aginmoney:'7850',
    //     tips:'你你你你你'
    //   },
    // ]
    
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        class: `退货`,
        money: `12 ${i}`,
        beforemoney:450,
        aginmoney: 66600,
        status: Math.floor(Math.random() * 10) % 2,
        tip:`这是一个备注`
      });
    };

    const moneyyue = (
      <div className={styles.moneyyuebox} style={{padding:0}}>
        <span>可用余额：</span>
        <em>￥2014.10</em>
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
      <PageHeaderWrapper title="资金账户" style={{padding:0}}>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title={moneyyue}
            style={{ marginTop: 24, padding:'0' }}
            // bodyStyle={{ padding: '0 32px 40px 32px' }}
          />
          <div className={styles.extraContent}>
            <span>近30日资金账户变化</span>
            <div className={styles.moneyRight}>
              {/* <Form onSubmit={this.handleSubmit} style={{display:'block',float:'left'}}>
                <FormItem {...this.formLayout} style={{width:'100%'}}>
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
              </Form> */}
              <RadioGroup defaultValue="all" style={{marginRight:'20px'}}>
                <RadioButton value="all">全部</RadioButton>
                <RadioButton value="progress">收入</RadioButton>
                <RadioButton value="waiting">支出</RadioButton>
              </RadioGroup>    
              <Button type="primary">导出Excel</Button> 
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
