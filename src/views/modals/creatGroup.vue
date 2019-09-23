<template>
    <div class="group_info">
        <div class="creat_btn">
            <span class="creatBtn">创建分组</span>
        </div>
        <div class="group_detail">
            <div class="detail_modal">
                <a-list bordered :dataSource="data">
                    <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
                    <div slot="header">组一
                        <a-button shape="circle" icon="close" style="font-size:8px;margin-left:215px;"></a-button>
                    </div>
                </a-list>
                <a-list bordered :dataSource="dataTwo">
                    <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
                    <div slot="header">组二
                        <a-button shape="circle" icon="close" style="font-size:8px;margin-left:215px;"></a-button>
                    </div>
                </a-list>
            </div>
        </div>
        <div class="group-foot">
            <span>取消</span>
            <span @click="nextBtn()">下一步</span>
        </div>
    </div>
</template>
<script>
import '../../assets/css/creatGroup.less'


const data = [
  '黄浦江',
  '鸭绿江' 
]
const dataTwo =[
  '松花江',
  '沧澜江',
  '长江'
]
export default {
    name:'creatGroup',
    data(){
        return{
            data,
            dataTwo,
            ishidden:2
        }
    },
    methods:{
        nextBtn(){
            this.ishidden = 3;
        }
    }
}
</script>