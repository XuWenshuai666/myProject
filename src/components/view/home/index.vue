<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 10px">
      <el-card shadow="hover" class="userArea">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2021-7-19</span></p>
          <p>上次登录地点:<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 430px" class="tableArea">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLable"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <div class="g">
        <el-card style="height: 280px">
          <div style="height: 280px" ref="echart"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 250px">
            <div style="height: 240px; width: 420px" ref="userEchart"></div>
          </el-card>
          <el-card style="height: 250px">
            <div style="height: 200px" ref="videoEchart"></div>
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
//引入封装好的接口
import url from "../../../util/api";
//mock的数据
// import{getData} from '../../api'
import * as echarts from "echarts";

export default {
  name: "home",
  data() {
    return {
      userImg: require("../../../assets/images/user.png"),
      tableData: [],
      tableLable: {
        name: "产品",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    url.getHomeData().then((res) => {
      console.log(res, "rrrrrrrrr");
      console.log(echarts, "eeeeeee");
      const { code, data } = res.data;
      //配合echart需要的属性，用逻辑实现数据赋值并渲染表格
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        console.log(keyArray, "keyArray");
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        //echarts属性当中所需要的option项,组装

        const option = {
          //鼠标移入的tip
          tooltip: {},
          //x轴数据
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        };
        //用E接收实例的refs，为的是拿到echarts所需要的DOM结构
        const E = echarts.init(this.$refs.echart);
        E.setOption(option); //用echarts提供的方法接收option项,并绘制

        //用户图
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map((item) => {
              //需要一个数组，用map遍历对象
              return item.date;
            }),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        //画用户图
        const U = echarts.init(this.$refs.userEchart);
        U.setOption(userOption);

        //饼图
        const videoOption = {
          tooltip: {
                trigger: "item",
              },
              color: [
                "#0f78f4",
                "#dd536b",
                "#9462e5",
                "#a6a6a6",
                "#e1bb22",
                "#39c362",
                "#3ed1cf",
              ],
              series: [
                {
                  data:data.videoData,
                  type:'pie'
                }
              ],
        };
        //画饼图
        const V = echarts.init(this.$refs.videoEchart);
        V.setOption(videoOption);
      }
    });
  },
};
</script>

<style scoped>
.userArea,
.tableArea {
  margin-left: 15px;
}
.user {
  display: flex;
  align-items: center;
  border-bottom: 3px solid #ccc;
  padding-bottom: 15px;
}
.user img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user .name {
  margin: 15px 0;
  font-size: 28px;
  line-height: 20px;
}
.user .access {
  font-size: 14px;
  color: gray;
}
.userinfo {
  margin-left: 50px;
}
.login-info span {
  margin-left: 50px;
  color: black;
}
.login-info p {
  padding-left: 20px;
  color: gray;
}
.num {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0px;
}
.num .el-card {
  flex: 2;
  min-width: 30%;
  max-width: 30%;
  margin-top: 10px;
  margin-left: 15px;
  height: 71px;
}
.num .el-card .num {
  margin: 5px 15px;
  font-size: 24px;
}
.num .el-card .txt {
  margin: 0px 15px;
  font-size: 14px;
  color: gray;
}
.icon {
  width: 60px;
  height: 71px;
}
.el-icon-s-goods,
.el-icon-star-on,
.el-icon-success {
  box-sizing: border-box;
  padding-left: 18px;
  padding-top: 24px;
  color: #fff;
  font-size: 22px;
}
.graph {
  display: flex;
  justify-content: space-between;
}
.g {
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 28px;
}
.graph .el-card {
  width: 48%;
  margin-top: 20px;
}
</style>

