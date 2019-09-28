<template>
    <div class="group_info">
        <div class="creat_btn">
            <a-button class="creatBtn" @click="creatGroup">创建分组</a-button>
        </div>
        <div class="group_detail">
            <div class="detail_modal">
                <!-- <a-list bordered :dataSource="data">
                    <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
                    <div slot="header">组一
                        <a-button shape="circle" icon="close" style="font-size:8px;margin-left:80%;"></a-button>
                    </div>
                </a-list>
                <a-list bordered :dataSource="dataTwo">
                    <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
                    <div slot="header">组二
                        <a-button shape="circle" icon="close" style="font-size:8px;margin-left:80%;"></a-button>
                    </div>
                </a-list>
                <a-list bordered :dataSource="dataTwo">
                    <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
                    <div slot="header">组二
                        <a-button shape="circle" icon="close" style="font-size:8px;margin-left:80%;"></a-button>
                    </div>
                </a-list> -->
                <div style="width:100%;">
                    <div class="group_title">
                        <a-row type="flex" justify="space-between" align="middle">
                            <a-col :span="4"><span class="group_font">组一</span></a-col>
                            <a-col :span="3">
                                <a-button shape="circle" icon="close" style="font-size:8px;"></a-button>
                            </a-col>
                        </a-row>
                    </div>
                    <draggable class="list-group" :list="data" group="people" @change="log">
                        <div class="list-group-item listItem" v-for="element in data" :key="element.id">
                            {{element.name}}
                        </div>
                    </draggable>
                </div>
                <div style="width:100%;">
                    <div class="group_title">
                        <a-row type="flex" justify="space-between" align="middle">
                            <a-col :span="4"><span class="group_font">组二</span></a-col>
                            <a-col :span="3">
                                <a-button shape="circle" icon="close" style="font-size:8px;"></a-button>
                            </a-col>
                        </a-row>
                    </div>
                    <draggable class="list-group" :list="dataTwo" group="people" @change="log">
                        <div class="list-group-item listItem" v-for="element in dataTwo" :key="element.id">
                            {{element.name}}
                        </div>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../../assets/css/creatGroup.less'


let data = [
  { name: "黄浦江", id: 1 },
  { name: "长江", id: 2 },
  { name: "黄河", id: 3 },
  { name: "鸭绿江", id: 4 } 
]
let dataTwo =[
  { name: "洞庭湖", id: 5 },
  { name: "太湖", id: 6 },
  { name: "黑龙江", id: 7 }
]
export default {
    name:'creatGroup',
    data(){
        return{
            data,
            dataTwo,
            ishidden:3
        }
    },
    methods:{
        nextBtn(){   
            this.$emit('showPlan',this.ishidden);
            console.log(this.ishidden);
        },
        creatGroup(){

        },
        add(){
            this.list.push({name: "Juan"});
        },
        replace(){
            this.list = [{ name: "Edgard" }];
        },
        clone(el){
            return {
                name: el.name + " cloned"
            }; 
        },
        log(evt){
            window.console.log(evt);
        }
    }
}
</script>