export default{
    state:{
        isCollapse:false,
        tabsList:[//默认的首页图标数据
            {
                path:'/home',
                name:'home',
                label:'首页',
                icon:'home'
            }
        ],
        currentMenu:null
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse;
        },
        //定义一个选择某Menu的方法，选中了哪个Menu就给currentMenu赋什么值，以此来判断是不是默认值“首页”
        selectMenu(state,val){
            if(val.name!='home'){
                state.currentMenu=val;
                //判断传入的val，也就是面包屑中菜单的index存不存在，
                const result = state.tabsList.findIndex(item=>item.name===val.name)
                //如果存在，那么将数据添加到tabsList中
                if(result==-1){
                    state.tabsList.push(val);
                }else{//如果等于-1不存在，说明是首页，就重置currentMenu
                    state.currentMenu=null;
                }
            }
        },
        //关闭标签要动态清除数据
        closeTag(state,val){
            const result = state.tabsList.findIndex(item=>item.name==val.name);
            state.tabsList.splice(result,1);
        }
    }
}