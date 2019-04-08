import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Button,List,Icon,Alert,Tag } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import styles from './Articles.less';

/* eslint react/no-array-index-key: 0 */

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  },
})


class CoverCardList extends PureComponent {

  state = { visible:"none", show:'block',visible1:"none", show1:'block',visible2:"none", show2:'block' };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  };

  showModal = (e) => {
    e.stopPropagation();  
    this.setState({
      visible: "block",
      show: 'none',
      visible1: "none",
      show1: 'block',
      visible2: "none",
      show2: 'block',
    });
  }

  showModal1 = (e) => {
    console.log(e,'pppppp')
    e.stopPropagation();  
    this.setState({
      visible1: "block",
      show1: 'none',
      visible2: "none",
      show2: 'block',
      visible: "none",
      show: 'block',
    });
  }

  showModal2 = (e) => {
    console.log(e,'pppppp')
    e.stopPropagation();  
    this.setState({
      visible2: "block",
      show2: 'none',
      visible1: "none",
      show1: 'block',
      visible: "none",
      show: 'block',
    });
  }
 
 changeStatus = (status) =>{
   console.log(status);
    this.setState({
      visible:status
    })
  }

  render() {
    const { visible,show,visible1,show1,visible2,show2 } = this.state;
    function preventDefault(e) {
      e.preventDefault();
    }
    const payphone=(
      <div className={styles.payphonebox}>
        <h1>微信暂不支持在第三方绑定客服人员</h1>
        <p>请到微信公众号-登录小程序-客服反馈中设置 <a>点击这里跳转</a></p>
      </div>
    );
    const payTitle=(
      <div className={styles.paytitles}>
        <div className={styles.paynames}>
          <em>绑定客服人员</em>
          <span>（客户端）</span>
        </div>
      </div>
    );
    const payTitle1=(
      <div className={styles.paytitles}>
        <div className={styles.paynames}>
          <em>绑定体验者</em>
          <span>（客户端）</span>
        </div>
        <Button type="primary" style={{float:'right',color:'#fff'}}>
          <Icon type="plus" />添加体验者
        </Button>
      </div>
    );
    const payalert=(
      <div className={styles.payalerts}>
        <Alert message="如果想查看所有体验者，请到微信公众平台-登录小程序-用户身份中设置" type="info" showIcon style={{fontSize:'12px'}} />
        <Tag style={{marginTop:'20px'}} closable onClose={preventDefault}>Prevent Default</Tag>
      </div>
    );
    const pay=(
      <div className={styles.paybox}>
        <div className={styles.payboxmid} onClick={this.showModal.bind(this)}>
          <div className={styles.payselect} style={{display:visible}}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" />
            <div className={styles.selectImg}>
              <Icon type="check" style={{color:'#fff'}} />
            </div>
          </div>
          <div className={styles.payadd} style={{display:show}}><Icon type="plus" /></div>
          <h1>管理端</h1>
          <p>在中台产品的研发过程中，会出现不同的设计规范和实现方式...</p>
        </div>
        <div className={styles.payboxmid} onClick={this.showModal1.bind(this)}>
          <div className={styles.payselect} style={{display:visible1}}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" />
            <div className={styles.selectImg}>
              <Icon type="check" style={{color:'#fff'}} />
            </div>
          </div>
          <div className={styles.payadd} style={{display:show1}}><Icon type="plus" /></div>
          <h1>商家端</h1>
          <p>在中台产品的研发过程中，会出现不同的设计规范和实现方式...</p>
        </div>
        <div className={styles.payboxmid} style={{borderRight:'0'}} onClick={this.showModal2.bind(this)}>
          <div className={styles.payselect} style={{display:visible2}}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" />
            <div className={styles.selectImg}>
              <Icon type="check" style={{color:'#fff'}} />
            </div>
          </div>
          <div className={styles.payadd} style={{display:show2}}><Icon type="plus" /></div>
          <h1>客户端</h1>
          <p>在中台产品的研发过程中，会出现不同的设计规范和实现方式...</p>
        </div>
      </div>
    );

    return (
      <div className={styles.coverCardList}>
        <Card 
          title="授权小程序"
        >
          <Card.Meta
            description={
              <Ellipsis className={styles.item} lines={3}>
                {pay}
              </Ellipsis>
            }
          />
        </Card>

        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
        >
          <List.Item style={{marginRight:'20px'}}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              title={payTitle1}
            >
              <Card.Meta 
                description={
                  payalert
                }
              />
            </Card>
          </List.Item>
          <List.Item>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              title={payTitle}
            >
              <Card.Meta 
                description={
                  payphone
                }
              />
            </Card>
          </List.Item>
        </List>
        
      </div>
    );
  }
}

export default CoverCardList;
