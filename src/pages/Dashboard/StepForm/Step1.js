// import React, { PureComponent } from 'react';
// import moment from 'moment';
// import router from 'umi/router';
// import { connect } from 'dva';
// import {
//   Button,
//   Modal,
//   Form,
//   DatePicker,
//   Table,
//   Row,
//   Col,
//   message
// } from 'antd';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
// import styles from './style.less';

// const FormItem = Form.Item;

// @connect(({ shop }) => ({
//   shop,

// }))
// @Form.create()
// class BasicList extends PureComponent {
//   state = { 
//     visible: false, 
//     done: false, 
//     deleteList: false,
//     data: [],
//     pageCount: '' 
//   };

//   formLayout = {
//     labelCol: { span: 7 },
//     wrapperCol: { span: 13 },
//   };

//   componentDidMount() {
//     const { dispatch } = this.props;
//     new Promise((resolve) => {
//       dispatch({
//         type: 'shop/fetch',
//         payload: {
//           resolve,
//           data: 1,
//         }
//       })
//     }).then((res) => {
//       if(res.code === 1){
//         this.setState({
//           data: res.data.data,
//           pageCount: res.data.total
//         })
//       }else{
//         message.error(res.msg)
//       }
//     })
//   }

//   handleCancel = () => {
//     this.setState({
//       deleteList: false,
//     });
//   }

//   handleDone = () => {
//     setTimeout(() => this.addBtn.blur(), 0);
//     this.setState({
//       done: false,
//       visible: false,
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { dispatch, form } = this.props;
//     const { current } = this.state;
//     const id = current ? current.id : '';
//     setTimeout(() => this.addBtn.blur(), 0);
//     form.validateFields((err, fieldsValue) => {
//       if (err) return;
//       this.setState({
//         done: true,
//       });
//       dispatch({
//         type: 'list/submit',
//         payload: { id, ...fieldsValue },
//       });
//     });
//   };

//   // 删除店铺
//   deleteItem = shopId => {
//     const { dispatch } = this.props;
//     new Promise((resolve) => {
//       dispatch({
//         type: 'shop/delete',
//         payload: {
//           resolve,
//           data: shopId,
//         }
//       })
//     }).then((res) => {
//       if(res.code === 1){
//         new Promise((resolve) => {
//           dispatch({
//             type: 'shop/fetch',
//             payload: {
//               resolve,
//               data: 1,
//             }
//           })
//         }).then((resd) => {
//           if(resd.code === 1){
//             this.setState({
//               data: resd.data.data,
//               pageCount: resd.data.count
//             })
//           }else{
//             // message.error(resd.msg)
//           }
//         })
//       }else{
//         message.error("删除失败")
//       }
//     })
//   };

//   // 分页
//   pageClick = (pages) => {
//     const { dispatch } = this.props;
//     new Promise((resolve) => {
//       dispatch({
//         type: 'shop/fetch',
//         payload: {
//           resolve,
//           data: pages,
//         }
//       })
//     }).then((res) => {
//       if(res.code === 1){
//         this.setState({
//           data: res.data.data,
//           // pageCount: res.count
//         })
//       }else{
//         message.error(res.msg)
//       }
//     })
//   }

//   // 时间戳转日期
//   timestampToTime = (timestamp) => {
//     const date = new Date(timestamp * 1000);   
//     const Y = date.getFullYear() + '-';
//     const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//     const D = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) + ' ';
//     return Y+M+D;
//   }

//   render() {
//     const onValidateForm = () => {
//       router.push('/dashboard/step-form/confirm');
//     };
//     const {
//       form: { getFieldDecorator },
//     } = this.props;
//     const { visible, done, current = {},data,pageCount } = this.state;
    
//     const modalFooter = done
//       ? { footer: null, onCancel: this.handleDone }
//       : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

//     const editAndDelete = (key) => {
//       const shopId = key.id;
//       Modal.confirm({
//         title: '删除任务',
//         content: '确定删除该任务吗？',
//         okText: '确认',
//         cancelText: '取消',
//         onOk: () => this.deleteItem(shopId),
//       });
//     };

//     // 编辑
//     const carEdit = (key) => {
//       const {dispatch} = this.props;
//       new Promise((resolve) => {
//         dispatch({
//           type: 'shopEdit/eidtshop',
//           payload: {
//             resolve,
//             data: key.id,
//           }
//         })
//       }).then((res) => {
//         if(res.code === 1){
//           router.push({
//             pathname:"/dashboard/step-form/confirm",
//             params: key.id
//           })
//         }else{
//           // message.error(res.msg)
//         }
//       })
//     }

//     const columns = [{
//       title: '店铺ID',
//       dataIndex: 'id',
//     }, {
//       title: '店铺名称',
//       dataIndex: 'name',
//     }, {
//       title: '店铺电话',
//       dataIndex: 'phone',
//     },{
//       title: '店铺状态',
//       dataIndex: 'status',
//       render: (text) => (
//         <span>
//           <a style={{color: 'rgba(0,0,0,.65)'}}>
//             {text == 1 ? "已审" : (text == 2 ? "待审" : "审核失败")}
//           </a>
//         </span>
//       ),
//     }, {
//       title: '创建时间',
//       dataIndex: 'create_time',
//       // render: (text) => (
//       //   <span>
//       //     <a style={{color: 'rgba(0,0,0,.65)'}}>{this.timestampToTime(text)}</a>
//       //   </span>
//       // ),
//     },{
//       title: '店铺地址',
//       dataIndex: 'address',
//     }, {
//       title: '操作',
//       dataIndex: 'tip',
//       render: (text, record) => (
//         <span>
//           <a href="#" onClick={()=>carEdit(record)}>编辑</a>
//           <span className="ant-divider" />
//           <a type="primary" onClick={()=>editAndDelete(record)}>删除</a>
//         </span>
//       ),
//     }];


