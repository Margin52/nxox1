import io from 'socket.io-client';

export default class WebSocketClient {

    constructor(uri ='/', {
    
    path ='/',
    
    forceNew =true,
    
    transports = ['websocket','polling'],
    
    autoConnect =false,
    
    } = {}
    
    ){
    
    this.client = io(uri,{path, forceNew,transports,autoConnect});
    
    }
    
    connect(){
        this.client.open();
    }
    
    disconnect(){
        this.client.close();
    }
    
    receive(eventName,callback){
        console.log(eventName,'eventNameeventNamessss')
        this.client.on(eventName,(data) => callback(
        // transJson(data)
           console.log(data,'服务器返回的内容')
        )
    );
    
    }
    
    send(eventName,data){
    
        this.client.emit(eventName,data);
            console.log(eventName,data,'服务器发送的的内容')
    
    }
    
    }
    
    /**
    
    * 将后台传过来的json字符串转换为object
    
    * @param data
    
    * @param callback
    
    */
    
    function transJson(data){
    
    let trans = data;
    
    if(typeof data ==='string' && (data.indexOf('{') ===0 || data.indexOf('[') ===0)){
    
    trans =JSON.parse(data);
    
    }
    
    return trans;
    
    }