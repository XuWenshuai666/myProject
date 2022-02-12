<template>
    <el-container style="height:100%">
      <el-aside width="auto" style="font-size:16px">
        <!-- 公共侧边 -->
          <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 公共header -->
          <common-header></common-header>
        </el-header>
        <common-tag></common-tag>
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  
</template>

<script>
//引入公共组件
import CommonAside from '../common/CommonAside.vue';
import CommonHeader from '../common/CommonHeader.vue';
//这个是公共tag
import CommonTag from '../common/CommonTag.vue';
export default {
  name: "Home",
  data() {
    return {};
  },
  components:{//注册
      CommonAside,
      CommonHeader,
      CommonTag
  }
};
</script>

<style lang="less" scoped>
.el-header{
    background-color: #333;
}
.el-main{
    padding: 0;
}

</style>

