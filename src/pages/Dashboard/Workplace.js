import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Tooltip,Input,Tabs } from 'antd';
import router from 'umi/router';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Workplace.less';
const TabPane = Tabs.TabPane;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))


class CardList extends PureComponent {
  constructor(props) {
    super(props);
    const {
      list: { list,loading },
    } = this.props;
    const paneContent = (
      <div className={styles.cardList}>
        <List
          style={{paddingBottom:'20px'}}
          rowKey="id"
          loading={loading}
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={['', ...list]}
          renderItem={item =>
            item ? (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card} actions={[<a>编辑</a>, <a>删除</a>]}>
                  <div className={styles.btnPrimary}>
                    <img alt="" className={styles.cardAvatar} src={item.avatar} />
                  </div>
                  <Card.Meta
                    title={<a>{item.title}</a>}
                    name={item.name}
                    // onClick={onValidateForm}
                    description={
                      <Ellipsis className={styles.item} lines={3}>
                        ￥{item.price}/份
                      </Ellipsis>
                    }
                  />
                  <div>库存：{item.number}</div>
                </Card>
              </List.Item>
            ) : (
              <List.Item>
                <Button type="dashed" className={styles.newButton}>
                  <Icon type="plus" /> 添加菜品
                </Button>
              </List.Item>
            )
          }
        />
      </div>
    );
    const tabsList = (
      <div className={styles.cardList}>
        <List
          rowKey="id"
          style={{paddingBottom:'20px'}}
          loading={loading}
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={['', ...list]}
          renderItem={item =>
            item ? (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card} actions={[<a>编辑</a>, <a>删除</a>]}>
                  <div className={styles.btnPrimary}>
                    <img alt="" className={styles.cardAvatar} src={item.avatar} />
                  </div>
                  <Card.Meta
                    title={<a>{item.title}</a>}
                    name={item.name}
                    // onClick={onValidateForm}
                    description={
                      <Ellipsis className={styles.item} lines={3}>
                        ￥{item.price}/份
                      </Ellipsis>
                    }
                  />
                  <div>库存：{item.number}</div>
                </Card>
              </List.Item>
            ) : (
              <List.Item>
                <Button type="dashed" className={styles.newButton}>
                  <Icon type="plus" /> 添加菜品
                </Button>
              </List.Item>
            )
          }
        />
      </div>
    );
    this.newTabIndex = 0;
    const panes = [
      { 
        title: '全部', 
        content: paneContent, 
        key: '1' 
      },
      { 
        title: '炒菜', 
        content: tabsList, 
        key: '2' 
      },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };

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

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    console.log(panes,'panesss')
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
    const onValidateForm = () => {
      router.push('/dashboard/step-form/confirm');
    };

    const mainSearch = (
      <div>
        <div className={styles.searchBox}>
          <Input.Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={this.handleFormSubmit}
            style={{ width: 522,textAlign:'center' }}
          />
          <div style={{ marginBottom: 16 }} className={styles.btnTabs}>
            <Button onClick={this.add} type="primary" style={{height:'40px'}}><Icon type="plus" />新建分组</Button>
          </div>
        </div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
  );

    return (
      <PageHeaderWrapper title="菜品" content={mainSearch}>
        {/* <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={[<a>编辑</a>, <a>删除</a>]}>
                    <div className={styles.btnPrimary}>
                      <img alt="" className={styles.cardAvatar} src={item.avatar} />
                    </div>
                    <Card.Meta
                      title={<a>{item.title}</a>}
                      name={item.name}
                      onClick={onValidateForm}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          ￥{item.price}/份
                        </Ellipsis>
                      }
                    />
                    <div>库存：{item.number}</div>
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 添加菜品
                  </Button>
                </List.Item>
              )
            }
          />
        </div> */}
      </PageHeaderWrapper>
    );
  }
}

export default CardList;