//     const getModalContent = () => {
//       if (done) {
//         return (
//           <Result
//             type="success"
//             title="操作成功"
//             description="一系列的信息描述，很短同样也可以带标点。"
//             actions={
//               <Button type="primary" onClick={this.handleDone}>
//                 知道了
//               </Button>
//             }
//             className={styles.formResult}
//           />
//         );
//       }
//       return (
//         <Form onSubmit={this.handleSubmit}>
//           <FormItem label="开始时间" {...this.formLayout}>
//             {getFieldDecorator('createdAt', {
//               rules: [{ required: true, message: '请选择开始时间' }],
//               initialValue: current.createdAt ? moment(current.createdAt) : null,
//             })(
//               <DatePicker
//                 showTime
//                 placeholder="请选择"
//                 format="YYYY-MM-DD HH:mm:ss"
//                 style={{ width: '100%' }}
//               />
//             )}
//           </FormItem>
//         </Form>
//       );
//     };
//     // 分页
//     const pagination = {
//       pageSize: 10,
//       showSizeChanger: false,
//       total: pageCount,
//       onChange: (current, pageSize) => {
//         this.pageClick(current,pageSize);
//       },
//     };

//     return (
//       <PageHeaderWrapper style={{padding:0}}>
//         <div>
//           <div className={styles.standardList}>
//             <div className={styles.shoplistname}>店铺列表</div>
//             <Button
//               type="dashed"
//               style={{ width: '100%', marginBottom: "20px" }}
//               icon="plus"
//               onClick={onValidateForm}
//             >
//               添加
//             </Button>
//             <Table columns={columns} dataSource={data} pagination={pagination} rowKey={record => record.shop_id} />
//           </div>
//           <Modal
//             title={done ? null : `任务${current.id ? '编辑' : '添加'}`}
//             className={styles.standardListForm}
//             width={640}
//             bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
//             destroyOnClose
//             visible={visible}
//             {...modalFooter}
//           >
//             {getModalContent()}
//           </Modal>
//         </div>
//       </PageHeaderWrapper>
//     );
//   }
// }

// export default BasicList;



import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import router from 'umi/router';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  message,
  Select,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './Step1.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ list,shop, loading }) => ({
  list,
  loading: loading.models.list,
  shop
}))
@Form.create()
class BasicList extends PureComponent {
  state = { data: [],pageCount: '' };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'shop/fetch',
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
        // message.error(res.msg)
      }
    })
  }

    // 分页
  pageClick = (pages) => {
    const { dispatch } = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'shop/fetch',
        payload: {
          resolve,
          data: pages,
        }
      })
    }).then((res) => {
      if(res.code === 1){
        this.setState({
          data: res.data.data,
          // pageCount: res.data.total
        })
      }else{
        // message.error(res.msg)
      }
    })
  }

  // 点击审核进入详情
  statusClick = (key) => {
    const {dispatch} = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'shopEdit/eidtshop',
        payload: {
          resolve,
          data: key,
        }
      })
    }).then((res) => {
      if(res.code === 1){
        router.push({
          pathname:"/dashboard/step-form/confirm",
          params: key
        })
      }else{
        // message.error(res.msg)
      }
    })
  }

  // 删除店铺
  deleteItem = shopId => {
    const { dispatch } = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'shop/delete',
        payload: {
          resolve,
          data: shopId,
        }
      })
    }).then((res) => {
      if(res.code === 1){
        new Promise((resolve) => {
          dispatch({
            type: 'shop/fetch',
            payload: {
              resolve,
              data: 1,
            }
          })
        }).then((resd) => {
          if(resd.code === 1){
            this.setState({
              data: resd.data.data,
              pageCount: resd.data.count
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

  render() {
    const {
      loading,
    } = this.props;
    const { pageCount,data } = this.state;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const editAndDelete = (key) => {
      const shopId = key;
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => this.deleteItem(shopId),
      });
    };

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      pageSize: 10,
      showSizeChanger: false,
      total: pageCount,
      onChange: (current, pageSize) => {
        this.pageClick(current,pageSize);
      },
    };

    const ListContent = ({ data: { phone, create_time,address,name,agreement,license, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{phone}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>提交时间</span>
          <p>{create_time}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={status == 1 ? "100" : (status == 0 ? "0" : (status == 2 && phone !="" && address !='' && name !='' && agreement !='' && license !='' ? "100" : (status == 2 || phone !="" || address !='' || name !='' || agreement !='' || license !=''?'50':'50')))} status={status == 1 ? "active" : (status == 0 ? " " : (status == 2 && phone !="" && address !='' && name !='' && agreement !='' && license !='' ? "exception" : (status == 2 || phone !="" || address !='' || name !='' || agreement !='' || license !=''?'exception':'exception') ))} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

   
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
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
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="店铺列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.showModal}
              ref={component => {
                /* eslint-disable */
                this.addBtn = findDOMNode(component);
                /* eslint-enable */
              }}
            >
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={data}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.statusClick(item.id);
                      }}
                    >
                      审核
                    </a>,
                    <a
                      onClick={e => {
                        e.preventDefault();
                        // editAndDelete(item.id)
                      }}
                    >
                      删除
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                    title={<a href={item.href}>{item.name}</a>}
                    description={<span>{item.address}{item.house_number}</span>}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
