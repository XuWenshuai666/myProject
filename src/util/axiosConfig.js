import axios from 'axios';
import router from '../router'

let http = axios.create();

//请求拦截
http.interceptors.request.use(config =>{
    //token过期
    
    return config;
})
//响应拦截
http.interceptors.response.use(response=>{
    //后端掉线了
    if(response.data.code==-1){
        router.replace("/login");
    }
    return response;
})

export default http