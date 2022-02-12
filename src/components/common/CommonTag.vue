<template>
    <div class="tabs">
        <el-tag v-for="(tag,index) in tags" :key="tag.name" :closable="tag.name!='home'" :effect="$route.name==tag.name?'dark':'plain'" @click="changeMenu(tag)" @close="handleClose(tag,index)" size="small">
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';//辅助性函数
export default {
    name:'CommonTag',
    data(){
        return{}
    },
    computed:{
        //拿到store中的tabsList进行渲染
        ...mapState({
            tags:state=>state.tab.tabsList
        })
    },
    methods:{
        //利用辅助性函数调用closeTag这个mutation当中的方法
        ...mapMutations({
            close:'closeTag'
            }
        ),
        changeMenu(item){
            this.$router.push({
                name:item.name
            })
        },
        //通过tags长度和对应的面包屑的index判断是否一致，如果一致则说明最后一个tag要保留
        handleClose(tag,index){
            const length = this.tags.length-1;
            //调用mutation中的closesTag方法
            this.close(tag);
            if(tag.name!=this.$route.name){
                return
            }
            if(index==length){//如果是最后一个，则tag的焦点往左移
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }else{//如果不是则焦点向右移
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        },
        
    }
}
</script>

<style lang="less" scoped>
.tabs{
    padding: 8px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>