<template>
  <div class="manage">
    <el-dialog
      :title="operateType == 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      </common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <!-- 这些属性都是向子组件里传的 --><!-- :config="config"是分页的数据-->
    <common-table :tableData="tableData"
        :tableLabel="tableLabel"
        
        :config="config"
        @changePage="getList()"
        @edit="editUser"
        @del="delUser"
    >

    </common-table>
  </div>
</template>

<script>
import CommonForm from "../../common/CommonForm.vue";
import CommonTable from "../../common/CommonTable.vue";
//引入封装好的接口
import url from "../../../util/api";
export default {
  name: "user",
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      tableData:[],
      tableLabel:[
          {
              prop:"name",
              label:"姓名"
          },
          {
              prop:"age",
              label:"年龄"
          },
          {
              prop:"sexLabel",
              label:"性别"
          },
          {
              prop:"birth",
              label:"出生日期",
              width:200
          },
          {
              prop:"addr",
              label:"地址",
              width:320
          }
      ],
      config:{
          page:1,
          total:30,
      }
    };
  },
  components: {
    CommonForm,
    CommonTable
  },
  methods: {
    confirm() {
        if(this.operateType=='edit'){//operateType是edit说明是更新用户
            //调取更新接口
            url.updateUser(this.operateForm)
            .then(res=>{
                //关闭弹窗
                this.isShow=false;
                //然后查询
                this.getList()
                console.log(res,"添加响应")
            })
            .catch(err=>{
                console.log(err,"添加错误");
            })
        }else{//否则就是新增用户
            url.addUser(this.operateForm)
            .then(res=>{
                //关闭弹窗
                this.isShow=false;
                //然后查询
                this.getList()
                console.log(res,"添加响应")
            })
            .catch(err=>{
                console.log(err,"添加错误");
            })
        }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    
    editUser(row){
        this.operateType='edit'
        this.isShow=true
        //打开编辑页面后，需要回显当条数据
        this.operateForm=row;
    },
    delUser(row){
        this.$confirm("此操作将永久删除数据,是否继续","提示",{
            confirmButtonText:'确认',
            cancelButtonText:'取消',
            type:"warning"
        })
        .then(()=>{
            const id = row.id;
            url.delUser({
                params:{id}
            })
            .then(()=>{
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                this.getList();
            })
        })
    },
    //查询列表方法
    getList(name='') {
        this.config.loading=true;
        name?(this.config.page=2):"";
        //调用接口
        url.getU().then(({data:res})=>{
            console.log(res,"res")
            this.tableData = res.list.map(item=>{
                item.sexLabel=item.sex==0?'女':'男';
                return item;
            })
            this.config.total = res.count;//响应会有一个count，把它赋给总页数
            this.config.loading = false;
        })
        .catch(err=>{
          console.log(err,"errrrr")
        })
        
    },
  },
  created(){
      this.getList()
  }
};
</script>

<style lang="less" scoped>
.manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>

