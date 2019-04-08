import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Button,List } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import styles from './Projects.less';
import noImg from './../../assets/noimg.png';
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
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  };

  

  render() {
    const title=(
      <div className={styles.cardTitle}>
        <span>授权小程序</span>
        <div className={styles.cardName}>
          <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" />
          <em>肥猫健身</em>
        </div>
      </div>
    );
    const content=(
      <div className={styles.contentbox}>
        <h5>授权小程序后，即可发布小程序</h5>
        <p>
          1、微信官方规定：用户必须自己进行小程序注册。然后才可以将小程序授权给任意第三方进行设计和代码管理。<br/>
          2、微信官方规定：小程序个人开放的服务类目是有严格规定的，内容不在服务类目中的，是审核不通过的。<a>查看详情</a>
        </p>
        <div className={styles.contentbtn}>
          <Button type="primary" class={styles.contentbtnons} style={{marginRight:'20px'}}>我已有小程序，直接授权</Button>
          <Button>注册小程序帐号</Button>
        </div>
      </div>
    );
    const payImg=(
      <div className={styles.imgbox}>
        <img src={noImg} alt="" />
        <h5>请先授权小程序</h5>
      </div>
    );
    return (
      <div className={styles.coverCardList}>
        <Card 
          title={title}
        >
          <Card.Meta
            description={
              <Ellipsis className={styles.item} lines={3}>
                {content}
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
              title="绑定体验者"
            >
              <Card.Meta 
                description={
                  payImg
                }
              />
            </Card>
          </List.Item>
          <List.Item>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              title="绑定客服人员"
            >
              <Card.Meta 
                description={
                  payImg
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
