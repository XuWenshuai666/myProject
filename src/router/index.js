import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//引入一级路由,懒加载
const Main = ()=>import('../components/view/Main.vue');


//引入二级路由
const Home = ()=>import('../components/view/home')
const User = ()=>import('../components/view/user');
const Mall = ()=>import('../components/view/mall');
const PageOne = ()=>import('../components/view/other/pageOne');
const PageTwo = ()=>import('../components/view/other/pageTwo');

const routes = [
  {
    path:'/',
    name:"Main",
    component:Main,
    children:[
      {
        path:'/',
        name:"home",
        component:Home,
      },
      {
        path:'/home',
        name:"home",
        component:Home,
      },
      {
        path:'/user',
        name:"user",
        component:User,
      },
      {
        path:'/mall',
        name:"mall",
        component:Mall,
      },
      {
        path:'/page1',
        name:"pageOne",
        component:PageOne,
      },
      {
        path:'/page2',
        name:"pageTwo",
        component:PageTwo,
      }
    ]
  },
  
];

export default new Router({
  mode:"history",
  routes,
})
