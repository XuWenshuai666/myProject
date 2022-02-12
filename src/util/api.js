import http from './axiosConfig'
let getData = {};
// let baseUrl = 'http://localhost:8080';
// let baseUrl = "/api"

//封装一个登录接口
getData.login = (param)=>{
    return http.post('/login',param);
}
//封装一个调取mock数据的接口
getData.getHomeData = ()=>{
    return http.get('/home/getData');
}
//更新用户接口
getData.updateUser = (param)=>{
    return http.post('/user/edit',param);
}
//新增用户接口
getData.addUser = (param)=>{
    return http.post('/user/add',param);
}
//查询用户接口
getData.getU = (param)=>{
    return http.get('/user/getUser',{
        params:param
    });
}
//删除用户接口
getData.delUser = (param)=>{
    return http.post('/user/del',param);
}

export default getData;