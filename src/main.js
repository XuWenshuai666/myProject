// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//less
import './assets/less/index.less'
//store
import store from './store/index.js'
//axios
// import http from 'axios';
//mock的引入
import './util/mock.js'

//ElementUI引入
import {Button,Radio,Container,Main,Header,Aside,
Menu,Submenu,MenuItem,MenuItemGroup,Dropdown,DropdownMenu,DropdownItem,
Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,Tag,Form,FormItem,
Input,Select,Switch,Option,DatePicker,Dialog,Pagination,MessageBox,Message} from "element-ui";//可以解构赋值
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Radio);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(Option);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(Pagination);
//挂载消息弹框
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

//axios
// Vue.prototype.$http=http; 


/* eslint-disable no-new */
new Vue({
  store,
  router,
  render:h=>h(App),
}).$mount("#app")
