import React, { Component } from 'react';
import { Map,Marker } from 'react-amap';
// import Marker from 'react-amap/lib/marker';
import { connect } from 'dva';
import Websocket from 'react-websocket';
import {
  Radio
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Setting.less';
import online from './../../assets/online.png';
// import outline from './../../assets/outline.png';
import car from './../../assets/car.png';
import WebSocketClient from "./../../utils/WebSocketClient";

const RadioGroup = Radio.Group;

@connect(({ profile,shopadd, loading }) => ({
  profile,
  shopadd,
  loading: loading.effects['profile/fetchAdvanced'],
}))
class AdvancedProfile extends Component {
  constructor(){
    super()
    this.state = {
      value: 1,
      marketData: [],
      mapdatas: [],
      carData: [],
      mapcarData: [],
      clientIds: ''
    };
    
  }


  handleData = (data) => {
    console.log(data,'socket返回的数据')
    const result = JSON.parse(data);
    this.setState({
      clientIds: result.client_id
    });
    const { dispatch } = this.props;
    if(result.client_id !== undefined){
      new Promise((resolve) => {
        dispatch({
          type: 'shop/fetchCar',
          payload: {
            resolve,
            data: this.state.clientIds,
          }
        })
      }).then((res) => {
        if(res.code === 1){
          this.setState({
            carData: res.data.data,
          })
          var postions = [];
          for(var r in this.state.carData){
            postions.push({
              lat: this.state.carData[r].lat,
              lng: this.state.carData[r].lng,
              name: this.state.carData[r].name,
              online: this.state.carData[r].online,
              license: this.state.carData[r].license,
            })
          }
          this.setState({
            mapcarData: postions
          })
        }else{
          // message.error(res.msg)
        }
      })
    }
    
  }
 

  componentDidMount = () => {
    const { dispatch } = this.props;
    new Promise((resolve) => {
      dispatch({
        type: 'shop/fetchMap',
        payload: {
          resolve,
          data: "",
        }
      })
    }).then((res) => {
      if(res.code === 1){
        this.setState({
          marketData: res.data.data,
        })
 
        var postion = [];
        for(var i in this.state.marketData){
          postion.push({
            lat: this.state.marketData[i].lat,
            lng: this.state.marketData[i].lng,
            name: this.state.marketData[i].name,
            online: this.state.marketData[i].online,
          })
        }

        this.setState({
          mapdatas: postion
        })
      }else{
        // message.error(res.msg)
      }
    })
  }
  

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
    if(e.target.value === 2){
      var online = [];
      for(var j in this.state.marketData){
        if(this.state.marketData[j].online === 1){
          online.push({
            lat: this.state.marketData[j].lat,
            lng: this.state.marketData[j].lng,
            name: this.state.marketData[j].name,
            online: this.state.marketData[j].online
          })
        }
      }
      this.setState({
        mapdatas: online
      })
    } 
    else if(e.target.value === 3){
      var outline = [];
      for(var k in this.state.marketData){
        if(this.state.marketData[k].online === 0){
          outline.push({
            lat: this.state.marketData[k].lat,
            lng: this.state.marketData[k].lng,
            name: this.state.marketData[k].name,
            online: this.state.marketData[k].online
          })
        }
      }
      this.setState({
        mapdatas: outline
      })
    } else if(e.target.value === 1){
      var alls = [];
      for(var j in this.state.marketData){
        alls.push({
          lat: this.state.marketData[j].lat,
          lng: this.state.marketData[j].lng,
          name: this.state.marketData[j].name,
          online: this.state.marketData[j].online
        })
      }
      this.setState({
        mapdatas: alls
      })
    }
  }

  

  render() {
    const {  mapdatas,mapcarData } = this.state;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <PageHeaderWrapper
        className={styles.modalboxs}
      > 
        <Websocket url='wss://www.nx.tt/wss' onMessage={this.handleData.bind(this)} />
        <div className={styles.mapboxsmid}>
          <div style={{ width: "96%", height: "600px", margin:'2% auto' }}>
            <div className={styles.mapboxs}>
              <h2>商家</h2>
              <RadioGroup onChange={this.onChange} value={this.state.value} style={{padding: '0 20px'}}>
                <Radio style={radioStyle} value={1}>所有商家</Radio>
                <Radio style={radioStyle} value={2}>在线商家</Radio>
                <Radio style={radioStyle} value={3}>等待商家</Radio>
              </RadioGroup>
            </div>
            <Map 
              plugins={['ToolBar']} 
              center={{longitude: 106.19037, latitude: 38.49493}} 
              // cneter={shopeStatusInfo.lng == "" || shopeStatusInfo.lat == "" ? {longitude:106.19037,latitude:38.49491} : {longitude:shopeStatusInfo.lng,latitude:shopeStatusInfo.lat}}
              zoom={18}
            >
              {
                mapdatas.map(
                  item => 
                    <Marker title={item.name} position={item.lng === "" || item.lat ==="" ? {longitude: 106.19037, latitude: 38.49493} : {longitude: item.lng, latitude: item.lat}}>
                      <img src={online} alt="" />
                    </Marker>
                )
              }
              {/* {
                mapcarData.map(
                  item => 
                    <Marker title={item.license} position={{longitude: item.lng, latitude: item.lat}}>
                      <img src={car} alt="" />
                    </Marker>
                )
              } */}
            </Map>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedProfile;
