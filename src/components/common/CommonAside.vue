<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <h3>{{isCollapse?"管理":"小试牛刀后台系统"}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path" >
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
        <!-- <span slot="title">分组一</span> -->
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
    //   isCollapse: false,
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "pageOne",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "pageTwo",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
        this.$router.push({
          name:item.name,
        });
        //调用mutation的selectMenu方法
        this.$store.commit('selectMenu',item)//item对应的就是menu的数据
    }
  },
  computed:{
      noChildren(){
        //逻辑判断，拿出没有children属性的路由项
          return this.menu.filter(item=>!item.children)
      },
      hasChildren(){
        //逻辑判断，拿出有children属性的路由项
          return this.menu.filter(item=>item.children)
      },
      isCollapse(){
          return this.$store.state.tab.isCollapse;
      }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
    height: 100%;
    border: none;
    h3{
        color: #fff;
        text-align:center;
        line-height:38px;
    }
}
</style>